<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>TradingFloor AI | Deriv</title>

<style>
:root {
  --bg:#07111f;
  --panel:#101e30;
  --border:#293b54;
  --text:#edf4ff;
  --muted:#94a8c2;
  --blue:#38bdf8;
  --gold:#f5b942;
  --green:#22c55e;
  --red:#ef4444;
}
*{box-sizing:border-box}
body{
  margin:0;padding:16px;background:var(--bg);
  color:var(--text);font-family:Arial,sans-serif
}
main{max-width:1100px;margin:auto}
header,.card{
  background:var(--panel);border:1px solid var(--border);
  border-radius:15px;padding:18px;margin-bottom:16px
}
.brand{color:var(--gold);font-weight:bold;letter-spacing:3px}
h1{font-size:clamp(24px,5vw,36px);margin:12px 0}
h2{font-size:19px;margin-top:0}
p{color:var(--muted);line-height:1.5}
.controls,.stats{
  display:grid;grid-template-columns:repeat(auto-fit,minmax(145px,1fr));
  gap:12px
}
label{display:block;color:var(--muted);font-size:12px;margin-bottom:7px}
select,button{
  width:100%;padding:12px;border-radius:8px;
  border:1px solid var(--border);background:#091524;color:var(--text)
}
button{background:var(--blue);color:#061321;font-weight:bold;cursor:pointer}
.stat{background:#091524;padding:13px;border-radius:9px;overflow-wrap:anywhere}
.stat small{display:block;color:var(--muted);margin-bottom:8px}
.price{font-size:clamp(27px,6vw,40px);font-weight:bold;margin:12px 0}
.badge{display:inline-block;padding:7px 10px;border-radius:20px;background:#293b54;font-size:12px}
.good{background:#123c2a;color:#86efac}
.bad{background:#4a1c24;color:#fca5a5}
.signal{font-size:30px;font-weight:bold}
.buy{color:var(--green)}
.sell{color:var(--red)}
.wait{color:var(--gold)}
canvas{width:100%;height:260px;display:block;background:#091524;border-radius:10px}
#diagnostics{white-space:pre-wrap;overflow-wrap:anywhere;font:12px/1.6 monospace;color:#b6c8df}
.warning{color:#facc15;font-size:12px}
@media(max-width:500px){body{padding:9px}.card,header{padding:13px}}
</style>
</head>

<body>
<main>

<header>
  <div class="brand">TRADINGFLOOR AI</div>
  <h1>Deriv Synthetic Market Monitor</h1>
  <p>Select a volatility index to monitor live prices and technical indicators.</p>
  <span id="connection" class="badge">Connecting to Deriv...</span>
</header>

<section class="card">
  <h2>Choose Your Market</h2>

  <div class="controls">
    <div>
      <label for="market">Volatility index</label>
      <select id="market">
        <option value="R_10">Volatility 10 Index</option>
        <option value="R_25">Volatility 25 Index</option>
        <option value="R_50">Volatility 50 Index</option>
        <option value="R_75">Volatility 75 Index</option>
        <option value="R_100">Volatility 100 Index</option>
        <option value="1HZ10V">Volatility 10 (1s) Index</option>
        <option value="1HZ15V">Volatility 15 (1s) Index</option>
        <option value="1HZ25V">Volatility 25 (1s) Index</option>
        <option value="1HZ30V">Volatility 30 (1s) Index</option>
        <option value="1HZ50V">Volatility 50 (1s) Index</option>
        <option value="1HZ75V">Volatility 75 (1s) Index</option>
        <option value="1HZ90V">Volatility 90 (1s) Index</option>
        <option value="1HZ100V">Volatility 100 (1s) Index</option>
      </select>
    </div>

    <div>
      <label for="timeframe">Timeframe</label>
      <select id="timeframe">
        <option value="60">1 minute</option>
        <option value="300">5 minutes</option>
        <option value="900">15 minutes</option>
        <option value="1800">30 minutes</option>
        <option value="3600">1 hour</option>
        <option value="14400">4 hours</option>
        <option value="86400">1 day</option>
      </select>
    </div>

    <div>
      <label>&nbsp;</label>
      <button id="refresh">Refresh Market</button>
    </div>
  </div>
</section>

<section class="card">
  <h2 id="marketName">Volatility 10 Index</h2>
  <span id="marketStatus" class="badge">Waiting for market data</span>
  <div id="price" class="price">--</div>

  <div class="stats">
    <div class="stat"><small>Previous tick</small><strong id="previous">--</strong></div>
    <div class="stat"><small>Tick change</small><strong id="change">--</strong></div>
    <div class="stat"><small>Candles loaded</small><strong id="count">0</strong></div>
    <div class="stat"><small>Last update</small><strong id="updated">--</strong></div>
  </div>
</section>

<section class="card">
  <h2>Market Chart</h2>
  <canvas id="chart"></canvas>
  <p>Chart uses historical candles and updates with incoming market ticks.</p>
</section>

<section class="card">
  <h2>Technical Analysis</h2>
  <div id="direction" class="signal wait">WAIT</div>
  <p id="reason">Waiting for sufficient candle data.</p>

  <div class="stats">
    <div class="stat"><small>Confluence score</small><strong id="score">--</strong></div>
    <div class="stat"><small>EMA trend</small><strong id="trend">--</strong></div>
    <div class="stat"><small>RSI 14</small><strong id="rsi">--</strong></div>
    <div class="stat"><small>ATR estimate</small><strong id="atr">--</strong></div>
  </div>

  <p class="warning">
    BUY and SELL are technical estimates, not guaranteed predictions.
    This monitor does not execute trades.
  </p>
</section>

<section class="card">
  <h2>Connection Diagnostics</h2>
  <div id="diagnostics">Starting...</div>
</section>

</main>

<script>
"use strict";

/*
 * Deriv public market-data endpoint.
 * No account login is needed for public market data.
 */
const WS_URL =
  "wss://api.derivws.com/trading/v1/options/ws/public";

const $ = id => document.getElementById(id);

let ws = null;
let requestId = 1;
let connected = false;
let reconnectTimer = null;
let reconnectDelay = 2000;

let candles = [];
let currentPrice = null;
let previousPrice = null;
let activeMarkets = [];
let tickSubscriptionId = null;
let historyRequestId = null;
let selectedSymbol = $("market").value;
let logs = [];

function log(message) {
  logs.unshift("[" + new Date().toLocaleTimeString() + "] " + message);
  logs = logs.slice(0, 18);
  $("diagnostics").textContent = logs.join("\n");
}

function status(message, type = "") {
  $("connection").textContent = message;
  $("connection").className = "badge " + type;
}

function marketStatus(message, type = "") {
  $("marketStatus").textContent = message;
  $("marketStatus").className = "badge " + type;
}

function send(payload) {
  if (!ws || ws.readyState !== WebSocket.OPEN) {
    log("Request not sent: WebSocket is not open.");
    return null;
  }

  const id = requestId++;
  payload.req_id = id;
  ws.send(JSON.stringify(payload));
  return id;
}

function formatPrice(value) {
  if (!Number.isFinite(Number(value))) return "--";

  value = Number(value);

  const decimals =
    Math.abs(value) >= 1000 ? 2 :
    Math.abs(value) >= 1 ? 4 : 6;

  return value.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
}

/* Handle both old and new Deriv symbol field names. */
function symbolOf(item) {
  return item.underlying_symbol || item.symbol || "";
}

function nameOf(item) {
  return item.underlying_symbol_name ||
         item.display_name ||
         symbolOf(item);
}

function connect() {
  clearTimeout(reconnectTimer);
  status("Connecting...");

  log("Opening Deriv public WebSocket.");

  try {
    ws = new WebSocket(WS_URL);
  } catch (error) {
    log("Could not create WebSocket: " + error.message);
    scheduleReconnect();
    return;
  }

  ws.onopen = () => {
    connected = true;
    reconnectDelay = 2000;
    status("Connected", "good");
    log("Connected. Requesting available markets.");

    send({ active_symbols: "brief" });
  };

  ws.onmessage = event => {
    let data;

    try {
      data = JSON.parse(event.data);
    } catch {
      log("Received invalid JSON from Deriv.");
      return;
    }

    if (data.error) {
      const message = data.error.message || "Unknown Deriv error";
      log("API error: " + message);

      if (data.req_id === historyRequestId) {
        marketStatus("History request failed", "bad");
      }

      return;
    }

    if (data.msg_type === "active_symbols") {
      activeMarkets = data.active_symbols || [];

      log("Received " + activeMarkets.length + " active symbols.");

      /*
       * Keep each requested volatility option individually visible.
       * Use Deriv's official returned names when a match exists.
       */
      [...$("market").options].forEach(option => {
        const item = activeMarkets.find(
          market => symbolOf(market) === option.value
        );

        if (item) option.textContent = nameOf(item);
      });

      const selected = activeMarkets.find(
        item => symbolOf(item) === $("market").value
      );

      if (!selected) {
        log(
          "Selected symbol was not found in the active-symbol response. " +
          "It may be unavailable for this connection."
        );
      }

      loadMarket();
      return;
    }

    if (data.msg_type === "history") {
      if (data.req_id !== historyRequestId) return;

      const raw = data.candles ||
        (data.history && data.history.prices
          ? data.history.prices.map((price, i) => ({
              epoch: data.history.times[i],
              open: price,
              high: price,
              low: price,
              close: price
            }))
          : []);

      candles = raw.map(c => ({
        epoch: Number(c.epoch),
        open: Number(c.open),
        high: Number(c.high),
        low: Number(c.low),
        close: Number(c.close)
      })).filter(c =>
        Number.isFinite(c.epoch) &&
        Number.isFinite(c.open) &&
        Number.isFinite(c.high) &&
        Number.isFinite(c.low) &&
        Number.isFinite(c.close)
      );

      $("count").textContent = candles.length;

      if (candles.length) {
        currentPrice = candles[candles.length - 1].close;
        $("price").textContent = formatPrice(currentPrice);
      }

      marketStatus(
        candles.length ? "Historical data loaded" : "No candles returned",
        candles.length ? "good" : "bad"
      );

      log("History response contained " + candles.length + " candles.");

      drawChart();
      analyse();
      return;
    }

    if (data.msg_type === "tick" && data.tick) {
      /*
       * Ignore ticks belonging to a different symbol if the
       * response includes its symbol.
       */
      const tickSymbol = data.tick.symbol;

      if (tickSymbol && tickSymbol !== selectedSymbol) return;

      previousPrice = currentPrice;
      currentPrice = Number(data.tick.quote);

      if (!Number.isFinite(currentPrice)) return;

      $("price").textContent = formatPrice(currentPrice);
      $("previous").textContent =
        previousPrice === null ? "--" : formatPrice(previousPrice);

      if (previousPrice !== null) {
        const difference = currentPrice - previousPrice;
        $("change").textContent =
          (difference >= 0 ? "+" : "") + formatPrice(difference);
      }

      $("updated").textContent = new Date().toLocaleTimeString();

      marketStatus("Live tick received", "good");

      /*
       * Store the subscription ID so it can be unsubscribed
       * when the user switches indices.
       */
      if (data.subscription && data.subscription.id) {
        tickSubscriptionId = data.subscription.id;
      }

      updateCandle(currentPrice, Number(data.tick.epoch));
      drawChart();
      analyse();
    }
  };

  ws.onerror = () => {
    status("Connection error", "bad");
    log("WebSocket error. Check your internet connection.");
  };

  ws.onclose = () => {
    connected = false;
    tickSubscriptionId = null;
    status("Disconnected", "bad");
    log("Connection closed. Reconnecting...");
    scheduleReconnect();
  };
}

function scheduleReconnect() {
  clearTimeout(reconnectTimer);

  reconnectTimer = setTimeout(() => {
    reconnectDelay = Math.min(reconnectDelay * 1.5, 30000);
    connect();
  }, reconnectDelay);
}

function loadMarket() {
  if (!connected) {
    log("Waiting for connection before loading market.");
    return;
  }

  const symbol = $("market").value;
  if (!symbol) return;

  /*
   * Stop the previous tick subscription where possible.
   */
  if (tickSubscriptionId) {
    send({ forget: tickSubscriptionId });
    tickSubscriptionId = null;
  }

  selectedSymbol = symbol;
  candles = [];
  currentPrice = null;
  previousPrice = null;
  historyRequestId = null;

  const market = activeMarkets.find(
    item => symbolOf(item) === symbol
  );

  $("marketName").textContent = market
    ? nameOf(market)
    : $("market").selectedOptions[0].textContent;

  $("price").textContent = "--";
  $("previous").textContent = "--";
  $("change").textContent = "--";
  $("count").textContent = "0";
  $("updated").textContent = "--";

  $("direction").textContent = "WAIT";
  $("direction").className = "signal wait";
  $("reason").textContent = "Loading historical candles.";
  $("score").textContent = "--";
  $("trend").textContent = "--";
  $("rsi").textContent = "--";
  $("atr").textContent = "--";

  marketStatus("Requesting data");

  historyRequestId = send({
    ticks_history: symbol,
    count: 100,
    end: "latest",
    style: "candles",
    granularity: Number($("timeframe").value)
  });

  send({
    ticks: symbol,
    subscribe: 1
  });

  log("Requested " + symbol + " at " +
      $("timeframe").selectedOptions[0].textContent + ".");
}

function updateCandle(price, tickEpoch) {
  const granularity = Number($("timeframe").value);
  const epoch = Number.isFinite(tickEpoch) && tickEpoch > 0
    ? tickEpoch
    : Math.floor(Date.now() / 1000);

  const bucket = Math.floor(epoch / granularity) * granularity;
  let last = candles[candles.length - 1];

  if (!last || last.epoch !== bucket) {
    last = {
      epoch: bucket,
      open: price,
      high: price,
      low: price,
      close: price
    };

    candles.push(last);
  } else {
    last.high = Math.max(last.high, price);
    last.low = Math.min(last.low, price);
    last.close = price;
  }

  if (candles.length > 150) candles.shift();

  $("count").textContent = candles.length;
}

function ema(values, period) {
  if (values.length < period) return null;

  let result = values.slice(0, period)
    .reduce((sum, value) => sum + value, 0) / period;

  const multiplier = 2 / (period + 1);

  for (let i = period; i < values.length; i++) {
    result = (values[i] - result) * multiplier + result;
  }

  return result;
}

function rsi(values, period = 14) {
  if (values.length <= period) return null;

  let gains = 0;
  let losses = 0;

  for (let i = values.length - period; i < values.length; i++) {
    const change = values[i] - values[i - 1];

    if (change > 0) gains += change;
    else losses -= change;
  }

  if (losses === 0) return 100;

  const rs = gains / losses;
  return 100 - 100 / (1 + rs);
}

function atr(data, period = 14) {
  if (data.length <= period) return null;

  let total = 0;

  for (let i = data.length - period; i < data.length; i++) {
    const c = data[i];
    const prev = data[i - 1].close;

    total += Math.max(
      c.high - c.low,
      Math.abs(c.high - prev),
      Math.abs(c.low - prev)
    );
  }

  return total / period;
}

function analyse() {
  if (candles.length < 25) {
    $("direction").textContent = "WAIT";
    $("direction").className = "signal wait";
    $("reason").textContent =
      "Need at least 25 candles. Current count: " + candles.length;
    $("score").textContent = "--";
    $("trend").textContent = "--";
    $("rsi").textContent = "--";
    $("atr").textContent = "--";
    return;
  }

  const closes = candles.map(c => c.close);
  const fast = ema(closes, 9);
  const slow = ema(closes, 21);
  const strength = rsi(closes);
  const volatility = atr(candles);
  const last = candles[candles.length - 1];

  let bullish = 0;
  let bearish = 0;

  if (fast > slow) bullish++;
  if (fast < slow) bearish++;

  if (last.close > fast) bullish++;
  if (last.close < fast) bearish++;

  if (strength >= 50 && strength < 70) bullish++;
  if (strength <= 50 && strength > 30) bearish++;

  if (last.close > last.open) bullish++;
  if (last.close < last.open) bearish++;

  let direction = "WAIT";
  let reason = "The indicators do not agree strongly enough.";

  if (bullish >= 3 && bullish > bearish) {
    direction = "BUY";
    reason = "The current EMA, RSI and candle rules lean bullish.";
  } else if (bearish >= 3 && bearish > bullish) {
    direction = "SELL";
    reason = "The current EMA, RSI and candle rules lean bearish.";
  }

  $("direction").textContent = direction;
  $("direction").className = "signal " +
    (direction === "BUY" ? "buy" :
     direction === "SELL" ? "sell" : "wait");

  $("reason").textContent = reason;
  $("score").textContent =
    Math.round(Math.max(bullish, bearish) / 4 * 100) + "%";

  $("trend").textContent = fast > slow ? "Bullish" : "Bearish";
  $("rsi").textContent = strength.toFixed(2);
  $("atr").textContent = formatPrice(volatility);
}

function drawChart() {
  const canvas = $("chart");
  const ctx = canvas.getContext("2d");
  const rect = canvas.getBoundingClientRect();
  const ratio = window.devicePixelRatio || 1;

  canvas.width = Math.max(1, rect.width * ratio);
  canvas.height = Math.max(1, rect.height * ratio);

  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

  const width = rect.width;
  const height = rect.height;

  ctx.clearRect(0, 0, width, height);

  if (candles.length < 2) {
    ctx.fillStyle = "#94a8c2";
    ctx.font = "14px Arial";
    ctx.fillText("Waiting for chart data...", 16, 28);
    return;
  }

  const values = candles.map(c => c.close);
  let min = Math.min(...values);
  let max = Math.max(...values);

  if (min === max) {
    min -= 1;
    max += 1;
  }

  const pad = 22;
  const chartW = width - pad * 2;
  const chartH = height - pad * 2;

  ctx.strokeStyle = "#293b54";

  for (let i = 0; i <= 4; i++) {
    const y = pad + chartH * i / 4;
    ctx.beginPath();
    ctx.moveTo(pad, y);
    ctx.lineTo(width - pad, y);
    ctx.stroke();
  }

  ctx.beginPath();

  values.forEach((value, i) => {
    const x = pad + i / (values.length - 1) * chartW;
    const y = pad + (max - value) / (max - min) * chartH;

    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });

  ctx.strokeStyle = "#38bdf8";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = "#94a8c2";
  ctx.font = "11px Arial";
  ctx.fillText("High: " + formatPrice(max), pad, 14);
  ctx.fillText("Low: " + formatPrice(min), pad, height - 5);
}

$("market").addEventListener("change", loadMarket);
$("timeframe").addEventListener("change", loadMarket);

$("refresh").addEventListener("click", () => {
  if (!connected) connect();
  else loadMarket();
});

window.addEventListener("resize", drawChart);

connect();
drawChart();
</script>

</body>
</html>
