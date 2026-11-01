<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>TradingFloor AI | Deriv Monitor</title>

<style>
:root {
  --bg: #07111f;
  --panel: #101e30;
  --border: #243750;
  --text: #eaf2ff;
  --muted: #91a4bd;
  --blue: #38bdf8;
  --green: #22c55e;
  --red: #ef4444;
  --gold: #f5b942;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 20px;
  background: var(--bg);
  color: var(--text);
  font-family: Arial, sans-serif;
}

.container {
  max-width: 1100px;
  margin: auto;
}

header {
  padding: 20px;
  border: 1px solid var(--border);
  border-radius: 16px;
  background: linear-gradient(135deg, #10233a, #091321);
  margin-bottom: 20px;
}

.brand {
  color: var(--gold);
  font-size: 13px;
  font-weight: bold;
  letter-spacing: 2px;
}

h1 {
  margin: 8px 0;
  font-size: clamp(24px, 5vw, 36px);
}

p {
  color: var(--muted);
  line-height: 1.5;
}

.panel {
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 18px;
  margin-bottom: 18px;
}

.controls {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 12px;
}

label {
  display: block;
  color: var(--muted);
  font-size: 13px;
  margin-bottom: 7px;
}

select, button {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: #091524;
  color: var(--text);
  font-size: 14px;
}

button {
  background: var(--blue);
  color: #04111d;
  border: none;
  font-weight: bold;
  cursor: pointer;
}

button:hover {
  opacity: .88;
}

.price {
  font-size: clamp(26px, 6vw, 40px);
  font-weight: bold;
  margin: 10px 0;
  overflow-wrap: anywhere;
}

.status {
  display: inline-block;
  padding: 7px 10px;
  border-radius: 20px;
  background: #25354b;
  color: var(--muted);
  font-size: 12px;
}

.status.connected {
  background: #123c2a;
  color: #86efac;
}

.status.error {
  background: #4a1c24;
  color: #fca5a5;
}

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 12px;
}

.stat {
  background: #091524;
  padding: 14px;
  border-radius: 10px;
  border: 1px solid var(--border);
}

.stat small {
  color: var(--muted);
  display: block;
  margin-bottom: 8px;
}

.stat strong {
  font-size: 18px;
}

#chart {
  width: 100%;
  height: 250px;
  display: block;
  background: #091524;
  border-radius: 10px;
}

.signal {
  font-size: 28px;
  font-weight: bold;
}

.buy {
  color: var(--green);
}

.sell {
  color: var(--red);
}

.wait {
  color: var(--gold);
}

.diagnostics {
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  color: #a8bfd9;
  font-size: 12px;
  line-height: 1.6;
}

footer {
  text-align: center;
  color: var(--muted);
  padding: 20px 0;
  font-size: 12px;
}

.disclaimer {
  color: #facc15;
  font-size: 12px;
}

@media (max-width: 500px) {
  body {
    padding: 10px;
  }

  .panel, header {
    padding: 14px;
  }
}
</style>
</head>

<body>
<div class="container">

<header>
  <div class="brand">TRADINGFLOOR AI</div>
  <h1>Deriv Synthetic Market Monitor</h1>
  <p>Live public market data, price chart and basic technical analysis.</p>
  <span id="connection" class="status">Connecting...</span>
</header>

<section class="panel">
  <h2>Market Settings</h2>

  <div class="controls">
    <div>
      <label for="category">Market category</label>
      <select id="category">
        <option value="all">All available markets</option>
        <option value="volatility">Volatility indices</option>
        <option value="boom">Boom indices</option>
        <option value="crash">Crash indices</option>
        <option value="step">Step indices</option>
        <option value="range">Range Break indices</option>
        <option value="drift">Drift Switch indices</option>
      </select>
    </div>

    <div>
      <label for="symbol">Market symbol</label>
      <select id="symbol">
        <option value="">Loading markets...</option>
      </select>
    </div>

    <div>
      <label for="timeframe">Chart timeframe</label>
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
      <button id="refresh">Refresh analysis</button>
    </div>
  </div>
</section>

<section class="panel">
  <h2 id="marketName">Waiting for market...</h2>
  <div id="price" class="price">--</div>
  <span id="tickStatus" class="status">Waiting for price data</span>

  <div class="stats" style="margin-top:18px">
    <div class="stat">
      <small>Previous price</small>
      <strong id="previous">--</strong>
    </div>
    <div class="stat">
      <small>Price change</small>
      <strong id="change">--</strong>
    </div>
    <div class="stat">
      <small>Candles loaded</small>
      <strong id="candleCount">0</strong>
    </div>
    <div class="stat">
      <small>Last update</small>
      <strong id="lastUpdate">--</strong>
    </div>
  </div>
