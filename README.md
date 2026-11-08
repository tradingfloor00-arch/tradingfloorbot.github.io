<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>TradingFloor AI · Binary Signal Engine</title>
<style>
:root{
  --bg:#07111f;--panel:#0d1a2d;--panel2:#12243a;--line:#1e3553;
  --text:#eaf3ff;--muted:#8aa0bb;--cyan:#36c5ff;--green:#19d69b;
  --red:#ff5575;--yellow:#ffd166;--shadow:0 18px 50px rgba(0,0,0,.35);
  --radius:22px;
}
*{box-sizing:border-box}
body{
  margin:0;font-family:Inter,Segoe UI,Roboto,Arial,sans-serif;
  color:var(--text);background:
  radial-gradient(circle at top left,rgba(54,197,255,.12),transparent 28%),
  radial-gradient(circle at top right,rgba(25,214,155,.10),transparent 24%),
  linear-gradient(180deg,#050b14 0%,#07111f 45%,#091522 100%);
  min-height:100vh;
}
.wrap{max-width:1180px;margin:0 auto;padding:28px 18px 40px}
.hero{
  display:flex;justify-content:space-between;gap:18px;align-items:flex-start;
  margin-bottom:18px;flex-wrap:wrap;
}
.badge{
  display:inline-flex;align-items:center;gap:8px;padding:8px 12px;
  border:1px solid rgba(54,197,255,.25);border-radius:999px;
  background:rgba(54,197,255,.08);color:var(--cyan);font-size:12px;
  font-weight:700;letter-spacing:.04em;text-transform:uppercase;
}
h1{margin:10px 0 8px;font-size:34px;line-height:1.1}
.sub{margin:0;color:var(--muted);max-width:720px;line-height:1.55}
.status-box{
  min-width:220px;background:rgba(13,26,45,.9);border:1px solid var(--line);
  border-radius:18px;padding:14px 16px;box-shadow:var(--shadow);
}
.status-label{color:var(--muted);font-size:12px;text-transform:uppercase;letter-spacing:.06em}
.status-value{margin-top:6px;font-weight:700}
.grid{display:grid;grid-template-columns:1.05fr .95fr;gap:18px}
@media (max-width:920px){.grid{grid-template-columns:1fr}}
.card{
  background:linear-gradient(180deg,rgba(18,36,58,.96),rgba(10,20,34,.96));
  border:1px solid var(--line);border-radius:var(--radius);box-shadow:var(--shadow);
  overflow:hidden;
}
.card-head{
  padding:18px 20px;border-bottom:1px solid rgba(30,53,83,.85);
  display:flex;justify-content:space-between;gap:12px;align-items:center;
}
.card-head h2{margin:0;font-size:18px}
.card-body{padding:20px}
.controls{display:grid;grid-template-columns:1fr 1fr;gap:14px}
@media (max-width:640px){.controls{grid-template-columns:1fr}}
label{display:block;margin-bottom:6px;color:var(--muted);font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.05em}
select,input,button,textarea{
  width:100%;border:1px solid #274666;background:#0a1728;color:var(--text);
  border-radius:14px;padding:13px 14px;font:inherit;outline:none;
}
select:focus,input:focus,textarea:focus{border-color:var(--cyan);box-shadow:0 0 0 3px rgba(54,197,255,.12)}
.btn-row{display:grid;grid-template-columns:1.3fr .85fr .85fr;gap:12px;margin-top:16px}
@media (max-width:640px){.btn-row{grid-template-columns:1fr}}
button{
  cursor:pointer;font-weight:800;letter-spacing:.02em;transition:.18s ease;
  border:none;background:linear-gradient(135deg,#1d8dff,#14c9a8);color:#031018;
}
button.secondary{background:#13233a;color:var(--text);border:1px solid #2a4a6d}
button:hover{transform:translateY(-1px);filter:brightness(1.05)}
button:disabled{opacity:.6;cursor:not-allowed;transform:none}
.message{
  margin-top:14px;padding:12px 14px;border-radius:14px;background:rgba(54,197,255,.08);
  border:1px solid rgba(54,197,255,.18);color:#cdefff;font-size:14px;line-height:1.45;
}
.message.error{background:rgba(255,85,117,.08);border-color:rgba(255,85,117,.22);color:#ffd0d8}
.signal-box{
  text-align:center;padding:26px 18px;border-radius:20px;
  background:linear-gradient(180deg,rgba(15,32,52,.95),rgba(8,18,31,.95));
  border:1px solid #23405f;margin-bottom:16px;
}
.signal-name{font-size:42px;font-weight:900;letter-spacing:.08em;margin:8px 0}
.signal-name.call{color:var(--green)}
.signal-name.put{color:var(--red)}
.signal-name.wait{color:var(--yellow)}
.meta{color:var(--muted);font-size:14px}
.metrics{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:16px}
@media (max-width:640px){.metrics{grid-template-columns:1fr 1fr}}
.metric{
  background:rgba(8,18,31,.9);border:1px solid #213a58;border-radius:16px;padding:14px;
}
.metric .k{color:var(--muted);font-size:12px;text-transform:uppercase;letter-spacing:.05em}
.metric .v{margin-top:7px;font-size:18px;font-weight:800}
.votes{display:grid;gap:10px;margin-top:16px}
.vote{
  display:flex;justify-content:space-between;gap:12px;align-items:center;
  padding:12px 14px;border-radius:14px;background:rgba(8,18,31,.85);border:1px solid #203652;
}
.vote b{font-size:13px}
.up{color:var(--green)}.down{color:var(--red)}.neutral{color:var(--yellow)}
.chart-wrap{
  margin-top:16px;border:1px solid #203652;border-radius:18px;overflow:hidden;
  background:rgba(5,12,22,.9);
}
canvas{width:100%;height:190px;display:block}
.footer-note{margin-top:14px;color:var(--muted);font-size:12px;line-height:1.5}
.scorebar{
  height:10px;border-radius:999px;background:#132335;overflow:hidden;margin-top:12px;
}
.scorebar > span{
  display:block;height:100%;width:0;background:linear-gradient(90deg,#1d8dff,#19d69b);
  transition:width .35s ease;
}
.small{font-size:12px;color:var(--muted)}
</style>
</head>
<body>
<div class="wrap" id="tf-binary">
  <div class="hero">
    <div>
      <div class="badge">TradingFloor AI · Quotex Feed</div>
      <h1>Binary Signal Terminal</h1>
      <p class="sub">
        Multi-proxy + OTCharts fallback engine. Reads live/OTC candles, applies
        trend, RSI, MACD, support/resistance, breakout and candlestick votes,
        then returns CALL / PUT / WAIT with confidence scoring.
      </p>
    </div>
    <div class="status-box">
      <div class="status-label">Connection</div>
      <div class="status-value" id="tf-connection">● READY</div>
      <div class="small" style="margin-top:8px">Source: Secure server proxy → market data</div>
    </div>
  </div>

  <div class="grid">
    <div class="card">
      <div class="card-head">
        <h2>Market Controls</h2>
        <span class="small">Choose pair + timeframe</span>
      </div>
      <div class="card-body">
        <div class="controls">
          <div>
            <label>Category</label>
            <select id="tf-category">
              <option value="otc">OTC Forex</option>
              <option value="live">Live Forex</option>
              <option value="crypto">Crypto OTC</option>
              <option value="metals">Metals OTC</option>
            </select>
          </div>
          <div>
            <label>Timeframe (seconds)</label>
            <select id="tf-timeframe">
              <option value="60">M1 (60s)</option>
              <option value="120">M2 (120s)</option>
              <option value="180">M3 (180s)</option>
              <option value="300">M5 (300s)</option>
            </select>
          </div>
          <div>
            <label>Pair</label>
            <select id="tf-pair"></select>
          </div>
          <div>
            <label>Custom Symbol (optional)</label>
            <input id="tf-custom" placeholder="e.g. EURUSD_otc" />
          </div>
          <div style="grid-column:1/-1">
            <label>OTCharts API Key (optional fallback)</label>
            <input id="tf-otkey" type="password" placeholder="Paste free OTCharts key here for fallback" />
            <div class="small" style="margin-top:6px">
              Free key → <a href="https://otcharts.com" target="_blank" style="color:var(--cyan)">otcharts.com</a> (create account → generate key)
            </div>
          </div>
        </div>

        <div class="btn-row">
          <button id="tf-generate">GENERATE SIGNAL</button>
          <button class="secondary" id="tf-refresh">REFRESH</button>
          <button class="secondary" id="tf-auto">AUTO: OFF</button>
        </div>

        <div class="message" id="tf-message">
          Ready. The browser no longer tries blocked public CORS proxies. It uses a secure server route when deployed.
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-head">
        <h2>Live Analysis</h2>
        <span class="small" id="tf-count">0 candles</span>
      </div>
      <div class="card-body">
        <div class="signal-box">
          <div class="meta">Current Signal</div>
          <div class="signal-name wait" id="tf-signal">WAIT</div>
          <div class="meta" id="tf-confidence">No votes yet</div>
          <div class="scorebar"><span id="tf-scorebar"></span></div>
          <div class="meta" style="margin-top:10px" id="tf-reason">Waiting for market data.</div>
        </div>

        <div class="metrics">
          <div class="metric"><div class="k">Price</div><div class="v" id="tf-price">--</div></div>
          <div class="metric"><div class="k">RSI (14)</div><div class="v" id="tf-rsi">--</div></div>
          <div class="metric"><div class="k">SMA 14</div><div class="v" id="tf-sma">--</div></div>
          <div class="metric"><div class="k">MACD Hist</div><div class="v" id="tf-macd">--</div></div>
          <div class="metric"><div class="k">Support</div><div class="v" id="tf-support">--</div></div>
          <div class="metric"><div class="k">Resistance</div><div class="v" id="tf-resistance">--</div></div>
          <div class="metric"><div class="k">Trend</div><div class="v" id="tf-trend">--</div></div>
        </div>

        <div class="votes" id="tf-votes"></div>

        <div class="chart-wrap">
          <canvas id="tf-chart"></canvas>
        </div>

        <div class="footer-note">
          Recent signals journal:
          <div class="votes" id="tf-journal" style="margin-top:10px"></div>
        </div>
      </div>
    </div>
  </div>
</div>
<script>
(function(){
"use strict";

const ROOT = document.getElementById("tf-binary");
if (!ROOT || ROOT.dataset.initialized === "yes") return;
ROOT.dataset.initialized = "yes";

const $ = id => document.getElementById("tf-" + id);

const SAFE_PROXY = "/api/quotex";
const OTCHARTS_API = "/api/quotex";

let autoTimer = null;
let lastCandles = [];
let journal = [];
let busy = false;

const otcPairs = [
  "EURUSD_otc","GBPUSD_otc","USDJPY_otc","AUDUSD_otc",
  "USDCAD_otc","USDCHF_otc","NZDUSD_otc","EURGBP_otc",
  "EURJPY_otc","GBPJPY_otc","AUDJPY_otc","EURCHF_otc",
  "EURCAD_otc","EURAUD_otc","GBPAUD_otc","GBPCAD_otc",
  "GBPCHF_otc","AUDCHF_otc","AUDCAD_otc","AUDNZD_otc",
  "NZDJPY_otc","NZDCHF_otc","CADJPY_otc","CHFJPY_otc",
  "USDMXN_otc","USDZAR_otc","USDINR_otc","USDPKR_otc",
  "USDNGN_otc","USDIDR_otc","USDPHP_otc","USDBDT_otc",
  "USDARS_otc","USDCOP_otc","USDEGP_otc","USDDZD_otc",
  "BRLUSD_otc"
];

const livePairs = [
  "EURUSD","GBPUSD","USDJPY","AUDUSD","USDCAD",
  "USDCHF","NZDUSD","EURGBP","EURJPY","GBPJPY",
  "AUDJPY","EURCHF","EURCAD","EURAUD","GBPAUD",
  "GBPCAD","GBPCHF","AUDCHF","AUDCAD","AUDNZD",
  "NZDJPY","NZDCHF","CADJPY","CHFJPY","XAUUSD","XAGUSD"
];

const cryptoPairs = [
  "BTCUSD_otc","ETHUSD_otc","LTCUSD_otc","BCHUSD_otc",
  "BNBUSD_otc","SOLUSD_otc","XRPUSD_otc","DOGEUSD_otc",
  "DOTUSD_otc","ETCUSD_otc"
];

const metalPairs = ["XAUUSD_otc","XAGUSD_otc"];

const savedKey = localStorage.getItem("tf_otcharts_key") || "";
if (savedKey) $("otkey").value = savedKey;

$("otkey").addEventListener("change", () => {
  localStorage.setItem("tf_otcharts_key", $("otkey").value.trim());
});

function setStatus(message, error) {
  $("connection").textContent = (error ? "● ERROR" : "● " + message);
  $("connection").style.color = error ? "#ff8797" : "#36c5ff";
}

function setMessage(message, error) {
  $("message").textContent = message;
  $("message").className = "message" + (error ? " error" : "");
}

function selectedPair() {
  return $("custom").value.trim() || $("pair").value;
}

function selectedTimeframe() {
  return $("timeframe").value || "60";
}

function changeCategory() {
  const category = $("category").value;
  const list = category === "live" ? livePairs :
               category === "crypto" ? cryptoPairs :
               category === "metals" ? metalPairs : otcPairs;
  const select = $("pair");
  const old = select.value;
  select.innerHTML = "";
  list.forEach(pair => {
    const option = document.createElement("option");
    option.value = pair;
    option.textContent = pair;
    select.appendChild(option);
  });
  if (list.includes(old)) select.value = old;
  $("custom").value = "";
}

$("category").addEventListener("change", changeCategory);
changeCategory();

function normalizeCandles(data) {
  let rows = data?.candles ?? data?.data?.candles ?? data?.data ?? data?.result ?? data;
  if (rows && !Array.isArray(rows)) {
    if (Array.isArray(rows.items)) rows = rows.items;
    else if (Array.isArray(rows.history)) rows = rows.history;
    else if (Array.isArray(rows.candles)) rows = rows.candles;
  }
  if (!Array.isArray(rows)) return [];

  return rows.map(c => {
    if (Array.isArray(c)) {
      return {
        time: Number(c[0]),
        open: Number(c[1]),
        high: Number(c[2]),
        low: Number(c[3]),
        close: Number(c[4])
      };
    }
    return {
      time: Number(c.time ?? c.timestamp ?? c.from ?? c.at ?? 0),
      open: Number(c.open ?? c.o),
      high: Number(c.high ?? c.max ?? c.h),
      low: Number(c.low ?? c.min ?? c.l),
      close: Number(c.close ?? c.price ?? c.c)
    };
  }).filter(c =>
    Number.isFinite(c.open) && Number.isFinite(c.high) &&
    Number.isFinite(c.low) && Number.isFinite(c.close) &&
    c.close > 0
  ).sort((a, b) => a.time - b.time);
}

async function tryFetch(url, options = {}, timeoutMs = 16000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      method: "GET",
      cache: "no-store",
      signal: controller.signal,
      ...options
    });

    const raw = await response.text();
    if (!response.ok) throw new Error(`HTTP ${response.status}: ${raw.slice(0, 180)}`);

    let data;
    try { data = JSON.parse(raw); }
    catch (e) { throw new Error("Invalid JSON returned"); }
    return data;
  } finally {
    clearTimeout(timer);
  }
}

async function fetchFromServer(pair, tf) {
  const base = new URL(SAFE_PROXY, window.location.origin || window.location.href);
  base.searchParams.set("symbol", pair);
  base.searchParams.set("tf", String(tf));
  base.searchParams.set("limit", "120");

  setMessage("Requesting candles from secure server proxy...");
  const data = await tryFetch(base.toString(), {
    headers: { "Accept": "application/json" }
  });

  const candles = normalizeCandles(data);
  if (candles.length < 25) {
    throw new Error(`Server proxy returned only ${candles.length} valid candles`);
  }

  return candles;
}

async function fetchFromOTCharts(pair, tf) {
  const key = $("otkey").value.trim();
  if (!key) throw new Error("No OTCharts API key provided");

  const base = new URL(OTCHARTS_API, window.location.origin || window.location.href);
  base.searchParams.set("symbol", pair);
  base.searchParams.set("tf", String(tf));
  base.searchParams.set("limit", "120");
  base.searchParams.set("venue", "quotex");

  setMessage("Using OTCharts fallback through the secure proxy...");
  const data = await tryFetch(base.toString(), {
    headers: {
      "Accept": "application/json",
      "x-otcharts-key": key
    }
  });

  const candles = normalizeCandles(data);
  if (candles.length < 25) {
    throw new Error(`OTCharts returned only ${candles.length} candles`);
  }
  return candles;
}

async function fetchCandles() {
  const pair = selectedPair();
  const tf = selectedTimeframe();

  try {
    return await fetchFromServer(pair, tf);
  } catch (serverErr) {
    if (window.location.hostname.endsWith("github.io") || window.location.protocol === "file:") {
      throw new Error(
        "This page is running in GitHub Pages or local file mode, which cannot fetch market data directly. " +
        "Deploy it on Vercel/Netlify/Cloudflare Workers and keep the /api/quotex route active, then retry."
      );
    }

    try {
      return await fetchFromOTCharts(pair, tf);
    } catch (otErr) {
      throw new Error(
        "Secure proxy failed. " + serverErr.message + " OTCharts fallback failed: " + otErr.message +
        ". Add your OTCharts key or deploy the server proxy correctly."
      );
    }
  }
}

function average(values) {
  return values.reduce((a, b) => a + b, 0) / values.length;
}

function sma(values, period) {
  if (values.length < period) return null;
  return average(values.slice(-period));
}

function calculateRSI(values, period = 14) {
  if (values.length <= period) return null;
  let gains = 0, losses = 0;
  for (let i = values.length - period; i < values.length; i++) {
    const change = values[i] - values[i - 1];
    if (change > 0) gains += change;
    else losses -= change;
  }
  if (losses === 0) return 100;
  const rs = (gains / period) / (losses / period);
  return 100 - (100 / (1 + rs));
}

function ema(values, period) {
  if (values.length < period) return [];
  let result = [];
  let current = average(values.slice(0, period));
  result.push(current);
  const multiplier = 2 / (period + 1);
  for (let i = period; i < values.length; i++) {
    current = (values[i] - current) * multiplier + current;
    result.push(current);
  }
  return result;
}

function calculateMACD(values) {
  const fast = ema(values, 12);
  const slow = ema(values, 26);
  if (!fast.length || !slow.length) return null;
  const macd = [];
  for (let i = 0; i < slow.length; i++) {
    macd.push(fast[i + 14] - slow[i]);
  }
  const signal = ema(macd, 9);
  if (!signal.length) return null;
  return {
    line: macd[macd.length - 1],
    signal: signal[signal.length - 1],
    histogram: macd[macd.length - 1] - signal[signal.length - 1]
  };
}

function analyze(candles) {
  const closes = candles.map(c => c.close);
  const highs = candles.map(c => c.high);
  const lows = candles.map(c => c.low);
  const last = candles[candles.length - 1];
  const previous = candles[candles.length - 2];

  const ma14 = sma(closes, 14);
  const ma30 = sma(closes, 30);
  const rsi = calculateRSI(closes, 14);
  const macd = calculateMACD(closes);

  const recentHigh = Math.max(...highs.slice(-20, -1));
  const recentLow = Math.min(...lows.slice(-20, -1));
  const support = Math.min(...lows.slice(-30));
  const resistance = Math.max(...highs.slice(-30));

  let votes = [];
  let trend = "NEUTRAL";

  if (last.close > ma14 && ma14 > ma30) trend = "BULLISH";
  else if (last.close < ma14 && ma14 < ma30) trend = "BEARISH";

  votes.push({
    name: "Trend and SMA analysis",
    direction: trend === "BULLISH" ? "CALL" : trend === "BEARISH" ? "PUT" : "WAIT",
    detail: "Price, SMA 14 and SMA 30 alignment"
  });

  let rsiDirection = "WAIT";
  if (rsi !== null) {
    if (rsi >= 52 && rsi < 70) rsiDirection = "CALL";
    else if (rsi <= 48 && rsi > 30) rsiDirection = "PUT";
  }
  votes.push({
    name: "RSI momentum",
    direction: rsiDirection,
    detail: "RSI " + (rsi === null ? "unavailable" : rsi.toFixed(2))
  });

  let macdDirection = "WAIT";
  if (macd) {
    if (macd.histogram > 0 && macd.line > macd.signal) macdDirection = "CALL";
    if (macd.histogram < 0 && macd.line < macd.signal) macdDirection = "PUT";
  }
  votes.push({
    name: "MACD momentum",
    direction: macdDirection,
    detail: macd ? "MACD histogram " + macd.histogram.toFixed(6) : "Insufficient MACD history"
  });

  let srDirection = "WAIT";
  const range = Math.max(resistance - support, 0);
  if (range > 0) {
    const position = (last.close - support) / range;
    if (position <= 0.18 && last.close > previous.close) srDirection = "CALL";
    if (position >= 0.82 && last.close < previous.close) srDirection = "PUT";
  }
  votes.push({
    name: "Support and resistance",
    direction: srDirection,
    detail: "Nearby 30-candle price zones"
  });

  let breakoutDirection = "WAIT";
  if (last.close > recentHigh) breakoutDirection = "CALL";
  if (last.close < recentLow) breakoutDirection = "PUT";
  votes.push({
    name: "Breakout analysis",
    direction: breakoutDirection,
    detail: "Close beyond previous 19-candle range"
  });

  let candleDirection = "WAIT";
  const body = Math.abs(last.close - last.open);
  const lowerWick = Math.min(last.open, last.close) - last.low;
  const upperWick = last.high - Math.max(last.open, last.close);

  if (last.close > last.open && lowerWick > body * 1.5 && last.close > previous.close) candleDirection = "CALL";
  else if (last.close < last.open && upperWick > body * 1.5 && last.close < previous.close) candleDirection = "PUT";
  else if (last.close > last.open && previous.close < previous.open &&
           last.close > previous.open && last.open < previous.close) candleDirection = "CALL";
  else if (last.close < last.open && previous.close > previous.open &&
           last.close < previous.open && last.open > previous.close) candleDirection = "PUT";

  votes.push({
    name: "Candlestick patterns",
    direction: candleDirection,
    detail: "Engulfing and rejection candle checks"
  });

  const calls = votes.filter(v => v.direction === "CALL").length;
  const puts = votes.filter(v => v.direction === "PUT").length;

  let signal = "WAIT";
  if (calls >= 4 && calls - puts >= 2) signal = "CALL";
  else if (puts >= 4 && puts - calls >= 2) signal = "PUT";

  const score = Math.max(calls, puts);
  const confidence = Math.round(score / 6 * 100);

  return {
    signal, calls, puts, score, confidence, votes,
    price: last.close, rsi, ma14, macd, support, resistance,
    trend, candleCount: candles.length,
    recentHigh, recentLow
  };
}

function fmt(value) {
  if (value === null || value === undefined || !Number.isFinite(value)) return "--";
  return value.toFixed(value > 100 ? 3 : 5);
}

function renderVotes(votes) {
  $("votes").innerHTML = "";
  votes.forEach(v => {
    const row = document.createElement("div");
    row.className = "vote";
    const name = document.createElement("span");
    name.textContent = v.name + " · " + v.detail;
    const result = document.createElement("b");
    result.textContent = v.direction;
    result.className = v.direction === "CALL" ? "up" : v.direction === "PUT" ? "down" : "neutral";
    row.appendChild(name);
    row.appendChild(result);
    $("votes").appendChild(row);
  });
}

function renderChart(candles) {
  const canvas = $("chart");
  const rect = canvas.getBoundingClientRect();
  const ratio = window.devicePixelRatio || 1;
  canvas.width = Math.max(300, Math.floor(rect.width * ratio));
  canvas.height = Math.floor(190 * ratio);
  const ctx = canvas.getContext("2d");
  ctx.scale(ratio, ratio);
  const w = canvas.width / ratio, h = canvas.height / ratio;
  ctx.clearRect(0, 0, w, h);

  const data = candles.slice(-45);
  if (data.length < 2) return;

  const max = Math.max(...data.map(c => c.high));
  const min = Math.min(...data.map(c => c.low));
  const span = max - min || 1;
  const pad = 12;
  const chartH = h - 24;
  const step = (w - pad * 2) / data.length;
  const candleW = Math.max(2, step * 0.58);

  ctx.strokeStyle = "#203b59";
  ctx.lineWidth = 1;
  for (let i = 1; i < 4; i++) {
    const y = pad + (chartH / 4) * i;
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
  }

  data.forEach((c, i) => {
    const x = pad + i * step + step / 2;
    const y = value => pad + (max - value) / span * chartH;
    const up = c.close >= c.open;
    ctx.strokeStyle = up ? "#19d69b" : "#ff5575";
    ctx.fillStyle = ctx.strokeStyle;
    ctx.beginPath();
    ctx.moveTo(x, y(c.high)); ctx.lineTo(x, y(c.low)); ctx.stroke();
    const top = y(Math.max(c.open, c.close));
    const bottom = y(Math.min(c.open, c.close));
    ctx.fillRect(x - candleW / 2, top, candleW, Math.max(1, bottom - top));
  });
}

function render(result, candles) {
  const signal = result.signal;
  $("signal").textContent = signal;
  $("signal").className = "signal-name " +
    (signal === "CALL" ? "call" : signal === "PUT" ? "put" : "wait");

  $("confidence").textContent =
    result.calls + " CALL votes · " + result.puts +
    " PUT votes · " + result.score + "/6 agreement";

  $("scorebar").style.width = result.confidence + "%";
  $("reason").textContent = signal === "WAIT"
    ? "No sufficiently strong agreement. Waiting for a clearer setup."
    : "The analysis engine found " + result.score +
      " aligned votes. Confirm the next candle before acting.";

  $("price").textContent = fmt(result.price);
  $("rsi").textContent = result.rsi === null ? "--" : result.rsi.toFixed(2);
  $("sma").textContent = fmt(result.ma14);
  $("macd").textContent = result.macd ? result.macd.histogram.toFixed(6) : "--";
  $("support").textContent = fmt(result.support);
  $("resistance").textContent = fmt(result.resistance);
  $("trend").textContent = result.trend;
  $("count").textContent = result.candleCount + " candles";

  renderVotes(result.votes);
  renderChart(candles);

  if (signal !== "WAIT") {
    const entry = {
      time: new Date().toLocaleTimeString(),
      pair: selectedPair(),
      signal,
      price: result.price,
      score: result.score
    };
    journal.unshift(entry);
    journal = journal.slice(0, 20);
    $("journal").innerHTML = "";
    journal.forEach(item => {
      const line = document.createElement("div");
      line.className = "vote";
      const left = document.createElement("span");
      left.textContent = item.time + " · " + item.pair;
      const right = document.createElement("b");
      right.textContent = item.signal + " · " + item.score + "/6";
      right.className = item.signal === "CALL" ? "up" : "down";
      line.appendChild(left);
      line.appendChild(right);
      $("journal").appendChild(line);
    });
  }
}

async function generate() {
  if (busy) return;
  busy = true;
  $("generate").disabled = true;
  $("refresh").disabled = true;
  setStatus("FETCHING");
  setMessage("Requesting candles for " + selectedPair() + " (" + selectedTimeframe() + "s)...");

  try {
    const candles = await fetchCandles();
    lastCandles = candles;
    const result = analyze(candles);
    render(result, candles);
    setStatus("FEED CONNECTED");
    setMessage("Received " + candles.length + " candles for " + selectedPair() + ". Analysis completed.");
  } catch (error) {
    setStatus("FEED ERROR", true);
    setMessage("Feed error: " + error.message, true);
    $("signal").textContent = "WAIT";
    $("signal").className = "signal-name wait";
    $("confidence").textContent = "No valid feed · No signal generated";
    $("reason").textContent = "Waiting for valid market data.";
  } finally {
    busy = false;
    $("generate").disabled = false;
    $("refresh").disabled = false;
  }
}

$("generate").addEventListener("click", generate);
$("refresh").addEventListener("click", generate);

$("auto").addEventListener("click", () => {
  if (autoTimer) {
    clearInterval(autoTimer);
    autoTimer = null;
    $("auto").textContent = "AUTO: OFF";
    setMessage("Automatic refresh stopped.");
  } else {
    autoTimer = setInterval(generate, 30000);
    $("auto").textContent = "AUTO: ON";
    generate();
    setMessage("Automatic refresh enabled: every 30 seconds.");
  }
});

window.addEventListener("resize", () => {
  if (lastCandles.length) renderChart(lastCandles);
});

})();
</script>
</body>
</html>
