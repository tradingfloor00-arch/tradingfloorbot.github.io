<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="theme-color" content="#071426">
<title>TradingFloor AI | Market Intelligence</title>

<style>
:root{
 --bg:#061222;
 --panel:#0c1b2e;
 --panel2:#10243b;
 --panel3:#081729;
 --line:#1e3b59;
 --blue:#329cff;
 --cyan:#55d8e8;
 --green:#20c997;
 --red:#ff647c;
 --gold:#e9bd64;
 --text:#eaf3fc;
 --muted:#8da6c0;
 --shadow:0 16px 45px #0005;
}

*{box-sizing:border-box}

body{
 margin:0;
 background:
 radial-gradient(ellipse at 20% 0%,#153d65 0,transparent 35%),
 radial-gradient(ellipse at 90% 10%,#102c4b 0,transparent 30%),
 var(--bg);
 color:var(--text);
 font:14px/1.5 Inter,Arial,sans-serif;
}

button,input,select{font:inherit}
button{cursor:pointer}
a{text-decoration:none;color:inherit}

.app{
 display:grid;
 grid-template-columns:245px minmax(0,1fr);
 min-height:100vh;
}

.sidebar{
 background:#081729;
 border-right:1px solid var(--line);
 padding:22px 15px;
 position:sticky;
 top:0;
 height:100vh;
 overflow:auto;
}

.brand{
 display:flex;
 align-items:center;
 gap:12px;
 padding:4px 8px 25px;
 border-bottom:1px solid var(--line);
}

.logo{
 width:43px;
 height:43px;
 display:grid;
 place-items:center;
 border-radius:13px;
 color:#061222;
 font-size:18px;
 font-weight:950;
 background:linear-gradient(135deg,#2385ed,#55d8e8);
 box-shadow:0 7px 25px #2385ed55;
}

.brand h1{
 font-size:14px;
 letter-spacing:2px;
 margin:0;
}

.brand small{
 color:var(--muted);
 font-size:9px;
 letter-spacing:1.5px;
}

.nav-label{
 margin:25px 10px 9px;
 color:#64809c;
 font-size:9px;
 font-weight:800;
 letter-spacing:2px;
}

.nav-link{
 display:flex;
 align-items:center;
 gap:12px;
 padding:12px;
 margin:4px 0;
 border-radius:9px;
 color:#a9bfd4;
 font-size:12px;
 font-weight:700;
 transition:.2s;
}

.nav-link:hover,
.nav-link.active{
 color:white;
 background:linear-gradient(90deg,#1765a9,#12304d);
 border:1px solid #286ba5;
}

.nav-icon{
 width:22px;
 text-align:center;
 font-size:16px;
}

.sidebar-note{
 margin-top:35px;
 padding:12px;
 border:1px solid var(--line);
 background:#0b2035;
 border-radius:10px;
 color:var(--muted);
 font-size:10px;
}

.main{
 min-width:0;
 padding:22px;
}

.topbar{
 display:flex;
 justify-content:space-between;
 align-items:center;
 gap:15px;
 padding-bottom:18px;
 border-bottom:1px solid var(--line);
}

.topbar h2{
 margin:0;
 font-size:17px;
 letter-spacing:1px;
}

.topbar p{
 margin:3px 0 0;
 color:var(--muted);
 font-size:10px;
}

.status{
 display:flex;
 align-items:center;
 gap:8px;
 color:var(--muted);
 font-size:10px;
}

.dot{
 width:8px;
 height:8px;
 border-radius:50%;
 background:var(--gold);
}

.dot.ok{background:var(--green)}
.dot.bad{background:var(--red)}

.hero{
 display:flex;
 justify-content:space-between;
 align-items:flex-end;
 gap:15px;
 padding:25px 0 18px;
}

.eyebrow{
 color:var(--cyan);
 font-size:9px;
 font-weight:850;
 letter-spacing:2px;
 text-transform:uppercase;
}

.hero h2{
 font-size:26px;
 margin:5px 0;
 line-height:1.2;
}

.hero p{
 color:var(--muted);
 font-size:11px;
 margin:5px 0 0;
}

.pill{
 display:inline-flex;
 align-items:center;
 padding:5px 10px;
 border:1px solid #285277;
 border-radius:30px;
 background:#102a45;
 color:#b9dcf8;
 font-size:9px;
 font-weight:800;
 white-space:nowrap;
}

.panel{
 background:linear-gradient(145deg,#10243a,#09192b);
 border:1px solid var(--line);
 border-radius:14px;
 padding:15px;
 box-shadow:var(--shadow);
 min-width:0;
}

.panel-head{
 display:flex;
 justify-content:space-between;
 align-items:center;
 gap:10px;
 margin-bottom:13px;
}

.panel-head h3{
 margin:3px 0 0;
 font-size:14px;
}

.muted{color:var(--muted)}

.grid{
 display:grid;
 grid-template-columns:repeat(4,minmax(0,1fr));
 gap:10px;
}

.metric{
 background:#071729;
 border:1px solid #1b3854;
 border-radius:10px;
 padding:11px;
 min-width:0;
}

.metric small{
 display:block;
 color:var(--muted);
 font-size:9px;
 text-transform:uppercase;
 letter-spacing:1px;
}

.metric strong{
 display:block;
 margin-top:5px;
 font-size:17px;
 overflow-wrap:anywhere;
}

.controls{
 display:grid;
 grid-template-columns:minmax(160px,1.5fr) minmax(110px,.8fr) auto;
 gap:9px;
 margin:13px 0;
}

.field label{
 display:block;
 color:var(--muted);
 font-size:10px;
 margin-bottom:5px;
}

.field select,
.field input{
 width:100%;
 min-height:41px;
 padding:9px;
 border:1px solid #2a4a68;
 border-radius:8px;
 background:#071629;
 color:var(--text);
 outline:none;
}

.field select:focus,
.field input:focus{
 border-color:var(--blue);
}

.btn{
 min-height:40px;
 padding:9px 14px;
 border:1px solid #3986c6;
 border-radius:8px;
 background:linear-gradient(135deg,#176fc2,#229cc8);
 color:white;
 font-size:11px;
 font-weight:850;
}

.btn:hover{filter:brightness(1.12)}
.btn.secondary{
 background:#142d47;
 border-color:#315472;
}
.btn:disabled{
 opacity:.55;
 cursor:not-allowed;
}

.chart-box{
 margin-top:12px;
 padding:10px;
 background:#071526;
 border:1px solid #1b3550;
 border-radius:11px;
}

canvas{
 width:100%;
 height:270px;
 display:block;
}

.signal-box{
 background:#071729;
 border:1px solid #24435f;
 border-radius:11px;
 padding:13px;
}

.signal-direction{
 font-size:29px;
 font-weight:950;
 letter-spacing:1px;
}

.buy{color:var(--green)}
.sell{color:var(--red)}
.wait{color:var(--gold)}

.score-bar{
 height:7px;
 background:#20364c;
 border-radius:20px;
 overflow:hidden;
 margin:10px 0;
}

.score-bar span{
 display:block;
 height:100%;
 width:0;
 background:linear-gradient(90deg,var(--blue),var(--cyan));
}

.detail-row{
 display:flex;
 justify-content:space-between;
 gap:10px;
 padding:7px 0;
 border-bottom:1px solid #1b344c;
 font-size:11px;
}

.detail-row:last-child{border:0}
.detail-row span{color:var(--muted)}

.vote-grid{
 display:grid;
 grid-template-columns:repeat(2,minmax(0,1fr));
 gap:7px;
 margin-top:10px;
}

.vote{
 display:flex;
 justify-content:space-between;
 gap:8px;
 padding:8px;
 background:#091a2c;
 border:1px solid #1d3853;
 border-radius:8px;
 font-size:10px;
}

.vote b{font-size:9px}

.section{
 display:none;
 animation:fade .2s ease;
}

.section.active{display:block}

@keyframes fade{
 from{opacity:.5;transform:translateY(4px)}
 to{opacity:1;transform:translateY(0)}
}

.content-grid{
 display:grid;
 grid-template-columns:minmax(0,1.6fr) minmax(280px,.8fr);
 gap:13px;
 align-items:start;
}

.stack{
 display:grid;
 gap:13px;
}

.feed-note{
 margin-top:10px;
 padding:10px;
 border:1px dashed #31516e;
 border-radius:9px;
 background:#091a2b;
 color:var(--muted);
 font-size:10px;
}

.table-wrap{
 overflow:auto;
 margin-top:10px;
}

table{
 width:100%;
 border-collapse:collapse;
 min-width:520px;
 font-size:10px;
}

th,td{
 text-align:left;
 padding:9px;
 border-bottom:1px solid #1b3047;
}

th{color:var(--muted)}

.footer{
 text-align:center;
 color:#8096ad;
 font-size:10px;
 padding:25px 0 10px;
}

@media(max-width:1000px){
 .app{grid-template-columns:190px minmax(0,1fr)}
 .content-grid{grid-template-columns:1fr}
}

@media(max-width:700px){
 .app{display:block}
 .sidebar{
  position:relative;
  width:100%;
  height:auto;
  padding:10px;
  border-right:0;
  border-bottom:1px solid var(--line);
 }
 .brand{padding:5px 5px 12px}
 .nav-label,.sidebar-note{display:none}
 .sidebar nav{
  display:flex;
  overflow-x:auto;
  gap:5px;
  padding-top:8px;
 }
 .nav-link{
  flex:0 0 auto;
  padding:9px;
  margin:0;
  font-size:10px;
 }
 .nav-icon{display:none}
 .main{padding:12px}
 .hero{align-items:flex-start;flex-direction:column}
 .hero h2{font-size:21px}
 .grid{grid-template-columns:repeat(2,minmax(0,1fr))}
 .controls{grid-template-columns:1fr 1fr}
 .controls .btn{grid-column:1/-1;width:100%}
 .vote-grid{grid-template-columns:1fr}
 canvas{height:220px}
 .topbar{align-items:flex-start}
}
</style>
</head>

<body>
<div class="app">

<aside class="sidebar">
 <div class="brand">
  <div class="logo">TF</div>
  <div>
   <h1>TRADINGFLOOR AI</h1>
   <small>MARKET INTELLIGENCE</small>
  </div>
 </div>

 <div class="nav-label">WORKSPACE</div>
 <nav>
  <a class="nav-link active" href="#forex" data-page="forex">
   <span class="nav-icon">◈</span> Forex Bot
  </a>
  <a class="nav-link" href="#binary" data-page="binary">
   <span class="nav-icon">◉</span> Binary Intelligence
  </a>
  <a class="nav-link" href="#deriv" data-page="deriv">
   <span class="nav-icon">◇</span> Deriv
  </a>
 </nav>

 <div class="nav-label">INFORMATION</div>
 <nav>
  <a class="nav-link" href="#journal" data-page="journal">
   <span class="nav-icon">▤</span> Signal Journal
  </a>
 </nav>

 <div class="sidebar-note">
  <b>TRADINGFLOOR AI</b>
  <p>Independent market analysis using public market data and multi-method confluence.</p>
  <span class="pill">NO AUTOMATIC EXECUTION</span>
 </div>
</aside>

<main class="main">

<header class="topbar">
 <div>
  <h2>MARKET INTELLIGENCE TERMINAL</h2>
  <p>Forex · Binary · Deriv · Technical analysis</p>
 </div>
 <div class="status">
  <span class="dot" id="globalDot"></span>
  <span id="globalStatus">CONNECTING TO MARKET FEED</span>
 </div>
</header>

<section class="hero">
 <div>
  <div class="eyebrow">TradingFloor AI · Professional workspace</div>
  <h2>Trade the setup. Not the noise.</h2>
  <p>Live public market data · Six-method confluence · Multi-timeframe analysis</p>
 </div>
 <span class="pill">PUBLIC MARKET DATA</span>
</section>
<section class="page-section active" id="page-forex">
  <div class="section-heading">
    <div>
      <span class="eyebrow">GLOBAL CURRENCY MARKETS</span>
      <h2>Forex Intelligence</h2>
      <p>Analyse available currency pairs using six complementary methods.</p>
    </div>
    <span class="status-pill" id="forex-status">FEED CONNECTING</span>
  </div>

  <div class="panel">
    <div class="control-grid">
      <label>Forex instrument
        <select id="forex-symbol">
          <option value="">Loading available pairs...</option>
        </select>
      </label>
      <label>Timeframe
        <select id="forex-timeframe">
          <option value="60">1 minute</option>
          <option value="300">5 minutes</option>
          <option value="900">15 minutes</option>
          <option value="1800">30 minutes</option>
          <option value="3600" selected>1 hour</option>
          <option value="14400">4 hours</option>
          <option value="86400">1 day</option>
        </select>
      </label>
    </div>
    <button class="primary-btn" id="forex-generate">
      ✦ Generate Forex Signal
    </button>
    <p class="muted" id="forex-message">
      Select a pair and generate an analysis.
    </p>
  </div>

  <div class="metrics-grid">
    <div class="metric-card">
      <small>LIVE PRICE</small>
      <strong id="forex-price">--</strong>
    </div>
    <div class="metric-card">
      <small>MARKET DIRECTION</small>
      <strong id="forex-direction">WAIT</strong>
    </div>
    <div class="metric-card">
      <small>CONFLUENCE</small>
      <strong id="forex-score">--</strong>
    </div>
  </div>

  <div class="panel">
    <div class="panel-heading">
      <h3>Forex Signal Analysis</h3>
      <span id="forex-signal-badge">NO SETUP</span>
    </div>
    <div class="signal-grid">
      <div><small>Signal</small><strong id="forex-signal">WAIT</strong></div>
      <div><small>Entry</small><strong id="forex-entry">--</strong></div>
      <div><small>Stop loss</small><strong id="forex-sl">--</strong></div>
      <div><small>Take profit</small><strong id="forex-tp">--</strong></div>
    </div>
  </div>

  <div class="panel">
    <h3>Six-method analysis</h3>
    <div id="forex-methods" class="method-list">
      <p class="muted">Analysis results will appear here.</p>
    </div>
  </div>
</section>

<section class="page-section" id="page-binary">
  <div class="section-heading">
    <div>
      <span class="eyebrow">SHORT-TERM MARKET INTELLIGENCE</span>
      <h2>Binary Intelligence</h2>
      <p>Analyse short-term price behaviour and candle formations.</p>
    </div>
    <span class="status-pill" id="binary-status">CONNECTING</span>
  </div>

  <div class="panel">
    <div class="control-grid">
      <label>Market
        <select id="binary-symbol">
          <option value="BTCUSDT">BTC/USDT</option>
          <option value="ETHUSDT">ETH/USDT</option>
        </select>
      </label>
      <label>Expiry / timeframe
        <select id="binary-timeframe">
          <option value="1m">1 minute</option>
          <option value="5m">5 minutes</option>
          <option value="15m">15 minutes</option>
          <option value="30m">30 minutes</option>
          <option value="1h">1 hour</option>
        </select>
      </label>
    </div>

    <button class="primary-btn" id="binary-generate">
      ✦ Generate Binary Signal
    </button>

    <div class="binary-countdown">
      <span>Next candle closes in</span>
      <strong id="binary-countdown">--:--</strong>
    </div>
    <p id="binary-message" class="muted">
      Waiting for market data.
    </p>
  </div>

  <div class="metrics-grid">
    <div class="metric-card">
      <small>MARKET PRICE</small>
      <strong id="binary-price">--</strong>
    </div>
    <div class="metric-card">
      <small>DIRECTION</small>
      <strong id="binary-direction">WAIT</strong>
    </div>
    <div class="metric-card">
      <small>CONFLUENCE</small>
      <strong id="binary-score">--</strong>
    </div>
  </div>

  <div class="panel">
    <h3>Binary Signal</h3>
    <div class="binary-result" id="binary-result">WAIT</div>
    <p id="binary-explanation" class="muted">
      Generate an analysis to see the current setup.
    </p>
  </div>

  <div class="panel">
    <h3>Analysis breakdown</h3>
    <div id="binary-methods" class="method-list">
      <p class="muted">No analysis generated yet.</p>
    </div>
  </div>
</section>

<section class="page-section" id="page-deriv">
  <div class="section-heading">
    <div>
      <span class="eyebrow">DERIV SYNTHETIC MARKETS</span>
      <h2>Deriv Intelligence</h2>
      <p>Live synthetic-index data with volatility-aware technical analysis.</p>
    </div>
    <span class="status-pill" id="deriv-status">CONNECTING</span>
  </div>

  <div class="panel">
    <div class="feed-header">
      <div>
        <h3>Deriv Public Market Feed</h3>
        <p class="muted" id="deriv-feed-message">
          Connecting to Deriv's public WebSocket...
        </p>
      </div>
      <span id="deriv-live-indicator" class="live-indicator">
        DISCONNECTED
      </span>
    </div>

    <div class="control-grid">
      <label>Market category
        <select id="deriv-category">
          <option value="all">All synthetic indices</option>
          <option value="volatility">Volatility indices</option>
          <option value="crash">Crash indices</option>
          <option value="boom">Boom indices</option>
          <option value="step">Step indices</option>
          <option value="range">Range Break indices</option>
          <option value="drift">Drift Switch indices</option>
        </select>
      </label>

      <label>Available synthetic market
        <select id="deriv-symbol">
          <option value="">Loading Deriv instruments...</option>
        </select>
      </label>

      <label>Analysis timeframe
        <select id="deriv-timeframe">
          <option value="60">1 minute</option>
          <option value="300">5 minutes</option>
          <option value="900" selected>15 minutes</option>
          <option value="1800">30 minutes</option>
          <option value="3600">1 hour</option>
          <option value="14400">4 hours</option>
        </select>
      </label>
    </div>

    <button class="primary-btn" id="deriv-generate">
      ✦ Generate Deriv Signal
    </button>

    <p class="muted" id="deriv-message">
      Waiting for an active synthetic market.
    </p>
  </div>

  <div class="metrics-grid">
    <div class="metric-card">
      <small>LIVE SYNTHETIC PRICE</small>
      <strong id="deriv-price">--</strong>
    </div>
    <div class="metric-card">
      <small>MARKET DIRECTION</small>
      <strong id="deriv-direction">WAIT</strong>
    </div>
    <div class="metric-card">
      <small>CONFLUENCE SCORE</small>
      <strong id="deriv-score">--</strong>
    </div>
  </div>

  <div class="panel">
    <div class="panel-heading">
      <h3>Deriv Signal</h3>
      <span id="deriv-signal-badge">NO SETUP</span>
    </div>

    <div class="signal-grid">
      <div><small>Signal</small><strong id="deriv-signal">WAIT</strong></div>
      <div><small>Entry</small><strong id="deriv-entry">--</strong></div>
      <div><small>Stop loss</small><strong id="deriv-sl">--</strong></div>
      <div><small>Take profit</small><strong id="deriv-tp">--</strong></div>
    </div>
  </div>

  <div class="panel">
    <h3>Six-method synthetic analysis</h3>
    <p class="muted">
      Synthetic indices require their own volatility and price-behaviour
      calculations. This analysis does not assume conventional Forex
      market volume or institutional order flow.
    </p>
    <div id="deriv-methods" class="method-list">
      <p class="muted">Waiting for sufficient live candle data.</p>
    </div>
  </div>

  <div class="panel">
    <h3>Deriv market information</h3>
    <div class="metrics-grid">
      <div class="metric-card">
        <small>VOLATILITY REGIME</small>
        <strong id="deriv-volatility">--</strong>
      </div>
      <div class="metric-card">
        <small>PRICE MOMENTUM</small>
        <strong id="deriv-momentum">--</strong>
      </div>
      <div class="metric-card">
        <small>MARKET STRUCTURE</small>
        <strong id="deriv-structure">--</strong>
      </div>
    </div>
  </div>
</section>

<section class="page-section" id="page-journal">
  <div class="section-heading">
    <div>
      <span class="eyebrow">PERFORMANCE TRACKING</span>
      <h2>Trading Journal</h2>
      <p>Review generated signals and keep a record of your analysis.</p>
    </div>
  </div>

  <div class="panel">
    <div class="panel-heading">
      <h3>Signal History</h3>
      <div class="journal-actions">
        <button class="secondary-btn" id="export-csv">Export CSV</button>
        <button class="secondary-btn" id="clear-history">Clear History</button>
      </div>
    </div>

    <div class="table-wrap">
      <table class="data-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Section</th>
            <th>Market</th>
            <th>Timeframe</th>
            <th>Signal</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody id="journal-body">
          <tr>
            <td colspan="6" class="muted">No signals recorded yet.</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p class="muted">
      Journal entries are stored locally in this browser.
    </p>
  </div>
</section>
<script>
"use strict";

/* ==========================================
   TRADINGFLOOR AI - DERIV PUBLIC API
   Official public endpoint:
   No login, token or App ID required.
========================================== */

const TF_CONFIG = {
  derivSocket:
    "wss://api.derivws.com/trading/v1/options/ws/public",
  derivReconnectDelay: 4000,
  candleCount: 250
};

/* ==========================================
   GLOBAL MARKET STATE
========================================== */

const TF_MARKETS = {
  deriv: {
    socket: null,
    connected: false,
    connecting: false,
    reconnectTimer: null,

    symbols: [],
    activeSymbol: "",

    tickSubscription: null,
    latestPrice: null,
    lastTickTime: null,

    candles: [],
    pendingRequests: {},
    requestCounter: 100,

    lastHistoryRequest: 0
  },

  forex: {
    symbols: [],
    candles: [],
    price: null
  },

  binary: {
    candles: [],
    price: null
  }
};

/* ==========================================
   GENERAL HELPERS
========================================== */

function tfElement(id) {
  return document.getElementById(id);
}

function tfSetText(id, value) {
  const element = tfElement(id);
  if (element) element.textContent = value;
}

function tfSetStatus(id, value) {
  const element = tfElement(id);
  if (element) element.textContent = value;
}

function tfFormatPrice(value, digits) {
  const number = Number(value);

  if (!Number.isFinite(number)) return "--";

  return number.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: digits || 5
  });
}

function derivRequestId() {
  const state = TF_MARKETS.deriv;
  state.requestCounter += 1;
  return state.requestCounter;
}

/* ==========================================
   DERIV CONNECTION
========================================== */

function derivConnect() {
  const state = TF_MARKETS.deriv;

  if (state.connected || state.connecting) return;

  if (
    state.socket &&
    (
      state.socket.readyState === WebSocket.CONNECTING ||
      state.socket.readyState === WebSocket.OPEN
    )
  ) {
    return;
  }

  state.connecting = true;

  tfSetStatus("deriv-status", "CONNECTING");
  tfSetText("deriv-live-indicator", "CONNECTING");

  tfSetText(
    "deriv-feed-message",
    "Connecting directly to Deriv's public market feed..."
  );

  try {
    state.socket = new WebSocket(TF_CONFIG.derivSocket);

    state.socket.onopen = function() {
      state.connected = true;
      state.connecting = false;

      tfSetStatus("deriv-status", "CONNECTED");
      tfSetText("deriv-live-indicator", "LIVE");

      tfSetText(
        "deriv-feed-message",
        "Connected to Deriv. Loading available synthetic markets..."
      );

      derivRequestActiveSymbols();
    };

    state.socket.onmessage = function(event) {
      let data;

      try {
        data = JSON.parse(event.data);
      } catch (error) {
        console.error("Deriv message parsing error:", error);
        return;
      }

      derivHandleMessage(data);
    };

    state.socket.onerror = function(error) {
      console.warn("Deriv WebSocket error:", error);

      tfSetText(
        "deriv-feed-message",
        "Connection error. Waiting for connection recovery..."
      );
    };

    state.socket.onclose = function() {
      state.connected = false;
      state.connecting = false;
      state.tickSubscription = null;

      tfSetStatus("deriv-status", "DISCONNECTED");
      tfSetText("deriv-live-indicator", "DISCONNECTED");

      tfSetText(
        "deriv-feed-message",
        "Connection interrupted. Reconnecting automatically..."
      );

      state.pendingRequests = {};

      clearTimeout(state.reconnectTimer);

      state.reconnectTimer = setTimeout(
        derivConnect,
        TF_CONFIG.derivReconnectDelay
      );
    };

  } catch (error) {
    state.connected = false;
    state.connecting = false;

    console.error("Deriv connection failed:", error);

    tfSetStatus("deriv-status", "CONNECTION ERROR");
  }
}

/* ==========================================
   SEND API REQUEST
========================================== */

function derivSend(payload) {
  const state = TF_MARKETS.deriv;

  if (
    !state.connected ||
    !state.socket ||
    state.socket.readyState !== WebSocket.OPEN
  ) {
    return false;
  }

  try {
    state.socket.send(JSON.stringify(payload));
    return true;
  } catch (error) {
    console.error("Deriv request failed:", error);
    return false;
  }
}

/* ==========================================
   REQUEST AVAILABLE SYMBOLS
========================================== */

function derivRequestActiveSymbols() {
  const id = derivRequestId();

  TF_MARKETS.deriv.pendingRequests[id] = "active_symbols";

  const sent = derivSend({
    active_symbols: "brief",
    req_id: id
  });

  if (!sent) {
    delete TF_MARKETS.deriv.pendingRequests[id];
  }
}

/* ==========================================
   SYNTHETIC MARKET CLASSIFICATION
========================================== */

function derivClassifySymbol(item) {
  const name = (
    String(item.display_name || "") + " " +
    String(item.symbol || "") + " " +
    String(item.market || "") + " " +
    String(item.submarket || "")
  ).toLowerCase();

  if (name.includes("volatility")) return "volatility";

  if (name.includes("crash")) return "crash";

  if (name.includes("boom")) return "boom";

  if (name.includes("step")) return "step";

  if (name.includes("range break")) return "range";

  if (name.includes("drift switch")) return "drift";

  return "other";
}

/* ==========================================
   IDENTIFY SYNTHETIC INSTRUMENTS
========================================== */

function derivIsSynthetic(item) {
  const market = String(item.market || "").toLowerCase();
  const submarket = String(item.submarket || "").toLowerCase();

  return (
    market.includes("synthetic") ||
    submarket.includes("synthetic") ||
    derivClassifySymbol(item) !== "other"
  );
}

/* ==========================================
   PROCESS ACTIVE SYMBOL CATALOGUE
========================================== */

function derivLoadSymbols(symbols) {
  const state = TF_MARKETS.deriv;

  if (!Array.isArray(symbols)) {
    tfSetText(
      "deriv-message",
      "Deriv returned an unexpected market catalogue."
    );
    return;
  }

  const synthetic = symbols.filter(function(item) {
    return item && item.symbol && derivIsSynthetic(item);
  });

  state.symbols = synthetic;

  derivRenderSymbolSelector();

  tfSetText(
    "deriv-feed-message",
    synthetic.length +
    " synthetic instruments found in Deriv's active market catalogue."
  );

  if (!synthetic.length) {
    tfSetText(
      "deriv-message",
      "No synthetic instruments were found in the returned catalogue."
    );
    return;
  }

  const selector = tfElement("deriv-symbol");

  if (!selector) return;

  const selectedExists = synthetic.some(function(item) {
    return item.symbol === selector.value;
  });

  if (!selectedExists) {
    selector.value = synthetic[0].symbol;
  }

  derivSelectMarket();
}

/* ==========================================
   RENDER MARKET SELECTOR
========================================== */

function derivRenderSymbolSelector() {
  const selector = tfElement("deriv-symbol");
  const category = tfElement("deriv-category");

  if (!selector) return;

  const selectedCategory = category
    ? category.value
    : "all";

  const filtered = TF_MARKETS.deriv.symbols.filter(
    function(item) {
      if (selectedCategory === "all") return true;

      return derivClassifySymbol(item) === selectedCategory;
    }
  );

  const previousValue = selector.value;

  selector.innerHTML = "";

  if (!filtered.length) {
    const option = document.createElement("option");

    option.value = "";
    option.textContent = "No active instruments in this category";

    selector.appendChild(option);
    return;
  }

  filtered.forEach(function(item) {
    const option = document.createElement("option");

    option.value = item.symbol;

    option.textContent =
      item.display_name || item.symbol;

    selector.appendChild(option);
  });

  const previousStillAvailable = filtered.some(
    function(item) {
      return item.symbol === previousValue;
    }
  );

  if (previousStillAvailable) {
    selector.value = previousValue;
  } else {
    selector.value = filtered[0].symbol;
  }
}

/* ==========================================
   SELECT MARKET
========================================== */

function derivSelectMarket() {
  const selector = tfElement("deriv-symbol");

  if (!selector || !selector.value) return;

  const state = TF_MARKETS.deriv;
  const symbol = selector.value;

  if (!state.connected) {
    tfSetText(
      "deriv-message",
      "Waiting for Deriv public connection..."
    );
    return;
  }

  if (state.tickSubscription) {
    derivSend({
      forget: state.tickSubscription
    });

    state.tickSubscription = null;
  }

  state.activeSymbol = symbol;
  state.candles = [];
  state.latestPrice = null;
  state.lastTickTime = null;

  tfSetText("deriv-price", "--");
  tfSetText("deriv-direction", "WAIT");
  tfSetText("deriv-score", "--");

  tfSetText("deriv-volatility", "--");
  tfSetText("deriv-momentum", "--");
  tfSetText("deriv-structure", "--");

  tfSetText("deriv-signal", "WAIT");
  tfSetText("deriv-entry", "--");
  tfSetText("deriv-sl", "--");
  tfSetText("deriv-tp", "--");

  tfSetText(
    "deriv-message",
    "Loading historical candles and live prices..."
  );

  derivSubscribeTicks(symbol);
  derivRequestCandles(symbol);
}

/* ==========================================
   SUBSCRIBE TO LIVE TICKS
========================================== */

function derivSubscribeTicks(symbol) {
  const id = derivRequestId();

  TF_MARKETS.deriv.pendingRequests[id] = "ticks";

  const sent = derivSend({
    ticks: symbol,
    subscribe: 1,
    req_id: id
  });

  if (!sent) {
    delete TF_MARKETS.deriv.pendingRequests[id];
  }
}

/* ==========================================
   REQUEST HISTORICAL CANDLES
========================================== */

function derivRequestCandles(symbol) {
  const state = TF_MARKETS.deriv;

  if (!state.connected || !symbol) return;

  const timeframe = Number(
    (tfElement("deriv-timeframe") || {}).value || 900
  );

  const allowedTimeframes = [
    60, 120, 180, 300, 600, 900,
    1800, 3600, 7200, 14400, 28800, 86400
  ];

  if (allowedTimeframes.indexOf(timeframe) === -1) {
    tfSetText(
      "deriv-message",
      "Unsupported candle timeframe."
    );
    return;
  }

  const id = derivRequestId();

  state.pendingRequests[id] = "history";
  state.lastHistoryRequest = id;

  const sent = derivSend({
    ticks_history: symbol,
    style: "candles",
    granularity: timeframe,
    count: TF_CONFIG.candleCount,
    end: "latest",
    req_id: id
  });

  if (!sent) {
    delete state.pendingRequests[id];
  }
}

/* ==========================================
   HANDLE API MESSAGES
========================================== */

function derivHandleMessage(data) {
  const state = TF_MARKETS.deriv;

  if (data.error) {
    console.error("Deriv API error:", data.error);

    tfSetText(
      "deriv-message",
      "Deriv API: " +
      (data.error.message || "Unknown error")
    );

    if (data.req_id) {
      delete state.pendingRequests[data.req_id];
    }

    return;
  }

  const messageType = data.msg_type || "";

  if (
    messageType === "active_symbols" ||
    data.active_symbols
  ) {
    if (data.req_id) {
      delete state.pendingRequests[data.req_id];
    }

    derivLoadSymbols(data.active_symbols || []);
    return;
  }

  if (messageType === "tick" || data.tick) {
    derivHandleTick(data);
    return;
  }

  if (
    messageType === "history" ||
    data.history ||
    data.candles
  ) {
    derivHandleHistory(data);
    return;
  }

  if (
    data.subscription &&
    data.subscription.id &&
    (
      messageType === "tick" ||
      data.tick
    )
  ) {
    state.tickSubscription = data.subscription.id;
  }
}

/* ==========================================
   PROCESS LIVE PRICE
========================================== */

function derivHandleTick(data) {
  const state = TF_MARKETS.deriv;
  const tick = data.tick;

  if (!tick) return;

  if (tick.symbol !== state.activeSymbol) return;

  const price = Number(tick.quote);

  if (!Number.isFinite(price)) return;

  state.latestPrice = price;
  state.lastTickTime = Number(tick.epoch);

  if (data.subscription && data.subscription.id) {
    state.tickSubscription = data.subscription.id;
  }

  tfSetText(
    "deriv-price",
    tfFormatPrice(price, 5)
  );

  tfSetStatus("deriv-status", "CONNECTED");
  tfSetText("deriv-live-indicator", "LIVE");
}

/* ==========================================
   PROCESS HISTORICAL CANDLES
========================================== */

function derivHandleHistory(data) {
  const state = TF_MARKETS.deriv;

  const requestId = data.req_id;

  if (requestId) {
    const requestType = state.pendingRequests[requestId];

    if (requestType && requestType !== "history") {
      return;
    }

    delete state.pendingRequests[requestId];
  }

  const echoSymbol =
    data.echo_req && data.echo_req.ticks_history;

  if (
    echoSymbol &&
    echoSymbol !== state.activeSymbol
  ) {
    return;
  }

  let rawCandles = [];

  if (
    data.candles &&
    Array.isArray(data.candles)
  ) {
    rawCandles = data.candles;
  } else if (
    data.history &&
    Array.isArray(data.history.candles)
  ) {
    rawCandles = data.history.candles;
  }

  if (!rawCandles.length) {
    tfSetText(
      "deriv-message",
      "No historical candles returned for this instrument."
    );
    return;
  }

  const candles = rawCandles.map(function(candle) {
    return {
      time: Number(candle.epoch),
      open: Number(candle.open),
      high: Number(candle.high),
      low: Number(candle.low),
      close: Number(candle.close)
    };
  }).filter(function(candle) {
    return (
      Number.isFinite(candle.time) &&
      Number.isFinite(candle.open) &&
      Number.isFinite(candle.high) &&
      Number.isFinite(candle.low) &&
      Number.isFinite(candle.close)
    );
  });

  if (candles.length < 30) {
    tfSetText(
      "deriv-message",
      "Insufficient historical candles for reliable analysis."
    );
    return;
  }

  state.candles = candles;

  if (Number.isFinite(state.latestPrice)) {
    const last = state.candles[state.candles.length - 1];

    last.close = state.latestPrice;
    last.high = Math.max(last.high, state.latestPrice);
    last.low = Math.min(last.low, state.latestPrice);
  }

  tfSetText(
    "deriv-message",
    candles.length +
    " historical candles loaded. Receiving live market prices."
  );

  if (typeof derivUpdateMarketAnalysis === "function") {
    derivUpdateMarketAnalysis();
  }
}

/* ==========================================
   CATEGORY FILTER EVENTS
========================================== */

function derivSetupEvents() {
  const category = tfElement("deriv-category");
  const selector = tfElement("deriv-symbol");
  const timeframe = tfElement("deriv-timeframe");
  const generate = tfElement("deriv-generate");

  if (category) {
    category.addEventListener("change", function() {
      derivRenderSymbolSelector();
      derivSelectMarket();
    });
  }

  if (selector) {
    selector.addEventListener("change", function() {
      derivSelectMarket();
    });
  }

  if (timeframe) {
    timeframe.addEventListener("change", function() {
      if (TF_MARKETS.deriv.activeSymbol) {
        derivRequestCandles(
          TF_MARKETS.deriv.activeSymbol
        );
      }
    });
  }

  if (generate) {
    generate.addEventListener("click", function() {
      const state = TF_MARKETS.deriv;

      if (!state.connected) {
        tfSetText(
          "deriv-message",
          "Deriv is disconnected. Waiting for reconnection."
        );
        return;
      }

      if (!state.activeSymbol) {
        tfSetText(
          "deriv-message",
          "Select an available synthetic market first."
        );
        return;
      }

      derivRequestCandles(state.activeSymbol);

      tfSetText(
        "deriv-message",
        "Refreshing live synthetic market data..."
      );

      if (typeof derivGenerateSignal === "function") {
        derivGenerateSignal();
      }
    });
  }
}

/* ==========================================
   PERIODIC DATA REFRESH
========================================== */

function derivStartRefresh() {
  setInterval(function() {
    const state = TF_MARKETS.deriv;

    if (!state.connected || !state.activeSymbol) return;

    /*
      Refresh historical candles periodically.
      Live tick subscription continues independently.
    */

    derivRequestCandles(state.activeSymbol);

  }, 60000);
}

/* ==========================================
   INITIALIZE DERIV MODULE
========================================== */

function derivInitialize() {
  derivSetupEvents();
  derivConnect();
  derivStartRefresh();
}

/*
  Start after the document is ready.
*/

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    derivInitialize
  );
} else {
  derivInitialize();
}

<script>

/* ==========================================
   SYNTHETIC ANALYSIS CONFIGURATION
========================================== */

const DERIV_ANALYSIS_CONFIG = {
  minimumCandles: 60,
  minimumScore: 65,
  strongScore: 80,
  atrPeriod: 14,
  emaFast: 9,
  emaSlow: 21,
  swingLookback: 30,
  riskATR: 1.5,
  rewardATR: 2.5
};

/* ==========================================
   GENERAL NUMERICAL FUNCTIONS
========================================== */

function derivAverage(values) {
  if (!values.length) return 0;

  return values.reduce(function(a, b) {
    return a + b;
  }, 0) / values.length;
}

function derivStandardDeviation(values) {
  if (values.length < 2) return 0;

  const average = derivAverage(values);

  const variance = derivAverage(
    values.map(function(value) {
      return Math.pow(value - average, 2);
    })
  );

  return Math.sqrt(variance);
}

function derivEMA(values, period) {
  if (!values.length) return [];

  const multiplier = 2 / (period + 1);
  const result = [];

  let previous = values[0];

  result.push(previous);

  for (let i = 1; i < values.length; i++) {
    previous =
      (values[i] - previous) * multiplier + previous;

    result.push(previous);
  }

  return result;
}

function derivATR(candles, period) {
  if (candles.length < period + 1) return 0;

  const ranges = [];

  for (let i = 1; i < candles.length; i++) {
    const current = candles[i];
    const previous = candles[i - 1];

    const range = Math.max(
      current.high - current.low,
      Math.abs(current.high - previous.close),
      Math.abs(current.low - previous.close)
    );

    ranges.push(range);
  }

  const recent = ranges.slice(-period);

  return derivAverage(recent);
}

/* ==========================================
   CANDLE DATA EXTRACTION
========================================== */

function derivGetPrices(candles) {
  return candles.map(function(candle) {
    return candle.close;
  });
}

function derivGetReturns(candles) {
  const returns = [];

  for (let i = 1; i < candles.length; i++) {
    const previous = candles[i - 1].close;
    const current = candles[i].close;

    if (previous !== 0) {
      returns.push((current - previous) / previous);
    }
  }

  return returns;
}

/* ==========================================
   METHOD 1: INDICATOR ANALYSIS
   EMA + RSI + MACD-STYLE MOMENTUM
========================================== */

function derivIndicatorAnalysis(candles) {
  const closes = derivGetPrices(candles);

  const fast = derivEMA(closes, 9);
  const slow = derivEMA(closes, 21);

  const last = closes.length - 1;

  const fastValue = fast[last];
  const slowValue = slow[last];

  let bullish = 0;
  let bearish = 0;

  if (fastValue > slowValue) bullish++;
  if (fastValue < slowValue) bearish++;

  if (closes[last] > fastValue) bullish++;
  if (closes[last] < fastValue) bearish++;

  const gains = [];
  const losses = [];

  for (let i = closes.length - 14; i < closes.length; i++) {
    if (i <= 0) continue;

    const change = closes[i] - closes[i - 1];

    gains.push(Math.max(change, 0));
    losses.push(Math.max(-change, 0));
  }

  const averageGain = derivAverage(gains);
  const averageLoss = derivAverage(losses);

  let rsi = 50;

  if (averageLoss === 0 && averageGain > 0) {
    rsi = 100;
  } else if (averageLoss > 0) {
    const rs = averageGain / averageLoss;
    rsi = 100 - (100 / (1 + rs));
  }

  if (rsi > 52 && rsi < 75) bullish++;
  if (rsi < 48 && rsi > 25) bearish++;

  if (rsi >= 75) bearish++;
  if (rsi <= 25) bullish++;

  const direction =
    bullish > bearish ? 1 :
    bearish > bullish ? -1 : 0;

  return {
    name: "Indicator analysis",
    direction: direction,
    score: Math.abs(bullish - bearish),
    detail:
      "EMA trend alignment and RSI: " +
      rsi.toFixed(1)
  };
}

/* ==========================================
   METHOD 2: SUPPORT AND RESISTANCE
========================================== */

function derivSupportResistance(candles) {
  const recent = candles.slice(-30);

  const highs = recent.map(function(c) {
    return c.high;
  });

  const lows = recent.map(function(c) {
    return c.low;
  });

  const resistance = Math.max.apply(null, highs);
  const support = Math.min.apply(null, lows);

  const current = candles[candles.length - 1].close;

  const range = resistance - support;

  if (range <= 0) {
    return {
      name: "Support and resistance",
      direction: 0,
      score: 0,
      detail: "Insufficient price range."
    };
  }

  const position = (current - support) / range;

  let direction = 0;
  let detail = "Price is trading within its recent range.";

  if (position < 0.25) {
    direction = 1;
    detail = "Price is approaching the lower range.";
  } else if (position > 0.75) {
    direction = -1;
    detail = "Price is approaching the upper range.";
  }

  if (current > resistance) {
    direction = 1;
    detail = "Price has broken above recent resistance.";
  }

  if (current < support) {
    direction = -1;
    detail = "Price has broken below recent support.";
  }

  return {
    name: "Support / resistance",
    direction: direction,
    score: Math.abs(position - 0.5) * 2,
    detail:
      detail +
      " Support: " + support.toFixed(5) +
      " | Resistance: " + resistance.toFixed(5)
  };
}

/* ==========================================
   METHOD 3: STRUCTURE AND LIQUIDITY
   PRICE-BASED SMC APPROXIMATION
========================================== */

function derivStructureAnalysis(candles) {
  const recent = candles.slice(-25);

  if (recent.length < 10) {
    return {
      name: "Market structure / liquidity",
      direction: 0,
      score: 0,
      detail: "Insufficient candles."
    };
  }

  const current = recent[recent.length - 1];
  const previous = recent[recent.length - 2];

  const older = recent.slice(0, -2);

  const previousHigh = Math.max.apply(
    null,
    older.map(function(c) { return c.high; })
  );

  const previousLow = Math.min.apply(
    null,
    older.map(function(c) { return c.low; })
  );

  let direction = 0;
  let detail = "No clear structure break.";

  const bullishSweep =
    current.low < previousLow &&
    current.close > previousLow;

  const bearishSweep =
    current.high > previousHigh &&
    current.close < previousHigh;

  if (bullishSweep) {
    direction = 1;
    detail = "Potential downside liquidity sweep with bullish recovery.";
  }

  if (bearishSweep) {
    direction = -1;
    detail = "Potential upside liquidity sweep with bearish rejection.";
  }

  if (
    current.close > previousHigh &&
    current.close > current.open
  ) {
    direction = 1;
    detail = "Bullish structure break.";
  }

  if (
    current.close < previousLow &&
    current.close < current.open
  ) {
    direction = -1;
    detail = "Bearish structure break.";
  }

  if (
    current.close > previous.close &&
    previous.close > recent[recent.length - 3].close
  ) {
    if (direction === 0) {
      direction = 1;
      detail = "Short-term bullish structure.";
    }
  }

  if (
    current.close < previous.close &&
    previous.close < recent[recent.length - 3].close
  ) {
    if (direction === 0) {
      direction = -1;
      detail = "Short-term bearish structure.";
    }
  }

  return {
    name: "Structure / liquidity",
    direction: direction,
    score: direction === 0 ? 0 : 1,
    detail: detail
  };
}

/* ==========================================
   METHOD 4: CANDLESTICK PRICE ACTION
========================================== */

function derivPriceAction(candles) {
  const current = candles[candles.length - 1];
  const previous = candles[candles.length - 2];

  const body = Math.abs(current.close - current.open);

  const range = Math.max(
    current.high - current.low,
    0.0000000001
  );

  const upperWick =
    current.high - Math.max(current.open, current.close);

  const lowerWick =
    Math.min(current.open, current.close) - current.low;

  const bodyRatio = body / range;

  let direction = 0;
  let detail = "No decisive candle formation.";

  const bullishEngulfing =
    previous.close < previous.open &&
    current.close > current.open &&
    current.close >= previous.open &&
    current.open <= previous.close;

  const bearishEngulfing =
    previous.close > previous.open &&
    current.close < current.open &&
    current.close <= previous.open &&
    current.open >= previous.close;

  if (bullishEngulfing) {
    direction = 1;
    detail = "Bullish engulfing candle.";
  } else if (bearishEngulfing) {
    direction = -1;
    detail = "Bearish engulfing candle.";
  } else if (
    lowerWick > body * 2 &&
    lowerWick > upperWick
  ) {
    direction = 1;
    detail = "Long lower-wick rejection.";
  } else if (
    upperWick > body * 2 &&
    upperWick > lowerWick
  ) {
    direction = -1;
    detail = "Long upper-wick rejection.";
  } else if (
    bodyRatio > 0.7 &&
    current.close > current.open
  ) {
    direction = 1;
    detail = "Strong bullish candle.";
  } else if (
    bodyRatio > 0.7 &&
    current.close < current.open
  ) {
    direction = -1;
    detail = "Strong bearish candle.";
  }

  return {
    name: "Price action",
    direction: direction,
    score: direction === 0 ? 0 : 1,
    detail: detail
  };
}

/* ==========================================
   METHOD 5: MULTI-TIMEFRAME CONFIRMATION
   AGGREGATES EXISTING CANDLES
========================================== */

function derivAggregateCandles(candles, factor) {
  const result = [];

  for (let i = 0; i + factor <= candles.length; i += factor) {
    const group = candles.slice(i, i + factor);

    result.push({
      time: group[0].time,
      open: group[0].open,
      high: Math.max.apply(
        null,
        group.map(function(c) { return c.high; })
      ),
      low: Math.min.apply(
        null,
        group.map(function(c) { return c.low; })
      ),
      close: group[group.length - 1].close
    });
  }

  return result;
}

function derivTrendDirection(candles) {
  if (candles.length < 20) return 0;

  const closes = derivGetPrices(candles);

  const fast = derivEMA(closes, 9);
  const slow = derivEMA(closes, 21);

  const last = closes.length - 1;

  if (fast[last] > slow[last]) return 1;
  if (fast[last] < slow[last]) return -1;

  return 0;
}

function derivMultiTimeframe(candles) {
  const shortTrend = derivTrendDirection(candles);

  const mediumCandles =
    derivAggregateCandles(candles, 5);

  const longCandles =
    derivAggregateCandles(candles, 15);

  const mediumTrend =
    derivTrendDirection(mediumCandles);

  const longTrend =
    derivTrendDirection(longCandles);

  const bullish =
    [shortTrend, mediumTrend, longTrend]
    .filter(function(value) { return value === 1; }).length;

  const bearish =
    [shortTrend, mediumTrend, longTrend]
    .filter(function(value) { return value === -1; }).length;

  const direction =
    bullish > bearish ? 1 :
    bearish > bullish ? -1 : 0;

  return {
    name: "Multi-timeframe analysis",
    direction: direction,
    score: Math.max(bullish, bearish) / 3,
    detail:
      "Current / aggregated higher-timeframe alignment: " +
      bullish + " bullish, " + bearish + " bearish."
  };
}

/* ==========================================
   METHOD 6: QUANTITATIVE VOLATILITY
========================================== */

function derivQuantAnalysis(candles) {
  const recent = candles.slice(-50);

  const atr = derivATR(recent, 14);

  const closes = derivGetPrices(recent);
  const returns = derivGetReturns(recent);

  const deviation = derivStandardDeviation(returns);

  const current = recent[recent.length - 1];
  const previous = recent[recent.length - 2];

  const averageRange = derivAverage(
    recent.slice(0, -1).map(function(c) {
      return c.high - c.low;
    })
  );

  const currentRange = current.high - current.low;

  const volatilityRatio =
    averageRange > 0 ? currentRange / averageRange : 1;

  const momentum =
    previous.close !== 0
      ? (current.close - previous.close) / previous.close
      : 0;

  let direction = 0;
  let detail = "Quantitative momentum is neutral.";

  if (momentum > 0 && volatilityRatio > 0.8) {
    direction = 1;
    detail = "Positive momentum with active candle movement.";
  }

  if (momentum < 0 && volatilityRatio > 0.8) {
    direction = -1;
    detail = "Negative momentum with active candle movement.";
  }

  let regime = "NORMAL";

  if (volatilityRatio > 1.8) {
    regime = "HIGH";
  } else if (volatilityRatio < 0.55) {
    regime = "LOW";
  }

  return {
    name: "Quantitative volatility",
    direction: direction,
    score: Math.min(
      1,
      Math.abs(momentum) /
      Math.max(deviation, 0.0000000001)
    ),
    detail:
      detail +
      " Volatility regime: " + regime +
      ". ATR: " + atr.toFixed(5) +
      ".",
    atr: atr,
    volatility: regime,
    momentum: momentum
  };
}

/* ==========================================
   ANALYSIS ENGINE
========================================== */

function derivRunAnalysis(candles) {
  if (
    !Array.isArray(candles) ||
    candles.length < DERIV_ANALYSIS_CONFIG.minimumCandles
  ) {
    return null;
  }

  const methods = [
    derivIndicatorAnalysis(candles),
    derivSupportResistance(candles),
    derivStructureAnalysis(candles),
    derivPriceAction(candles),
    derivMultiTimeframe(candles),
    derivQuantAnalysis(candles)
  ];

  let bullish = 0;
  let bearish = 0;
  let totalWeight = 0;
  let alignedWeight = 0;

  methods.forEach(function(method) {
    const weight = 1;

    totalWeight += weight;

    if (method.direction === 1) {
      bullish += weight;
      if (method.score > 0.25) alignedWeight += weight;
    }

    if (method.direction === -1) {
      bearish += weight;
      if (method.score > 0.25) alignedWeight += weight;
    }
  });

  const direction =
    bullish > bearish ? 1 :
    bearish > bullish ? -1 : 0;

  const winningVotes = Math.max(bullish, bearish);

  const score = Math.round(
    (winningVotes / methods.length) * 100
  );

  const agreement = methods.filter(function(method) {
    return method.direction === direction &&
      direction !== 0;
  }).length;

  const quant = methods[5];

  let signal = "WAIT";

  if (
    direction === 1 &&
    score >= DERIV_ANALYSIS_CONFIG.minimumScore &&
    agreement >= 4
  ) {
    signal = "BUY";
  }

  if (
    direction === -1 &&
    score >= DERIV_ANALYSIS_CONFIG.minimumScore &&
    agreement >= 4
  ) {
    signal = "SELL";
  }

  return {
    direction: direction,
    signal: signal,
    score: score,
    agreement: agreement,
    methods: methods,
    atr: quant.atr,
    volatility: quant.volatility,
    momentum: quant.momentum,
    candles: candles.length
  };
}

/* ==========================================
   CALCULATE TRADE LEVELS
========================================== */

function derivCalculateLevels(result, price) {
  const atr = result.atr;

  if (!atr || !Number.isFinite(price)) {
    return {
      entry: price,
      stop: null,
      target: null
    };
  }

  if (result.signal === "BUY") {
    return {
      entry: price,
      stop:
        price - atr * DERIV_ANALYSIS_CONFIG.riskATR,
      target:
        price + atr * DERIV_ANALYSIS_CONFIG.rewardATR
    };
  }

  if (result.signal === "SELL") {
    return {
      entry: price,
      stop:
        price + atr * DERIV_ANALYSIS_CONFIG.riskATR,
      target:
        price - atr * DERIV_ANALYSIS_CONFIG.rewardATR
    };
  }

  return {
    entry: price,
    stop: null,
    target: null
  };
}

/* ==========================================
   DISPLAY ANALYSIS RESULTS
========================================== */

function derivDisplayAnalysis(result) {
  if (!result) return;

  const state = TF_MARKETS.deriv;

  const price = Number.isFinite(state.latestPrice)
    ? state.latestPrice
    : state.candles[state.candles.length - 1].close;

  const levels = derivCalculateLevels(result, price);

  tfSetText("deriv-direction",
    result.direction === 1 ? "BULLISH" :
    result.direction === -1 ? "BEARISH" : "NEUTRAL"
  );

  tfSetText("deriv-score", result.score + "%");
  tfSetText("deriv-signal", result.signal);

  tfSetText(
    "deriv-signal-badge",
    result.signal === "WAIT" ? "NO SETUP" : result.signal
  );

  tfSetText(
    "deriv-entry",
    tfFormatPrice(levels.entry, 5)
  );

  tfSetText(
    "deriv-sl",
    levels.stop === null
      ? "--"
      : tfFormatPrice(levels.stop, 5)
  );

  tfSetText(
    "deriv-tp",
    levels.target === null
      ? "--"
      : tfFormatPrice(levels.target, 5)
  );

  tfSetText("deriv-volatility", result.volatility);

  tfSetText(
    "deriv-momentum",
    (result.momentum * 100).toFixed(3) + "%"
  );

  const structure = result.methods[2];

  tfSetText(
    "deriv-structure",
    structure.direction === 1 ? "BULLISH" :
    structure.direction === -1 ? "BEARISH" : "NEUTRAL"
  );

  const methodsContainer = tfElement("deriv-methods");

  if (methodsContainer) {
    methodsContainer.innerHTML = "";

    result.methods.forEach(function(method) {
      const item = document.createElement("div");

      item.className = "method-row";

      const direction =
        method.direction === 1 ? "BULLISH" :
        method.direction === -1 ? "BEARISH" : "NEUTRAL";

      const heading = document.createElement("strong");
      heading.textContent = method.name;

      const status = document.createElement("span");
      status.textContent = direction;

      const detail = document.createElement("p");
      detail.textContent = method.detail;

      item.appendChild(heading);
      item.appendChild(status);
      item.appendChild(detail);

      methodsContainer.appendChild(item);
    });
  }

  tfSetText(
    "deriv-message",
    result.signal === "WAIT"
      ? "Analysis complete. No sufficiently aligned setup."
      : "Analysis complete. " + result.signal +
        " setup detected. Review risk before acting."
  );
}

/* ==========================================
   UPDATE MARKET ANALYSIS
========================================== */

function derivUpdateMarketAnalysis() {
  const candles = TF_MARKETS.deriv.candles;

  if (
    !candles ||
    candles.length < DERIV_ANALYSIS_CONFIG.minimumCandles
  ) {
    tfSetText(
      "deriv-message",
      "Waiting for at least 60 valid candles..."
    );
    return;
  }

  const result = derivRunAnalysis(candles);

  if (!result) return;

  derivDisplayAnalysis(result);

  return result;
}

/* ==========================================
   GENERATE SIGNAL BUTTON
========================================== */

function derivGenerateSignal() {
  const state = TF_MARKETS.deriv;

  if (!state.connected) {
    tfSetText(
      "deriv-message",
      "Live Deriv connection is unavailable."
    );
    return;
  }

  if (state.candles.length < DERIV_ANALYSIS_CONFIG.minimumCandles) {
    derivRequestCandles(state.activeSymbol);

    tfSetText(
      "deriv-message",
      "Waiting for enough historical candles..."
    );

    return;
  }

  const result = derivRunAnalysis(state.candles);

  if (!result) return;

  derivDisplayAnalysis(result);

  /* Save signal if the journal function exists. */

  if (typeof tfSaveSignal === "function") {
    tfSaveSignal({
      section: "Deriv",
      market: state.activeSymbol,
      timeframe:
        (tfElement("deriv-timeframe") || {}).value || "900",
      signal: result.signal,
      score: result.score
    });
  }

  console.log(
    "TradingFloor Deriv analysis:",
    result
  );
}
<script>

/* ==========================================
   TRADINGFLOOR AI - DATA SOURCES
========================================== */

const TF_DATA_SOURCES = {
  forexBase: "https://biquote.io/api",
  binanceBase: "https://api.binance.com/api/v3"
};

const TF_HISTORY_KEY = "tradingfloor_ai_journal_v2";

let TF_JOURNAL = [];

try {
  const saved = localStorage.getItem(TF_HISTORY_KEY);
  TF_JOURNAL = saved ? JSON.parse(saved) : [];

  if (!Array.isArray(TF_JOURNAL)) TF_JOURNAL = [];
} catch (error) {
  TF_JOURNAL = [];
}

/* ==========================================
   SHARED JOURNAL FUNCTIONS
========================================== */

function tfSaveJournal() {
  try {
    localStorage.setItem(
      TF_HISTORY_KEY,
      JSON.stringify(TF_JOURNAL)
    );
  } catch (error) {
    console.warn("Journal storage unavailable:", error);
  }

  tfRenderJournal();
}

function tfSaveSignal(signal) {
  const entry = {
    id: Date.now(),
    date: new Date().toISOString(),
    section: signal.section || "Unknown",
    market: signal.market || "--",
    timeframe: String(signal.timeframe || "--"),
    signal: signal.signal || "WAIT",
    score: Number(signal.score || 0)
  };

  TF_JOURNAL.unshift(entry);

  if (TF_JOURNAL.length > 500) {
    TF_JOURNAL = TF_JOURNAL.slice(0, 500);
  }

  tfSaveJournal();
}

function tfRenderJournal() {
  const body = tfElement("journal-body");
  if (!body) return;

  body.innerHTML = "";

  if (!TF_JOURNAL.length) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");

    cell.colSpan = 6;
    cell.className = "muted";
    cell.textContent = "No signals recorded yet.";

    row.appendChild(cell);
    body.appendChild(row);
    return;
  }

  TF_JOURNAL.forEach(function(item) {
    const row = document.createElement("tr");

    const date = new Date(item.date);

    const values = [
      date.toLocaleString(),
      item.section,
      item.market,
      item.timeframe,
      item.signal,
      item.score + "%"
    ];

    values.forEach(function(value) {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.appendChild(cell);
    });

    body.appendChild(row);
  });
}

/* ==========================================
   EXPORT JOURNAL CSV
========================================== */

function tfExportCSV() {
  if (!TF_JOURNAL.length) {
    alert("There are no journal entries to export.");
    return;
  }

  const headers = [
    "Date",
    "Section",
    "Market",
    "Timeframe",
    "Signal",
    "Confluence Score"
  ];

  const rows = TF_JOURNAL.map(function(item) {
    return [
      item.date,
      item.section,
      item.market,
      item.timeframe,
      item.signal,
      item.score
    ];
  });

  const csv = [headers].concat(rows).map(function(row) {
    return row.map(function(value) {
      return '"' + String(value).replace(/"/g, '""') + '"';
    }).join(",");
  }).join("\n");

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;"
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "TradingFloor_AI_Journal.csv";

  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
}

/* ==========================================
   JOURNAL EVENTS
========================================== */

function tfSetupJournal() {
  const exportButton = tfElement("export-csv");
  const clearButton = tfElement("clear-history");

  if (exportButton) {
    exportButton.addEventListener("click", tfExportCSV);
  }

  if (clearButton) {
    clearButton.addEventListener("click", function() {
      if (!confirm("Delete all saved signal history?")) return;

      TF_JOURNAL = [];
      tfSaveJournal();
    });
  }

  tfRenderJournal();
}

/* ==========================================
   FOREX SYMBOL CATALOGUE
========================================== */

async function forexLoadSymbols() {
  const selector = tfElement("forex-symbol");
  if (!selector) return;

  tfSetStatus("forex-status", "LOADING");

  try {
    const response = await fetch(
      TF_DATA_SOURCES.forexBase + "/active",
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error("Forex catalogue unavailable.");
    }

    const data = await response.json();

    let instruments = [];

    if (Array.isArray(data)) {
      instruments = data;
    } else if (Array.isArray(data.active)) {
      instruments = data.active;
    } else if (Array.isArray(data.symbols)) {
      instruments = data.symbols;
    } else if (Array.isArray(data.data)) {
      instruments = data.data;
    }

    TF_MARKETS.forex.symbols = instruments.filter(function(item) {
      const symbol = typeof item === "string"
        ? item
        : item.symbol || item.name;

      return symbol && /^[A-Z]{6}$/.test(symbol);
    }).map(function(item) {
      return typeof item === "string"
        ? { symbol: item, display_name: item }
        : {
            symbol: item.symbol || item.name,
            display_name: item.display_name ||
              item.name ||
              item.symbol
          };
    });

    selector.innerHTML = "";

    TF_MARKETS.forex.symbols.forEach(function(item) {
      const option = document.createElement("option");

      option.value = item.symbol;
      option.textContent = item.display_name;

      selector.appendChild(option);
    });

    if (!TF_MARKETS.forex.symbols.length) {
      throw new Error("No Forex symbols were returned.");
    }

    tfSetStatus("forex-status", "CATALOGUE READY");

    tfSetText(
      "forex-message",
      TF_MARKETS.forex.symbols.length +
      " Forex instruments loaded. Select a pair to analyse."
    );

  } catch (error) {
    console.warn("Forex catalogue error:", error);

    tfSetStatus("forex-status", "FEED UNAVAILABLE");

    selector.innerHTML =
      '<option value="">Forex catalogue unavailable</option>';

    tfSetText(
      "forex-message",
      "Could not retrieve the Forex symbol catalogue. Check the data provider and network."
    );
  }
}

/* ==========================================
   FOREX CANDLE INTERVAL MAPPING
========================================== */

function forexInterval(seconds) {
  const map = {
    60: "1m",
    300: "5m",
    900: "15m",
    1800: "30m",
    3600: "1h",
    14400: "4h",
    86400: "1d"
  };

  return map[Number(seconds)] || "1h";
}

/* ==========================================
   LOAD FOREX CANDLES
========================================== */

async function forexLoadCandles() {
  const symbol = (tfElement("forex-symbol") || {}).value;
  const timeframe = Number(
    (tfElement("forex-timeframe") || {}).value || 3600
  );

  if (!symbol) {
    tfSetText("forex-message", "Select a Forex pair first.");
    return null;
  }

  tfSetStatus("forex-status", "FETCHING DATA");

  try {
    const interval = forexInterval(timeframe);

    const url =
      TF_DATA_SOURCES.forexBase +
      "/" + encodeURIComponent(symbol) +
      "/ohlc?interval=" + encodeURIComponent(interval) +
      "&limit=250";

    const response = await fetch(url, {
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error("Forex candle request failed.");
    }

    const data = await response.json();

    let raw = [];

    if (Array.isArray(data)) {
      raw = data;
    } else if (Array.isArray(data.candles)) {
      raw = data.candles;
    } else if (Array.isArray(data.data)) {
      raw = data.data;
    } else if (Array.isArray(data.ohlc)) {
      raw = data.ohlc;
    }

    const candles = raw.map(function(c) {
      return {
        time: Number(c.time || c.timestamp || c.epoch),
        open: Number(c.open),
        high: Number(c.high),
        low: Number(c.low),
        close: Number(c.close)
      };
    }).filter(function(c) {
      return Number.isFinite(c.open) &&
        Number.isFinite(c.high) &&
        Number.isFinite(c.low) &&
        Number.isFinite(c.close);
    });

    if (candles.length < 60) {
      throw new Error("Insufficient Forex candle history.");
    }

    TF_MARKETS.forex.candles = candles;

    TF_MARKETS.forex.price =
      candles[candles.length - 1].close;

    tfSetText(
      "forex-price",
      tfFormatPrice(TF_MARKETS.forex.price, 5)
    );

    tfSetStatus("forex-status", "DATA RECEIVED");

    tfSetText(
      "forex-message",
      candles.length + " candles received for " + symbol + "."
    );

    return candles;

  } catch (error) {
    console.warn("Forex data error:", error);

    tfSetStatus("forex-status", "FEED ERROR");

    tfSetText(
      "forex-message",
      "Forex data unavailable: " + error.message
    );

    return null;
  }
}

/* ==========================================
   FOREX ANALYSIS
========================================== */

function forexGenerateSignal() {
  const candles = TF_MARKETS.forex.candles;

  if (candles.length < 60) {
    tfSetText(
      "forex-message",
      "Insufficient Forex data. Refresh the market first."
    );
    return;
  }

  const result = derivRunAnalysis(candles);

  if (!result) return;

  const price = TF_MARKETS.forex.price ||
    candles[candles.length - 1].close;

  const levels = derivCalculateLevels(result, price);

  tfSetText("forex-signal", result.signal);
  tfSetText("forex-score", result.score + "%");

  tfSetText(
    "forex-direction",
    result.direction === 1 ? "BULLISH" :
    result.direction === -1 ? "BEARISH" : "NEUTRAL"
  );

  tfSetText(
    "forex-entry",
    tfFormatPrice(levels.entry, 5)
  );

  tfSetText(
    "forex-sl",
    levels.stop === null ? "--" :
      tfFormatPrice(levels.stop, 5)
  );

  tfSetText(
    "forex-tp",
    levels.target === null ? "--" :
      tfFormatPrice(levels.target, 5)
  );

  tfSetText(
    "forex-signal-badge",
    result.signal === "WAIT" ? "NO SETUP" : result.signal
  );

  const container = tfElement("forex-methods");

  if (container) {
    container.innerHTML = "";

    result.methods.forEach(function(method) {
      const row = document.createElement("div");
      row.className = "method-row";

      const heading = document.createElement("strong");
      heading.textContent = method.name;

      const status = document.createElement("span");
      status.textContent =
        method.direction === 1 ? "BULLISH" :
        method.direction === -1 ? "BEARISH" : "NEUTRAL";

      const detail = document.createElement("p");
      detail.textContent = method.detail;

      row.appendChild(heading);
      row.appendChild(status);
      row.appendChild(detail);

      container.appendChild(row);
    });
  }

  tfSaveSignal({
    section: "Forex",
    market: (tfElement("forex-symbol") || {}).value,
    timeframe: (tfElement("forex-timeframe") || {}).value,
    signal: result.signal,
    score: result.score
  });

  tfSetText(
    "forex-message",
    "Forex analysis completed. Confluence is an alignment score, not a win probability."
  );
}

/* ==========================================
   FOREX EVENTS
========================================== */

function forexSetupEvents() {
  const button = tfElement("forex-generate");

  if (button) {
    button.addEventListener("click", async function() {
      button.disabled = true;
      button.textContent = "ANALYSING...";

      try {
        const candles = await forexLoadCandles();

        if (candles) forexGenerateSignal();

      } finally {
        button.disabled = false;
        button.textContent = "✦ Generate Forex Signal";
      }
    });
  }
}

/* ==========================================
   BINARY DATA - BINANCE
========================================== */

const BINARY_INTERVALS = {
  "1m": "1m",
  "5m": "5m",
  "15m": "15m",
  "30m": "30m",
  "1h": "1h"
};

async function binaryLoadCandles() {
  const symbol = (tfElement("binary-symbol") || {}).value;
  const interval = (tfElement("binary-timeframe") || {}).value;

  if (!symbol || !BINARY_INTERVALS[interval]) return null;

  tfSetStatus("binary-status", "FETCHING");

  try {
    const url =
      TF_DATA_SOURCES.binanceBase +
      "/klines?symbol=" + encodeURIComponent(symbol) +
      "&interval=" + encodeURIComponent(interval) +
      "&limit=250";

    const response = await fetch(url, {
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error("Binary market data unavailable.");
    }

    const raw = await response.json();

    const candles = raw.map(function(item) {
      return {
        time: Number(item[0]),
        open: Number(item[1]),
        high: Number(item[2]),
        low: Number(item[3]),
        close: Number(item[4]),
        closeTime: Number(item[6]),
        volume: Number(item[5])
      };
    });

    /*
      Exclude the currently forming candle.
      Analyse only fully closed candles.
    */

    const now = Date.now();

    const closed = candles.filter(function(candle) {
      return candle.closeTime < now;
    });

    if (closed.length < 60) {
      throw new Error("Insufficient closed candles.");
    }

    TF_MARKETS.binary.candles = closed;

    TF_MARKETS.binary.price =
      candles[candles.length - 1].close;

    tfSetText(
      "binary-price",
      tfFormatPrice(TF_MARKETS.binary.price, 5)
    );

    tfSetStatus("binary-status", "CONNECTED");

    return closed;

  } catch (error) {
    console.warn("Binary data error:", error);

    tfSetStatus("binary-status", "FEED ERROR");

    tfSetText(
      "binary-message",
      error.message
    );

    return null;
  }
}

/* ==========================================
   BINARY SIGNAL ANALYSIS
========================================== */

function binaryGenerateSignal() {
  const candles = TF_MARKETS.binary.candles;

  if (candles.length < 60) {
    tfSetText(
      "binary-message",
      "Waiting for sufficient closed candles."
    );
    return;
  }

  const result = derivRunAnalysis(candles);

  if (!result) return;

  let signal = "WAIT";

  if (result.signal === "BUY") signal = "CALL";
  if (result.signal === "SELL") signal = "PUT";

  tfSetText("binary-result", signal);
  tfSetText("binary-direction", signal);
  tfSetText("binary-score", result.score + "%");

  tfSetText(
    "binary-explanation",
    signal === "WAIT"
      ? "The analysis methods do not show sufficient agreement."
      : signal + " setup detected from closed candle analysis."
  );

  const container = tfElement("binary-methods");

  if (container) {
    container.innerHTML = "";

    result.methods.forEach(function(method) {
      const row = document.createElement("div");
      row.className = "method-row";

      const heading = document.createElement("strong");
      heading.textContent = method.name;

      const status = document.createElement("span");
      status.textContent =
        method.direction === 1 ? "BULLISH" :
        method.direction === -1 ? "BEARISH" : "NEUTRAL";

      const detail = document.createElement("p");
      detail.textContent = method.detail;

      row.appendChild(heading);
      row.appendChild(status);
      row.appendChild(detail);

      container.appendChild(row);
    });
  }

  tfSaveSignal({
    section: "Binary",
    market: (tfElement("binary-symbol") || {}).value,
    timeframe: (tfElement("binary-timeframe") || {}).value,
    signal: signal,
    score: result.score
  });
}

/* ==========================================
   BINARY CANDLE COUNTDOWN
========================================== */

function binaryIntervalMilliseconds() {
  const interval = (tfElement("binary-timeframe") || {}).value;

  const seconds = {
    "1m": 60,
    "5m": 300,
    "15m": 900,
    "30m": 1800,
    "1h": 3600
  }[interval] || 60;

  return seconds * 1000;
}

function binaryUpdateCountdown() {
  const duration = binaryIntervalMilliseconds();

  const now = Date.now();

  const nextClose =
    Math.floor(now / duration) * duration + duration;

  const remaining = Math.max(0, nextClose - now);

  const totalSeconds = Math.ceil(remaining / 1000);

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  tfSetText(
    "binary-countdown",
    String(minutes).padStart(2, "0") +
    ":" +
    String(seconds).padStart(2, "0")
  );
}

/* ==========================================
   BINARY AUTO REFRESH
========================================== */

let binaryRefreshLock = false;
let binaryLastCandleBoundary = 0;

async function binaryRefreshAfterClose() {
  if (binaryRefreshLock) return;

  binaryRefreshLock = true;

  const button = tfElement("binary-generate");

  if (button) {
    button.disabled = true;
    button.textContent = "GENERATING NEXT SIGNAL...";
  }

  tfSetText(
    "binary-message",
    "Candle closed. Generating next signal..."
  );

  try {
    const candles = await binaryLoadCandles();

    if (candles) {
      binaryGenerateSignal();

      tfSetText(
        "binary-message",
        "New closed candle received. Signal analysis updated."
      );
    }

  } finally {
    binaryRefreshLock = false;

    if (button) {
      button.disabled = false;
      button.textContent = "✦ Generate Binary Signal";
    }
  }
}

function binaryStartAutoRefresh() {
  setInterval(function() {
    binaryUpdateCountdown();

    const duration = binaryIntervalMilliseconds();

    const boundary =
      Math.floor(Date.now() / duration);

    if (
      boundary !== binaryLastCandleBoundary &&
      binaryLastCandleBoundary !== 0
    ) {
      binaryLastCandleBoundary = boundary;
      binaryRefreshAfterClose();
    } else if (binaryLastCandleBoundary === 0) {
      binaryLastCandleBoundary = boundary;
    }

  }, 250);
}

/* ==========================================
   BINARY EVENTS
========================================== */

function binarySetupEvents() {
  const button = tfElement("binary-generate");
  const timeframe = tfElement("binary-timeframe");
  const symbol = tfElement("binary-symbol");

  if (button) {
    button.addEventListener("click", async function() {
      button.disabled = true;
      button.textContent = "ANALYSING...";

      try {
        const candles = await binaryLoadCandles();

        if (candles) binaryGenerateSignal();

      } finally {
        button.disabled = false;
        button.textContent = "✦ Generate Binary Signal";
      }
    });
  }

  if (timeframe) {
    timeframe.addEventListener("change", function() {
      binaryLastCandleBoundary = 0;
      binaryRefreshAfterClose();
    });
  }

  if (symbol) {
    symbol.addEventListener("change", function() {
      binaryLastCandleBoundary = 0;
      binaryRefreshAfterClose();
    });
  }
}

/* ==========================================
   INITIALIZE FOREX AND BINARY
========================================== */

function tfInitializeMarketModules() {
  tfSetupJournal();

  forexSetupEvents();
  binarySetupEvents();

  forexLoadSymbols();

  binaryRefreshAfterClose();

  binaryStartAutoRefresh();
}

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    tfInitializeMarketModules
  );
} else {
  tfInitializeMarketModules();
}

/* ======================================= */

</script>

<style>
/* ==========================================
   FINAL CHART AND NAVIGATION STYLES
========================================== */

.chart-panel {
  margin-top: 20px;
}

.tf-chart {
  width: 100%;
  height: 220px;
  display: block;
  overflow: visible;
}

.tf-chart-grid {
  stroke: rgba(148,163,184,.13);
  stroke-width: 1;
}

.tf-chart-line {
  fill: none;
  stroke: #38bdf8;
  stroke-width: 2.5;
  stroke-linejoin: round;
  stroke-linecap: round;
}

.tf-chart-area {
  fill: url(#tfChartGradient);
  opacity: .18;
}

.tf-chart-label {
  fill: #94a3b8;
  font-size: 10px;
}

.tf-chart-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 160px;
  color: #94a3b8;
  font-size: 13px;
}

.method-row {
  padding: 13px;
  margin: 8px 0;
  border: 1px solid rgba(148,163,184,.12);
  border-radius: 10px;
  background: rgba(15,23,42,.35);
}

.method-row strong {
  display: inline-block;
  font-size: 13px;
}

.method-row span {
  float: right;
  font-size: 11px;
  font-weight: 700;
  color: #38bdf8;
}

.method-row p {
  margin: 7px 0 0;
  font-size: 12px;
  color: #94a3b8;
  line-height: 1.5;
}

.live-indicator {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 11px;
  font-weight: 800;
  color: #22c55e;
}

.live-indicator::before {
  content: "";
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: currentColor;
  box-shadow: 0 0 9px currentColor;
}

.status-pill {
  display: inline-block;
  padding: 7px 11px;
  border-radius: 30px;
  background: rgba(56,189,248,.10);
  color: #38bdf8;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: .5px;
}

.binary-countdown {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 18px;
  padding: 13px;
  background: rgba(56,189,248,.07);
  border-radius: 10px;
}

.binary-countdown strong {
  color: #38bdf8;
  font-size: 20px;
  font-variant-numeric: tabular-nums;
}

.journal-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.secondary-btn {
  cursor: pointer;
}

.primary-btn:disabled {
  opacity: .55;
  cursor: wait;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
}

.data-table th,
.data-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid rgba(148,163,184,.12);
  font-size: 12px;
}

.table-wrap {
  overflow-x: auto;
}

.tf-footer {
  padding: 24px 15px;
  text-align: center;
  color: #94a3b8;
  font-size: 12px;
  border-top: 1px solid rgba(148,163,184,.12);
  margin-top: 30px;
}

@media(max-width:760px) {
  .tf-chart {
    height: 180px;
  }

  .journal-actions {
    width: 100%;
  }
}
</style>

<script>

/* ==========================================
   TRADINGFLOOR AI NAVIGATION
========================================== */

function tfSetupNavigation() {
  const navigation = document.querySelectorAll(
    "[data-page]"
  );

  navigation.forEach(function(link) {
    link.addEventListener("click", function(event) {
      event.preventDefault();

      const page = link.getAttribute("data-page");

      if (!page) return;

      document.querySelectorAll(
        ".page-section"
      ).forEach(function(section) {
        section.classList.remove("active");
      });

      const target = tfElement("page-" + page);

      if (target) {
        target.classList.add("active");
      }

      navigation.forEach(function(item) {
        item.classList.remove("active");
      });

      link.classList.add("active");

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

      if (page === "deriv") {
        const state = TF_MARKETS.deriv;

        if (!state.connected) {
          derivConnect();
        } else if (state.activeSymbol) {
          derivRequestCandles(state.activeSymbol);
        }
      }

      if (page === "forex") {
        if (!TF_MARKETS.forex.symbols.length) {
          forexLoadSymbols();
        }
      }

      if (page === "binary") {
        binaryUpdateCountdown();
      }
    });
  });
}

/* ==========================================
   CREATE CHART CONTAINERS
========================================== */

function tfCreateChartContainers() {
  const charts = [
    {
      id: "forex",
      heading: "Forex Price Chart"
    },
    {
      id: "binary",
      heading: "Binary Market Chart"
    },
    {
      id: "deriv",
      heading: "Live Synthetic Price Chart"
    }
  ];

  charts.forEach(function(item) {
    const page = tfElement("page-" + item.id);

    if (!page) return;

    const existing = tfElement(
      item.id + "-chart-container"
    );

    if (existing) return;

    const panel = document.createElement("div");

    panel.className = "panel chart-panel";
    panel.id = item.id + "-chart-container";

    const heading = document.createElement("h3");
    heading.textContent = item.heading;

    const description = document.createElement("p");
    description.className = "muted";
    description.textContent =
      "Recent price movement from available market candles.";

    const chart = document.createElement("div");
    chart.id = item.id + "-chart";
    chart.className = "tf-chart-empty";
    chart.textContent = "Waiting for market data...";

    panel.appendChild(heading);
    panel.appendChild(description);
    panel.appendChild(chart);

    const metrics = page.querySelector(".metrics-grid");

    if (metrics) {
      metrics.parentNode.insertBefore(
        panel,
        metrics.nextSibling
      );
    } else {
      page.appendChild(panel);
    }
  });
}

/* ==========================================
   SVG CHART RENDERING
========================================== */

function tfDrawChart(containerId, candles) {
  const container = tfElement(containerId);

  if (!container) return;

  if (!Array.isArray(candles) || candles.length < 2) {
    container.textContent = "Waiting for sufficient candles...";
    container.className = "tf-chart-empty";
    return;
  }

  const data = candles.slice(-60);

  const width = 900;
  const height = 220;
  const left = 35;
  const right = 15;
  const top = 15;
  const bottom = 25;

  const highs = data.map(function(c) {
    return c.high;
  });

  const lows = data.map(function(c) {
    return c.low;
  });

  const maximum = Math.max.apply(null, highs);
  const minimum = Math.min.apply(null, lows);

  const range = Math.max(
    maximum - minimum,
    0.000000001
  );

  const plotWidth = width - left - right;
  const plotHeight = height - top - bottom;

  const points = data.map(function(candle, index) {
    const x =
      left + (index / (data.length - 1)) * plotWidth;

    const y =
      top +
      ((maximum - candle.close) / range) * plotHeight;

    return {
      x: x,
      y: y
    };
  });

  const linePath = points.map(function(point, index) {
    return (index === 0 ? "M" : "L") +
      point.x.toFixed(2) + " " +
      point.y.toFixed(2);
  }).join(" ");

  const last = points[points.length - 1];

  const first = points[0];

  const areaPath =
    linePath +
    " L " + last.x + " " + (height - bottom) +
    " L " + first.x + " " + (height - bottom) +
    " Z";

  const rising =
    data[data.length - 1].close >= data[0].close;

  const chartColor = rising ? "#22c55e" : "#ef4444";

  const svgNS = "http://www.w3.org/2000/svg";

  const svg = document.createElementNS(svgNS, "svg");

  svg.setAttribute("viewBox", "0 0 " + width + " " + height);
  svg.setAttribute("class", "tf-chart");
  svg.setAttribute("role", "img");
  svg.setAttribute("aria-label", "Market price chart");

  for (let i = 0; i < 5; i++) {
    const y = top + (i / 4) * plotHeight;

    const grid = document.createElementNS(svgNS, "line");

    grid.setAttribute("x1", left);
    grid.setAttribute("x2", width - right);
    grid.setAttribute("y1", y);
    grid.setAttribute("y2", y);
    grid.setAttribute("class", "tf-chart-grid");

    svg.appendChild(grid);
  }

  const area = document.createElementNS(svgNS, "path");

  area.setAttribute("d", areaPath);
  area.setAttribute("fill", chartColor);
  area.setAttribute("opacity", ".12");

  svg.appendChild(area);

  const line = document.createElementNS(svgNS, "path");

  line.setAttribute("d", linePath);
  line.setAttribute("fill", "none");
  line.setAttribute("stroke", chartColor);
  line.setAttribute("stroke-width", "3");
  line.setAttribute("stroke-linejoin", "round");
  line.setAttribute("stroke-linecap", "round");

  svg.appendChild(line);

  const marker = document.createElementNS(svgNS, "circle");

  marker.setAttribute("cx", last.x);
  marker.setAttribute("cy", last.y);
  marker.setAttribute("r", "5");
  marker.setAttribute("fill", chartColor);

  svg.appendChild(marker);

  const label = document.createElementNS(svgNS, "text");

  label.setAttribute("x", left);
  label.setAttribute("y", 12);
  label.setAttribute("fill", "#94a3b8");
  label.setAttribute("font-size", "11");

  label.textContent =
    "HIGH " + tfFormatPrice(maximum, 5) +
    "     LOW " + tfFormatPrice(minimum, 5);

  svg.appendChild(label);

  container.className = "";
  container.innerHTML = "";
  container.appendChild(svg);
}

/* ==========================================
   CHART UPDATE FUNCTIONS
========================================== */

function tfUpdateAllCharts() {
  tfDrawChart(
    "forex-chart",
    TF_MARKETS.forex.candles
  );

  tfDrawChart(
    "binary-chart",
    TF_MARKETS.binary.candles
  );

  tfDrawChart(
    "deriv-chart",
    TF_MARKETS.deriv.candles
  );
}

/* ==========================================
   DERIV LIVE CHART UPDATE
========================================== */

function tfUpdateDerivChart() {
  tfDrawChart(
    "deriv-chart",
    TF_MARKETS.deriv.candles
  );
}

/* ==========================================
   ADD DERIV CHART TO ANALYSIS
========================================== */

const tfOriginalDerivDisplay = derivDisplayAnalysis;

derivDisplayAnalysis = function(result) {
  tfOriginalDerivDisplay(result);
  tfUpdateDerivChart();
};

/* ==========================================
   ADD FOREX CHART TO ANALYSIS
========================================== */

const tfOriginalForexGenerate = forexGenerateSignal;

forexGenerateSignal = function() {
  tfOriginalForexGenerate();
  tfDrawChart(
    "forex-chart",
    TF_MARKETS.forex.candles
  );
};

/* ==========================================
   ADD BINARY CHART TO ANALYSIS
========================================== */

const tfOriginalBinaryGenerate = binaryGenerateSignal;

binaryGenerateSignal = function() {
  tfOriginalBinaryGenerate();

  tfDrawChart(
    "binary-chart",
    TF_MARKETS.binary.candles
  );
};

/* ==========================================
   DERIV LIVE PRICE CHART REFRESH
========================================== */

const tfOriginalDerivTick = derivHandleTick;

derivHandleTick = function(data) {
  tfOriginalDerivTick(data);

  tfUpdateDerivChart();
};

/* ==========================================
   INITIALIZATION
========================================== */

function tfFinalInitialize() {
  tfSetupNavigation();

  tfCreateChartContainers();

  tfRenderJournal();

  tfUpdateAllCharts();

  binaryUpdateCountdown();

  console.log(
    "TradingFloor AI initialized."
  );
}

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    tfFinalInitialize
  );
} else {
  tfFinalInitialize();
}

/* ==========================================
   EXACT COPYRIGHT FOOTER
========================================== */

</script>

<footer class="tf-footer">
  Copyright by Darius Kipchoge, CEO &amp; Founder Trading Floor LLC
</footer>

</main>
</div>

</body>
</html>