</section>

<section class="panel">
  <h2>Price Chart</h2>
  <canvas id="chart"></canvas>
  <p>Chart is built from public historical candle data and updates as new prices arrive.</p>
</section>

<section class="panel">
  <h2>Technical Analysis</h2>

  <div id="direction" class="signal wait">WAIT</div>
  <p id="reason">Waiting for enough market data to calculate indicators.</p>

  <div class="stats">
    <div class="stat">
      <small>Confluence score</small>
      <strong id="score">--</strong>
    </div>
    <div class="stat">
      <small>EMA trend</small>
      <strong id="trend">--</strong>
    </div>
    <div class="stat">
      <small>RSI</small>
      <strong id="rsi">--</strong>
    </div>
    <div class="stat">
      <small>ATR estimate</small>
      <strong id="atr">--</strong>
    </div>
  </div>

  <p class="disclaimer">
    Analysis is rule-based and educational. Signals are not guarantees of future
    movement. Stop-loss and take-profit values are illustrative estimates only.
    This monitor does not place trades.
  </p>
</section>

<section class="panel">
  <h2>Connection Diagnostics</h2>
  <div id="diagnostics" class="diagnostics">Starting application...</div>
</section>

<footer>
  TradingFloor AI · Deriv public market-data monitor
</footer>

</div>

<script>
"use strict";

const WS_URL = "wss://api.derivws.com/trading/v1/options/ws/public";

const $ = id => document.getElementById(id);

let socket = null;
let reconnectTimer = null;
let reconnectDelay = 2000;
let requestId = 10;
let activeSymbols = [];
let candles = [];
let currentPrice = null;
let previousPrice = null;
let subscribedSymbol = "";
let connected = false;
let diagnostics = [];

function log(message) {
  const time = new Date().toLocaleTimeString();
  diagnostics.unshift("[" + time + "] " + message);
  diagnostics = diagnostics.slice(0, 18);
  $("diagnostics").textContent = diagnostics.join("\n");
}

function setConnection(text, type = "") {
  const el = $("connection");
  el.textContent = text;
  el.className = "status " + type;
}

function sendRequest(payload) {
  if (!socket || socket.readyState !== WebSocket.OPEN) {
    log("Request not sent: WebSocket is not connected.");
    return false;
  }

  payload.req_id = requestId++;
  socket.send(JSON.stringify(payload));
  return true;
}

function connect() {
  clearTimeout(reconnectTimer);

  setConnection("Connecting...");
  log("Connecting to Deriv public market-data WebSocket.");

  try {
    socket = new WebSocket(WS_URL);
  } catch (error) {
    log("WebSocket creation failed: " + error.message);
    scheduleReconnect();
    return;
  }

  socket.onopen = () => {
    connected = true;
    reconnectDelay = 2000;
    setConnection("Connected", "connected");
    log("WebSocket connected.");
    sendRequest({ active_symbols: "brief" });
  };

  socket.onmessage = event => {
    let data;

    try {
      data = JSON.parse(event.data);
    } catch {
      log("Received an unreadable server message.");
      return;
    }

    if (data.error) {
      log("Deriv error: " + data.error.message);
      return;
    }

    if (data.msg_type === "active_symbols") {
      activeSymbols = data.active_symbols || [];
      log("Received " + activeSymbols.length + " available markets.");
      populateSymbols();
      return;
    }

    if (data.msg_type === "history") {
      if (data.candles) {
        candles = data.candles.map(c => ({
          epoch: Number(c.epoch),
          open: Number(c.open),
          high: Number(c.high),
          low: Number(c.low),
          close: Number(c.close)
        }));

        $("candleCount").textContent = candles.length;
        drawChart();
        analyse();
        log("Historical candles loaded: " + candles.length);
      }
      return;
    }

    if (data.msg_type === "tick") {
      const tick = data.tick;
      if (!tick) return;

      previousPrice = currentPrice;
      currentPrice = Number(tick.quote);

      $("price").textContent = formatPrice(currentPrice);
      $("previous").textContent =
        previousPrice === null ? "--" : formatPrice(previousPrice);

      if (previousPrice !== null) {
        const difference = currentPrice - previousPrice;
        $("change").textContent =
          (difference >= 0 ? "+" : "") + formatPrice(difference);
        $("change").style.color =
          difference >= 0 ? "var(--green)" : "var(--red)";
      }

      $("lastUpdate").textContent = new Date().toLocaleTimeString();
      $("tickStatus").textContent = "Live price received";
      $("tickStatus").className = "status connected";

      updateLatestCandle(currentPrice);
      analyse();
    }
  };

  socket.onerror = () => {
    log("WebSocket error. Check your connection and browser console.");
    setConnection("Connection error", "error");
  };

  socket.onclose = () => {
    connected = false;
    setConnection("Disconnected", "error");
    log("WebSocket closed.");
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

function categorize(symbol) {
  const text = (
    String(symbol.symbol || "") + " " +
    String(symbol.display_name || "")
  ).toLowerCase();

  if (text.includes("boom")) return "boom";
  if (text.includes("crash")) return "crash";
  if (text.includes("step")) return "step";
  if (text.includes("range break") || text.includes("range_break")) {
    return "range";
  }
  if (text.includes("drift switch") || text.includes("drift_switch")) {
    return "drift";
  }
  if (text.includes("volatility") || /\bvol\b/.test(text)) {
    return "volatility";
  }

  return "other";
}

function populateSymbols() {
  const category = $("category").value;
  const select = $("symbol");
  const previousSelection = select.value;

  let filtered = activeSymbols.filter(item => {
    if (category === "all") return true;
    return categorize(item) === category;
  });

  filtered.sort((a, b) =>
    String(a.display_name || a.symbol)
      .localeCompare(String(b.display_name || b.symbol))
  );

  select.innerHTML = "";

  if (!filtered.length) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "No markets found for this category";
    select.appendChild(option);
    $("marketName").textContent = "No matching markets";
    log("No markets found for category: " + category);
    return;
  }

  filtered.forEach(item => {
    const option = document.createElement("option");
    option.value = item.symbol;
    option.textContent =
      (item.display_name || item.symbol) + " (" + item.symbol + ")";
    select.appendChild(option);
  });

  if (filtered.some(item => item.symbol === previousSelection)) {
    select.value = previousSelection;
  }

  if (!select.value) select.selectedIndex = 0;

  subscribeToSelectedMarket();
}

function subscribeToSelectedMarket() {
  const symbol = $("symbol").value;
  if (!symbol) return;

  if (!connected || !socket || socket.readyState !== WebSocket.OPEN) {
    log("Market selected; waiting for WebSocket connection.");
    return;
  }

  if (subscribedSymbol) {
    sendRequest({
      forget_all: "ticks"
    });
  }

  subscribedSymbol = symbol;
  candles = [];
  currentPrice = null;
  previousPrice = null;

  const selected = activeSymbols.find(item => item.symbol === symbol);
  $("marketName").textContent =
    selected ? selected.display_name : symbol;

  $("price").textContent = "--";
  $("previous").textContent = "--";
  $("change").textContent = "--";
  $("candleCount").textContent = "0";
  $("lastUpdate").textContent = "--";

  sendRequest({
    ticks_history: symbol,
    count: 100,
    end: "latest",
    style: "candles",
    granularity: Number($("timeframe").value)
  });

  sendRequest({
    ticks: symbol,
    subscribe: 1
  });

  log("Requested history and live ticks for " + symbol);
}

function updateLatestCandle(price) {
  const granularity = Number($("timeframe").value);
  const epoch = Math.floor(Date.now() / 1000);
  const candleEpoch = Math.floor(epoch / granularity) * granularity;

  let last = candles[candles.length - 1];

  if (!last || last.epoch !== candleEpoch) {
    last = {
      epoch: candleEpoch,
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

  $("candleCount").textContent = candles.length;
  drawChart();
}

function formatPrice(value) {
  if (!Number.isFinite(value)) return "--";

  const decimals = Math.abs(value) >= 1000 ? 2 :
                   Math.abs(value) >= 1 ? 4 : 6;

  return value.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
}

function ema(values, period) {
  if (values.length < period) return null;

  const multiplier = 2 / (period + 1);
  let result = values.slice(0, period)
    .reduce((sum, value) => sum + value, 0) / period;

  for (let i = period; i < values.length; i++) {
    result = (values[i] - result) * multiplier + result;
  }

  return result;
}

function calculateRSI(values, period = 14) {
  if (values.length <= period) return null;

  let gains = 0;
  let losses = 0;

  for (let i = values.length - period; i < values.length; i++) {
    const change = values[i] - values[i - 1];

    if (change > 0) gains += change;
    else losses -= change;
  }

  if (losses === 0) return 100;

  const averageGain = gains / period;
  const averageLoss = losses / period;
  const relativeStrength = averageGain / averageLoss;

  return 100 - 100 / (1 + relativeStrength);
}

function calculateATR(data, period = 14) {
  if (data.length < period + 1) return null;

  const ranges = [];

  for (let i = data.length - period; i < data.length; i++) {
    const candle = data[i];
    const previousClose = data[i - 1].close;

    ranges.push(Math.max(
      candle.high - candle.low,
      Math.abs(candle.high - previousClose),
      Math.abs(candle.low - previousClose)
    ));
  }

  return ranges.reduce((sum, value) => sum + value, 0) / ranges.length;
}

function analyse() {
  if (candles.length < 25) {
    $("direction").textContent = "WAIT";
    $("direction").className = "signal wait";
    $("reason").textContent =
      "Waiting for at least 25 candles before calculating the indicators.";
    $("score").textContent = "--";
    $("trend").textContent = "--";
    $("rsi").textContent = "--";
    $("atr").textContent = "--";
    return;
  }

  const closes = candles.map(c => c.close);
  const fastEMA = ema(closes, 9);
  const slowEMA = ema(closes, 21);
  const rsi = calculateRSI(closes);
  const atr = calculateATR(candles);

  if (fastEMA === null || slowEMA === null || rsi === null) return;

  let bullish = 0;
  let bearish = 0;

  if (fastEMA > slowEMA) bullish++;
  if (fastEMA < slowEMA) bearish++;

  if (closes[closes.length - 1] > fastEMA) bullish++;
  if (closes[closes.length - 1] < fastEMA) bearish++;

  if (rsi >= 50 && rsi < 70) bullish++;
  if (rsi <= 50 && rsi > 30) bearish++;

  const last = candles[candles.length - 1];

  if (last.close > last.open) bullish++;
  if (last.close < last.open) bearish++;

  let direction = "WAIT";
  let className = "signal wait";
  let score = Math.max(bullish, bearish) / 4 * 100;
  let reason = "The indicators do not agree strongly enough.";

  if (bullish >= 3 && bullish > bearish) {
    direction = "BUY";
    className = "signal buy";
    reason = "The selected rules currently lean bullish.";
  } else if (bearish >= 3 && bearish > bullish) {
    direction = "SELL";
    className = "signal sell";
    reason = "The selected rules currently lean bearish.";
  }

  $("direction").textContent = direction;
  $("direction").className = className;
  $("reason").textContent = reason +
    " This is a rule-based estimate, not a guaranteed prediction.";

  $("score").textContent = Math.round(score) + "%";
  $("trend").textContent = fastEMA > slowEMA ? "Bullish" : "Bearish";
  $("rsi").textContent = rsi.toFixed(2);
  $("atr").textContent = atr === null ? "--" : formatPrice(atr);
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

  if (!candles.length) {
    ctx.fillStyle = "#91a4bd";
    ctx.font = "14px Arial";
    ctx.fillText("Waiting for candle data...", 18, 30);
    return;
  }

  const values = candles.map(c => c.close);
  let min = Math.min(...values);
  let max = Math.max(...values);

  if (min === max) {
    min -= 1;
    max += 1;
  }

  const padding = 20;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  ctx.strokeStyle = "#243750";
  ctx.lineWidth = 1;

  for (let i = 0; i < 5; i++) {
    const y = padding + chartHeight * i / 4;
    ctx.beginPath();
    ctx.moveTo(padding, y);
    ctx.lineTo(width - padding, y);
    ctx.stroke();
  }

  ctx.beginPath();

  values.forEach((value, index) => {
    const x = padding +
      index / Math.max(1, values.length - 1) * chartWidth;

    const y = padding +
      (max - value) / (max - min) * chartHeight;

    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });

  ctx.strokeStyle = "#38bdf8";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = "#91a4bd";
  ctx.font = "11px Arial";
  ctx.fillText("High: " + formatPrice(max), padding, 14);
  ctx.fillText("Low: " + formatPrice(min), padding, height - 5);
}

$("category").addEventListener("change", populateSymbols);
$("symbol").addEventListener("change", subscribeToSelectedMarket);

$("timeframe").addEventListener("change", () => {
  subscribeToSelectedMarket();
});

$("refresh").addEventListener("click", () => {
  if (!connected) {
    connect();
  } else {
    subscribeToSelectedMarket();
  }
});

window.addEventListener("resize", drawChart);

connect();
</script>
</body>
</html>
