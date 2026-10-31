<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="theme-color" content="#08111f">
<title>TradingFloor AI — Market Intelligence</title>
<style>
:root{--bg:#07111d;--panel:#0e1b2b;--panel2:#122337;--line:#23384d;--text:#eef5ff;--muted:#91a4b9;--gold:#f5bd4f;--green:#31d6a0;--red:#ff687d;--blue:#69a9ff;--radius:18px}
*{box-sizing:border-box}
body{margin:0;background:radial-gradient(ellipse at 15% 0%,#132943 0,transparent 42%),var(--bg);color:var(--text);font:15px/1.5 Inter,system-ui,-apple-system,Segoe UI,Arial,sans-serif}
button,select{font:inherit}
button{cursor:pointer;transition:transform .18s,filter .18s}
button:hover{filter:brightness(1.08);transform:translateY(-1px)}
button:disabled{opacity:.55;cursor:wait;transform:none}
.wrap{max-width:1250px;margin:auto;padding:24px}
.top{display:flex;justify-content:space-between;align-items:center;gap:16px;margin-bottom:24px}
.brand{font-weight:900;letter-spacing:1.5px;font-size:20px}
.brand span{color:var(--gold)}
.eyebrow{font-size:10px;letter-spacing:2.5px;text-transform:uppercase;color:var(--gold);font-weight:800}
.subtitle{color:var(--muted);font-size:12px;margin-top:4px}
.status,.bi-status{display:inline-flex;align-items:center;gap:8px;border:1px solid var(--line);background:#102235;border-radius:999px;padding:9px 13px;font-size:11px;color:#d8e4f2}
.dot,.bi-dot{height:8px;width:8px;background:var(--gold);border-radius:50%;box-shadow:0 0 12px currentColor}
.dot.live,.bi-dot.live{background:var(--green)}
.hero{display:flex;align-items:flex-end;justify-content:space-between;gap:18px;margin:12px 0 18px}
.hero h1{font-size:clamp(27px,4vw,42px);line-height:1.08;margin:7px 0}
.hero p{margin:8px 0 0;color:var(--muted);max-width:600px;font-size:13px}
.controls,.bi-controls{display:flex;gap:9px;flex-wrap:wrap;align-items:center}
.select,.btn,.bi-select,.bi-btn{border:1px solid var(--line);border-radius:11px;padding:11px 13px;color:var(--text);background:#122338;font-size:12px}
.select{min-width:130px}
.btn-primary{background:linear-gradient(135deg,#ffd878,var(--gold));border-color:var(--gold);color:#17202a;font-weight:900}
.btn-secondary{background:#13283d}
.grid,.bi-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:13px}
.card,.bi-card{background:linear-gradient(145deg,rgba(19,39,59,.97),rgba(12,25,39,.98));border:1px solid var(--line);border-radius:var(--radius);padding:18px;min-width:0;box-shadow:0 10px 28px #00000016}
.metric-label{font-size:11px;color:var(--muted);display:flex;justify-content:space-between;gap:8px}
.metric-value{font-size:clamp(22px,2.5vw,30px);font-weight:850;letter-spacing:-.7px;margin:9px 0 4px;overflow-wrap:anywhere}
.small{font-size:11px;color:var(--muted)}
.positive{color:var(--green)!important}
.negative{color:var(--red)!important}
.gold{color:var(--gold)}
.cols{display:grid;grid-template-columns:1.15fr .85fr;gap:13px;margin-top:13px}
.card-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:15px}
.card-head h2{font-size:15px;margin:0}
.tag{font-size:10px;padding:6px 9px;border:1px solid var(--line);border-radius:8px;color:#c4d4e5;background:#102236;white-space:nowrap}
.chart{height:230px;width:100%;display:block}
.chart svg{width:100%;height:100%;display:block}
.signal-box{border:1px solid #28465a;background:linear-gradient(135deg,#102b31,#112333);border-radius:15px;padding:17px}
.signal-top{display:flex;align-items:center;justify-content:space-between;gap:10px}
.signal-direction{font-size:21px;font-weight:950;letter-spacing:.4px}
.pill{border-radius:999px;padding:6px 10px;font-size:10px;font-weight:850;border:1px solid var(--line);background:#172b3d;color:#c9d9e9}
.pill.buy{color:var(--green);border-color:#256e5a;background:#12372f}
.pill.sell{color:var(--red);border-color:#81404a;background:#3a202b}
.pill.wait{color:var(--gold);border-color:#80672e;background:#332a19}
.signal-box h3{font-size:16px;margin:12px 0 5px}
.signal-box p{font-size:12px;color:#b6c8d8;margin:0}
.levels{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:15px}
.level{background:#0b1b29;border:1px solid #263c4e;border-radius:11px;padding:10px;min-width:0}
.level span{display:block;font-size:10px;color:var(--muted);margin-bottom:4px}
.level strong{font-size:13px;overflow-wrap:anywhere}
.level.entry{border-color:#80672e}.level.sl{border-color:#753a48}.level.tp{border-color:#256e5a}
.bar{height:6px;background:#23384a;border-radius:999px;overflow:hidden;margin:9px 0}
.bar i{display:block;height:100%;width:0;background:linear-gradient(90deg,var(--blue),var(--green));border-radius:999px;transition:width .4s}
.confluences{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin-top:13px}
.confluence{display:flex;gap:8px;align-items:flex-start;border:1px solid var(--line);background:#0c1c2b;border-radius:10px;padding:9px;font-size:11px;color:#c3d1df}
.check{font-weight:900;color:var(--green)}.cross{font-weight:900;color:var(--muted)}
.bottom-grid,.bi-bottom{display:grid;grid-template-columns:1fr 1fr;gap:13px;margin-top:13px}
.rows .item{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid #22374a}
.rows .item:last-child{border:0}
.rows b{font-size:12px}.rows small{display:block;color:var(--muted);font-size:11px;margin-top:2px}
.table-wrap{overflow:auto}
table{width:100%;border-collapse:collapse;font-size:11px;white-space:nowrap}
th,td{text-align:left;border-bottom:1px solid #23384a;padding:11px 7px}
th{font-weight:700;color:var(--muted)}
.notice{padding:12px 14px;border-left:3px solid var(--gold);background:#1c2530;color:#b9c7d4;border-radius:0 10px 10px 0;font-size:11px;margin-top:14px}
.foot{text-align:center;color:#71869a;font-size:10px;margin:24px 0 6px}
.spinner{display:inline-block;width:12px;height:12px;border:2px solid #1d394b;border-top-color:var(--gold);border-radius:50%;animation:spin .7s linear infinite;vertical-align:middle}
@keyframes spin{to{transform:rotate(360deg)}}
.flash{animation:flash .55s ease}
@keyframes flash{0%{opacity:.45;transform:translateY(2px)}100%{opacity:1;transform:none}}

/* BINARY INTELLIGENCE DESIGN */
.binary-section{margin-top:55px;padding-top:30px;border-top:1px solid #29415a}
.binary-heading{display:flex;justify-content:space-between;align-items:center;gap:15px;margin-bottom:20px}
.binary-heading h2{font-size:clamp(25px,3.5vw,35px);margin:5px 0}
.binary-heading p{color:var(--muted);font-size:12px;margin:5px 0;max-width:650px}
.binary-accent{color:var(--blue)}
.bi-select{background:#102338;color:var(--text);border:1px solid #31506c;border-radius:10px;padding:12px;min-width:145px;font-size:12px}
.bi-btn{background:linear-gradient(135deg,#8cc4ff,#4b91e8);color:#061629;border:0;border-radius:10px;padding:12px 17px;font-weight:900;font-size:12px}
.bi-status{font-size:10px}
.bi-dot{width:8px;height:8px;background:var(--gold);border-radius:50%}
.bi-card{background:linear-gradient(145deg,#13283e,#0c1b2b);border:1px solid #29435c;border-radius:16px;padding:17px;min-width:0}
.bi-label{font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:1px}
.bi-value{font-size:clamp(20px,2.4vw,28px);font-weight:850;margin:8px 0 3px;overflow-wrap:anywhere}
.bi-main{display:grid;grid-template-columns:1.1fr .9fr;gap:13px;margin-top:13px}
.bi-signal{min-height:240px;background:linear-gradient(145deg,#102b40,#102033);border:1px solid #31506c;border-radius:16px;padding:20px}
.bi-direction{font-size:35px;font-weight:950;letter-spacing:1px;margin:10px 0}
.bi-direction.call{color:var(--green)}.bi-direction.put{color:var(--red)}.bi-direction.wait{color:var(--gold)}
.bi-signal h3{font-size:16px;margin:8px 0}
.bi-signal p{font-size:12px;color:#b8c9da}
.bi-expiry{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-top:17px}
.bi-expiry div{background:#091a29;border:1px solid #29435c;border-radius:10px;padding:11px}
.bi-expiry span{display:block;color:var(--muted);font-size:10px}
.bi-expiry strong{display:block;margin-top:4px;font-size:13px}
.bi-checks{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.bi-check{display:flex;align-items:center;gap:8px;background:#0b1c2c;border:1px solid #29435c;border-radius:10px;padding:10px;font-size:11px;color:#c7d6e4}
.bi-scorebar{height:7px;background:#263c50;border-radius:99px;overflow:hidden;margin:10px 0}
.bi-scorebar i{display:block;height:100%;width:0;background:linear-gradient(90deg,#478ee6,#31d6a0);transition:width .35s}
.bi-table{width:100%;border-collapse:collapse;font-size:11px;white-space:nowrap}
.bi-table th,.bi-table td{padding:10px 7px;text-align:left;border-bottom:1px solid #263d51}
.bi-table th{color:var(--muted)}
.bi-actions{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-top:10px}
.bi-clear{background:#182d42;color:#c5d5e5;border:1px solid #34506b;border-radius:8px;padding:8px 10px;font-size:10px}
.bi-disclaimer{margin-top:15px;padding:14px;border-left:3px solid var(--blue);background:#122438;border-radius:0 10px 10px 0;color:#c1d0df;font-size:11px}
.bi-source{font-size:10px;color:#8299af;margin-top:10px}
.bi-muted{color:var(--muted)}
@media(max-width:850px){
 .grid,.bi-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
 .cols,.bottom-grid,.bi-main,.bi-bottom{grid-template-columns:1fr}
 .hero{align-items:flex-start;flex-direction:column}
 .controls{width:100%}
 .select,.btn{flex:1}
 .top{align-items:flex-start}
 .status{max-width:150px}
 .binary-heading{align-items:flex-start;flex-direction:column}
}
@media(max-width:430px){
 .wrap{padding:13px}
 .card,.bi-card{padding:14px}
 .grid,.bi-grid{gap:9px}
 .metric-value,.bi-value{font-size:22px}
 .levels{gap:5px}
 .level{padding:8px}
 .level strong{font-size:11px}
 .confluences,.bi-checks{grid-template-columns:1fr}
 .brand{font-size:17px}
 .hero h1{font-size:30px}
 .bi-controls{display:grid;grid-template-columns:1fr 1fr}
 .bi-select,.bi-btn{width:100%;min-width:0}
}
</style>
</head>
<body>
<main class="wrap">

<header class="top">
 <div>
  <div class="brand">TRADING<span>FLOOR AI</span></div>
  <div class="subtitle">Market intelligence · Technical confluence · Signal workspace</div>
 </div>
 <div class="status"><span class="dot" id="status-dot"></span><span id="feed-status">FEED NOT CHECKED</span></div>
</header>

<section class="hero">
 <div>
  <div class="eyebrow">Live market terminal</div>
  <h1>Trade the setup.<br><span class="gold">Not the noise.</span></h1>
  <p>Market candles, trend structure, supply and demand, breakouts, retests and candlestick-pattern checks in one clean dashboard.</p>
 </div>
 <div class="controls">
  <select id="market" class="select" aria-label="Market">
   <option value="BTCUSDT">Bitcoin · BTC/USDT</option>
   <option value="PAXGUSDT">Gold proxy · PAXG/USDT</option>
  </select>
  <select id="interval" class="select" aria-label="Timeframe">
   <option value="15m">15 minutes</option>
   <option value="30m">30 minutes</option>
   <option value="1h" selected>1 hour</option>
   <option value="4h">4 hours</option>
  </select>
  <button id="generate" class="btn btn-primary">✦ Generate Signal</button>
 </div>
</section>

<section class="grid">
 <div class="card"><div class="metric-label">Latest market price <span class="gold">● LIVE</span></div><div class="metric-value" id="price">—</div><div class="small" id="price-sub">Waiting for Binance candles</div></div>
 <div class="card"><div class="metric-label">24-candle change <span>↗</span></div><div class="metric-value" id="change">—</div><div class="small" id="change-sub">Selected timeframe</div></div>
 <div class="card"><div class="metric-label">Market bias <span>◈</span></div><div class="metric-value" id="bias">WAIT</div><div class="small" id="bias-sub">Awaiting analysis</div></div>
 <div class="card"><div class="metric-label">Confluence score <span>◎</span></div><div class="metric-value" id="score">—</div><div class="bar"><i id="score-bar"></i></div><div class="small">Rule-based score, not a win probability</div></div>
</section>

<section class="cols">
 <article class="card">
  <div class="card-head"><div><h2>Price action</h2><div class="small" id="chart-sub">Recent Binance spot candles</div></div><span class="tag" id="symbol-tag">BTCUSDT · 1H</span></div>
  <div class="chart"><svg id="chart" viewBox="0 0 760 250" preserveAspectRatio="none" role="img" aria-label="Candlestick chart"><text x="380" y="125" fill="#91a4b9" text-anchor="middle">Loading market candles…</text></svg></div>
  <div class="small" id="candle-meta">Candles are fetched from Binance public market data.</div>
  <div class="notice">Chart is an illustrative candle plot from exchange data, not a broker execution chart. Network access, symbol availability and exchange restrictions can affect updates.</div>
 </article>

 <article class="card">
  <div class="card-head"><div><h2>Signal generator</h2><div class="small">Entry · invalidation · targets</div></div><span class="tag" id="signal-tf">1H</span></div>
  <div class="signal-box">
   <div class="signal-top"><div class="signal-direction" id="signal-dir">WAIT</div><span class="pill wait" id="signal-pill">NO SETUP</span></div>
   <h3 id="setup-title">Waiting for a valid setup</h3>
   <p id="signal-reason">Press Generate Signal to fetch candles and run the confluence checks.</p>
   <div class="levels">
    <div class="level entry"><span>ENTRY</span><strong id="entry">—</strong></div>
    <div class="level sl"><span>STOP LOSS</span><strong id="stop">—</strong></div>
    <div class="level tp"><span>TAKE PROFIT</span><strong id="target">—</strong></div>
   </div>
   <div class="small" style="margin-top:12px" id="rr">Risk/reward: —</div>
  </div>
  <div class="card-head" style="margin-top:18px;margin-bottom:8px"><h2>Confluence checklist</h2><span class="tag" id="checks-count">0 / 6</span></div>
  <div class="confluences" id="confluences"><div class="confluence">Run analysis to evaluate conditions.</div></div>
 </article>
</section>

<section class="bottom-grid">
 <article class="card">
  <div class="card-head"><h2>Market structure</h2><span class="tag">Auto-detected</span></div>
  <div class="rows" id="structure"><div class="item"><div><b>Trend</b><small>Waiting for candles</small></div><span class="tag">—</span></div></div>
 </article>
 <article class="card">
  <div class="card-head"><h2>Recent signal history</h2><span class="tag">This browser</span></div>
  <div class="table-wrap"><table><thead><tr><th>Time</th><th>Market</th><th>TF</th><th>Signal</th><th>Score</th></tr></thead><tbody id="history"><tr><td colspan="5">No generated signals yet.</td></tr></tbody></table></div>
  <div class="small" style="margin-top:9px">History stays in this browser only; it is not shared with other users.</div>
 </article>
</section>

<div class="notice"><b>Risk note:</b> This is an experimental rule-based signal tool, not a validated profitable strategy. A confluence score is not a win rate. Test signals against historical data and paper-trade before risking money. PAXG/USDT is a gold-backed token proxy, not the XAU/USD spot index.</div>

<!-- BINARY INTELLIGENCE DASHBOARD -->
<section class="binary-section" id="binary-intelligence">
 <div class="binary-heading">
  <div>
   <div class="eyebrow">Second intelligence terminal</div>
   <h2>Binary <span class="binary-accent">Intelligence</span></h2>
   <p>Technical market analysis for regular forex and cryptocurrency markets. Separate from the Gold/Bitcoin signal system above.</p>
  </div>
  <div class="bi-status"><span class="bi-dot" id="bi-dot"></span><span id="bi-status">BINARY FEED NOT CHECKED</span></div>
 </div>

 <div class="bi-controls">
  <select id="bi-market" class="bi-select" aria-label="Binary market">
   <optgroup label="Regular Forex">
    <option value="EURUSD">EUR/USD</option>
    <option value="GBPUSD">GBP/USD</option>
    <option value="USDJPY">USD/JPY</option>
    <option value="AUDUSD">AUD/USD</option>
    <option value="NZDUSD">NZD/USD</option>
    <option value="USDCAD">USD/CAD</option>
    <option value="USDCHF">USD/CHF</option>
   </optgroup>
   <optgroup label="Cryptocurrency">
    <option value="BTCUSDT">Bitcoin · BTC/USDT</option>
    <option value="ETHUSDT">Ethereum · ETH/USDT</option>
    <option value="BNBUSDT">BNB · BNB/USDT</option>
    <option value="SOLUSDT">Solana · SOL/USDT</option>
    <option value="XRPUSDT">XRP · XRP/USDT</option>
   </optgroup>
  </select>

  <select id="bi-timeframe" class="bi-select" aria-label="Binary timeframe">
   <option value="1m">1 Minute</option>
   <option value="5m" selected>5 Minutes</option>
   <option value="30m">30 Minutes</option>
   <option value="45m">45 Minutes</option>
   <option value="1h">1 Hour</option>
  </select>

  <button class="bi-btn" id="bi-generate">✦ Analyse Binary Market</button>
 </div>

 <section class="bi-grid">
  <div class="bi-card"><div class="bi-label">Current market price</div><div class="bi-value" id="bi-price">—</div><div class="small" id="bi-price-sub">Waiting for market data</div></div>
  <div class="bi-card"><div class="bi-label">Market direction</div><div class="bi-value" id="bi-trend">WAIT</div><div class="small" id="bi-trend-sub">Trend not analysed</div></div>
  <div class="bi-card"><div class="bi-label">RSI (14)</div><div class="bi-value" id="bi-rsi">—</div><div class="small" id="bi-rsi-sub">Momentum indicator</div></div>
  <div class="bi-card"><div class="bi-label">Confluence strength</div><div class="bi-value" id="bi-score">—</div><div class="bi-scorebar"><i id="bi-scorebar"></i></div><div class="small">Technical votes, not win probability</div></div>
 </section>

 <section class="bi-main">
  <article class="bi-card">
   <div class="card-head"><div><h2>Binary signal decision</h2><div class="small" id="bi-market-label">Regular market data</div></div><span class="tag" id="bi-signal-tf">5M</span></div>
   <div class="bi-signal">
    <div class="small">CURRENT TECHNICAL DECISION</div>
    <div class="bi-direction wait" id="bi-direction">WAIT</div>
    <h3 id="bi-signal-title">Waiting for market analysis</h3>
    <p id="bi-signal-reason">Choose a market and analyse it to calculate the CALL / PUT / WAIT decision.</p>
    <div class="bi-expiry">
     <div><span>REFERENCE PRICE</span><strong id="bi-entry">—</strong></div>
     <div><span>ANALYSIS TIMEFRAME</span><strong id="bi-expiry-time">5 minutes</strong></div>
    </div>
   </div>
   <div class="small" style="margin-top:12px" id="bi-last-candle">No candle data loaded.</div>
  </article>

  <article class="bi-card">
   <div class="card-head"><div><h2>Indicator confluence</h2><div class="small">Multiple independent technical checks</div></div><span class="tag" id="bi-check-count">0 / 8</span></div>
   <div class="bi-checks" id="bi-checks">
    <div class="bi-check">Analysis pending</div>
   </div>
   <div class="notice">The score measures how many programmed conditions agree. It does not estimate the probability of winning a binary trade.</div>
  </article>
 </section>

 <section class="bi-bottom">
  <article class="bi-card">
   <div class="card-head"><h2>Weekly and monthly journal</h2><span class="tag">Saved on this device</span></div>
   <div class="bi-grid" style="grid-template-columns:repeat(2,minmax(0,1fr))">
    <div><div class="bi-label">Signals this week</div><div class="bi-value" id="bi-week-count">0</div></div>
    <div><div class="bi-label">Signals this month</div><div class="bi-value" id="bi-month-count">0</div></div>
   </div>
   <div class="small" style="margin-top:10px">Counts are generated CALL and PUT decisions, not verified wins or losses.</div>
  </article>

  <article class="bi-card">
   <div class="card-head"><h2>Recent binary decisions</h2><span class="tag">Local journal</span></div>
   <div class="table-wrap">
    <table class="bi-table">
     <thead><tr><th>Time</th><th>Market</th><th>TF</th><th>Decision</th><th>Score</th></tr></thead>
     <tbody id="bi-history"><tr><td colspan="5">No binary decisions saved yet.</td></tr></tbody>
    </table>
   </div>
   <div class="bi-actions">
    <span class="small">Stored in this browser only.</span>
    <button class="bi-clear" id="bi-clear-history" type="button">Clear journal</button>
   </div>
  </article>
 </section>

 <div class="bi-disclaimer">
  <b>Important market distinction:</b> This dashboard analyses regular forex and cryptocurrency market data supplied by Biquote and Binance. These prices are <b>not Quotex OTC or Pocket Option OTC prices</b>. Broker OTC instruments may use different prices, feeds, trading hours, and price behavior. A CALL or PUT decision here is not a broker-specific instruction and may not match what you see on an OTC platform. No broker connection, trade execution, API key, or private backend is used.
 </div>
 <div class="bi-source">Forex feed: Biquote public market data · Crypto feed: Binance public market data · Browser-side analysis only</div>
</section>

<footer class="foot">TradingFloor AI · Public market data · No trade execution · No performance guarantee</footer>
</main>

<!-- ORIGINAL GOLD / BITCOIN JAVASCRIPT -->
<script>
(()=>{
'use strict';
const $=id=>document.getElementById(id);
const API='https://api.binance.com/api/v3/klines';
const fmt=n=>Number.isFinite(n)?n.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:n<1?5:2}):'—';
let candles=[],lastSignal=null,busy=false;
const stateKey='tradingfloor_ai_history_v1';

function setStatus(text,live=false){
 $('feed-status').textContent=text;
 $('status-dot').className='dot'+(live?' live':'');
}

async function getCandles(){
 const symbol=$('market').value,interval=$('interval').value;
 const url=API+'?symbol='+encodeURIComponent(symbol)+'&interval='+encodeURIComponent(interval)+'&limit=180';
 const controller=new AbortController();
 const timer=setTimeout(()=>controller.abort(),12000);
 let res;
 try{
  res=await fetch(url,{cache:'no-store',signal:controller.signal});
 }catch(err){
  if(err.name==='AbortError')throw Error('Market data request timed out after 12 seconds.');
  throw Error('Could not reach Binance Spot API. Check your internet connection or browser network restrictions.');
 }finally{
  clearTimeout(timer);
 }
 if(!res.ok){
  let detail='HTTP '+res.status;
  try{const j=await res.json();if(j.msg)detail=j.msg}catch{}
  throw Error(detail+' — symbol may not be listed on Binance Spot. Try BTC/USDT or the PAXG/USDT gold-backed token proxy.');
 }
 const raw=await res.json();
 if(!Array.isArray(raw)||!raw.length)throw Error('No candles returned for '+symbol);
 return raw.slice(0,-1).map(k=>({
  t:+k[0],o:+k[1],h:+k[2],l:+k[3],c:+k[4],v:+k[5],closeTime:+k[6]
 })).filter(c=>[c.o,c.h,c.l,c.c,c.v].every(Number.isFinite));
}

function ema(values,period){
 const k=2/(period+1);
 let out=values[0];
 for(let i=1;i<values.length;i++)out=values[i]*k+out*(1-k);
 return out;
}

function avgRange(cs,n=14){
 const a=cs.slice(-n).map(c=>c.h-c.l);
 return a.reduce((x,y)=>x+y,0)/(a.length||1);
}

function pivots(cs){
 const highs=[],lows=[];
 for(let i=2;i<cs.length-2;i++){
  const c=cs[i];
  if(c.h>cs[i-1].h&&c.h>cs[i-2].h&&c.h>=cs[i+1].h&&c.h>=cs[i+2].h)highs.push({i,p:c.h});
  if(c.l<cs[i-1].l&&c.l<cs[i-2].l&&c.l<=cs[i+1].l&&c.l<=cs[i+2].l)lows.push({i,p:c.l});
 }
 return{highs,lows};
}

function candlePatterns(cs){
 const a=cs[cs.length-1],b=cs[cs.length-2];
 const body=Math.abs(a.c-a.o)||1e-9;
 const range=Math.max(a.h-a.l,1e-9);
 const prev=Math.abs(b.c-b.o);
 const bullEngulf=b.c<b.o&&a.c>a.o&&a.o<=b.c&&a.c>=b.o;
 const bearEngulf=b.c>b.o&&a.c<a.o&&a.o>=b.c&&a.c<=b.o;
 const lower=Math.min(a.o,a.c)-a.l;
 const upper=a.h-Math.max(a.o,a.c);
 const hammer=lower>body*2&&upper<body*.8&&a.c>a.o;
 const shooting=upper>body*2&&lower<body*.8&&a.c<a.o;
 const bull=a.c>a.o&&a.c>b.c;
 return{bullEngulf,bearEngulf,hammer,shooting,doji:body/range<.1,body,prev,bull,bear:a.c<a.o};
}

function analyse(cs){
 const closes=cs.map(c=>c.c);
 const last=cs[cs.length-1],prev=cs[cs.length-2];
 const atr=avgRange(cs,14);
 const e20=ema(closes.slice(-80),20),e50=ema(closes.slice(-120),50);
 const trend=e20>e50&&last.c>e20?'Bullish':e20<e50&&last.c<e20?'Bearish':'Mixed';
 const {highs,lows}=pivots(cs);
 const resistance=highs.filter(x=>x.i>cs.length-45).slice(-1)[0];
 const support=lows.filter(x=>x.i>cs.length-45).slice(-1)[0];
 const pat=candlePatterns(cs);
 const near=level=>level&&Math.abs(last.c-level.p)<=atr*1.2;
 const inDemand=near(support)&&last.c>=support.p;
 const inSupply=near(resistance)&&last.c<=resistance.p;
 const breakoutUp=!!resistance&&prev.c<=resistance.p&&last.c>resistance.p;
 const breakoutDown=!!support&&prev.c>=support.p&&last.c<support.p;
 const retestUp=!!resistance&&last.l<=resistance.p+atr*.25&&last.c>resistance.p&&last.c>last.o;
 const retestDown=!!support&&last.h>=support.p-atr*.25&&last.c<support.p&&last.c<last.o;
 const higherHigh=highs.length>1&&highs[highs.length-1].p>highs[highs.length-2].p;
 const higherLow=lows.length>1&&lows[lows.length-1].p>lows[lows.length-2].p;
 const lowerHigh=highs.length>1&&highs[highs.length-1].p<highs[highs.length-2].p;
 const lowerLow=lows.length>1&&lows[lows.length-1].p<lows[lows.length-2].p;
 const bullish=[trend==='Bullish',inDemand||retestUp||breakoutUp,higherHigh||higherLow,pat.bullEngulf||pat.hammer,breakoutUp||retestUp,last.c>prev.c];
 const bearish=[trend==='Bearish',inSupply||retestDown||breakoutDown,lowerHigh||lowerLow,pat.bearEngulf||pat.shooting,breakoutDown||retestDown,last.c<prev.c];
 const bullScore=bullish.filter(Boolean).length;
 const bearScore=bearish.filter(Boolean).length;
 let dir='WAIT',score=Math.max(bullScore,bearScore)/6*100;
 if(bullScore>=3&&bullScore>bearScore)dir='BUY';
 else if(bearScore>=3&&bearScore>bullScore)dir='SELL';
 const entry=last.c;
 let stop=null,target=null,rr=null;
 if(dir==='BUY'){
  stop=Math.min(entry-atr*1.25,support?support.p-atr*.15:entry-atr*1.25);
  target=entry+Math.max(entry-stop,atr)*1.8;
  rr=(target-entry)/(entry-stop);
 }else if(dir==='SELL'){
  stop=Math.max(entry+atr*1.25,resistance?resistance.p+atr*.15:entry+atr*1.25);
  target=entry-Math.max(stop-entry,atr)*1.8;
  rr=(entry-target)/(stop-entry);
 }
 return{last,prev,atr,e20,e50,trend,resistance,support,inDemand,inSupply,breakoutUp,breakoutDown,retestUp,retestDown,higherHigh,higherLow,lowerHigh,lowerLow,pat,bullScore,bearScore,dir,score,entry,stop,target,rr,checks:dir==='BUY'?bullish:dir==='SELL'?bearish:[trend==='Bullish',trend==='Bearish',inDemand,inSupply,breakoutUp||breakoutDown,retestUp||retestDown]};
}
function drawChart(cs){
 const svg=$('chart');
 if(cs.length<2)return;
 const data=cs.slice(-55);
 const min=Math.min(...data.map(c=>c.l));
 const max=Math.max(...data.map(c=>c.h));
 const span=max-min||1;
 const xstep=760/data.length;
 const bodyW=Math.max(3,xstep*.52);
 let s='';
 for(let j=0;j<5;j++){
  const y=10+j*55;
  s+='<line x1="0" y1="'+y+'" x2="760" y2="'+y+'" stroke="#23384d" stroke-dasharray="4 6"/>';
 }
 data.forEach((c,i)=>{
  const x=i*xstep+xstep/2;
  const y=v=>235-(v-min)/span*215;
  const up=c.c>=c.o;
  const color=up?'#31d6a0':'#ff687d';
  const top=Math.min(y(c.o),y(c.c));
  const height=Math.max(2,Math.abs(y(c.o)-y(c.c)));
  s+='<line x1="'+x+'" y1="'+y(c.h)+'" x2="'+x+'" y2="'+y(c.l)+'" stroke="'+color+'" stroke-width="1.4"/><rect x="'+(x-bodyW/2)+'" y="'+top+'" width="'+bodyW+'" height="'+height+'" rx="1" fill="'+color+'"/>';
 });
 svg.innerHTML=s;
}

function renderStructure(a){
 const rows=[
  ['Trend',a.trend,a.trend==='Bullish'?'positive':a.trend==='Bearish'?'negative':''],
  ['Supply zone',a.inSupply?'Price near resistance/supply':'No nearby supply zone',a.inSupply?'negative':''],
  ['Demand zone',a.inDemand?'Price near support/demand':'No nearby demand zone',a.inDemand?'positive':''],
  ['Breakout',a.breakoutUp?'Bullish breakout':a.breakoutDown?'Bearish breakdown':'No fresh breakout',a.breakoutUp?'positive':a.breakoutDown?'negative':''],
  ['Retest',a.retestUp?'Bullish retest':a.retestDown?'Bearish retest':'No confirmed retest',a.retestUp?'positive':a.retestDown?'negative':''],
  ['Structure',a.higherHigh&&a.higherLow?'Higher highs / higher lows':a.lowerHigh&&a.lowerLow?'Lower highs / lower lows':'Mixed swing structure','']
 ];
 $('structure').innerHTML=rows.map(r=>'<div class="item"><div><b>'+r[0]+'</b><small>'+r[1]+'</small></div><span class="tag '+r[2]+'">'+(r[2]==='positive'?'Bullish':r[2]==='negative'?'Bearish':'Checked')+'</span></div>').join('');
}

function renderSignal(a){
 const buy=a.dir==='BUY',sell=a.dir==='SELL',waiting=a.dir==='WAIT';
 $('bias').textContent=a.dir;
 $('bias').className='metric-value '+(buy?'positive':sell?'negative':'');
 $('bias-sub').textContent=buy?'Bullish confluence':sell?'Bearish confluence':'No high-confluence setup';
 $('signal-dir').textContent=a.dir;
 $('signal-dir').className='signal-direction '+(buy?'positive':sell?'negative':'');
 $('signal-pill').textContent=buy?'BUY SETUP':sell?'SELL SETUP':'NO TRADE';
 $('signal-pill').className='pill '+(buy?'buy':sell?'sell':'wait');
 $('setup-title').textContent=buy?'Bullish technical confluence':sell?'Bearish technical confluence':'Wait for clearer confluence';
 $('signal-reason').textContent=waiting
  ?'No direction reached the 3-of-6 candidate threshold, or bullish and bearish evidence tied. Stay flat rather than inventing direction.'
  :(buy?'Bullish':'Bearish')+' rules agree across trend, structure, zones, breakout/retest and candle-pattern checks. Candidate generated using a 3-of-6 rule threshold. Higher frequency does not mean higher accuracy; this is not a performance prediction.';
 $('entry').textContent=fmt(a.entry);
 $('stop').textContent=a.stop?fmt(a.stop):'—';
 $('target').textContent=a.target?fmt(a.target):'—';
 $('rr').textContent=a.rr?'Risk/reward target: 1 : '+a.rr.toFixed(2)+' · ATR-based levels':'Risk/reward: not available';
 const labels=['Trend alignment','Supply / demand zone','Swing structure','Candlestick pattern','Breakout / retest','Momentum direction'];
 $('confluences').innerHTML=labels.map((label,i)=>'<div class="confluence"><span class="'+(a.checks[i]?'check':'cross')+'">'+(a.checks[i]?'✓':'○')+'</span><span>'+label+'<br><span class="small">'+(a.checks[i]?'Condition detected':'Condition not confirmed')+'</span></span></div>').join('');
 $('checks-count').textContent=a.checks.filter(Boolean).length+' / 6';
 $('score').textContent=Math.round(a.score)+' / 100';
 $('score-bar').style.width=Math.round(a.score)+'%';
 $('score-bar').style.background=buy?'linear-gradient(90deg,#2a9b7a,#31d6a0)':sell?'linear-gradient(90deg,#bc4a5b,#ff687d)':'linear-gradient(90deg,#b48b35,#f5bd4f)';
}

function saveHistory(a){
 if(a.dir==='WAIT')return;
 let h=[];
 try{h=JSON.parse(localStorage.getItem(stateKey)||'[]')}catch{}
 const rec={
  t:Date.now(),symbol:$('market').value,tf:$('interval').value,
  dir:a.dir,score:Math.round(a.score),entry:a.entry,stop:a.stop,target:a.target
 };
 h.unshift(rec);
 h=h.slice(0,25);
 try{localStorage.setItem(stateKey,JSON.stringify(h))}catch{}
 renderHistory(h);
}

function renderHistory(h){
 $('history').innerHTML=h.length
  ?h.slice(0,10).map(x=>'<tr><td>'+new Date(x.t).toLocaleString()+'</td><td>'+x.symbol+'</td><td>'+x.tf+'</td><td class="'+(x.dir==='BUY'?'positive':'negative')+'">'+x.dir+'</td><td>'+x.score+'/100</td></tr>').join('')
  :'<tr><td colspan="5">No generated signals yet.</td></tr>';
}

async function generate(){
 if(busy)return;
 busy=true;
 $('generate').disabled=true;
 $('generate').innerHTML='<span class="spinner"></span> Analysing…';
 setStatus('FETCHING CANDLES');
 try{
  const cs=await getCandles();
  if(cs.length<60)throw Error('Not enough closed candles returned for reliable analysis. Please try again later.');
  candles=cs;
  const a=analyse(cs);
  lastSignal=a;
  const p=a.last.c;
  const first=cs[Math.max(0,cs.length-25)].c;
  const change=(p-first)/first*100;
  $('price').textContent=fmt(p);
  $('price-sub').textContent=$('market').value+' · latest candle '+new Date(a.last.t).toLocaleString();
  $('change').textContent=(change>=0?'+':'')+change.toFixed(2)+'%';
  $('change').className='metric-value '+(change>=0?'positive':'negative');
  $('change-sub').textContent='Change over recent 24 candles';
  $('symbol-tag').textContent=$('market').value+' · '+$('interval').value.toUpperCase();
  $('signal-tf').textContent=$('interval').value.toUpperCase();
  $('chart-sub').textContent='Binance spot · '+$('interval').value.toUpperCase();
  $('candle-meta').textContent=cs.length+' closed candles loaded · last candle '+new Date(a.last.t).toLocaleString();
  drawChart(cs);
  renderStructure(a);
  renderSignal(a);
  saveHistory(a);
  setStatus('BINANCE FEED CONNECTED',true);
  $('generate').classList.add('flash');
  setTimeout(()=>$('generate').classList.remove('flash'),600);
 }catch(e){
  setStatus('FEED ERROR');
  $('price-sub').textContent=e.message;
  $('signal-reason').textContent=e.message+' No fallback price is fabricated.';
  $('setup-title').textContent='Market data unavailable';
  $('signal-dir').textContent='WAIT';
  $('signal-pill').textContent='FEED ERROR';
  $('signal-pill').className='pill wait';
  $('bias').textContent='WAIT';
  $('bias-sub').textContent='Could not analyse market';
  $('entry').textContent='—';
  $('stop').textContent='—';
  $('target').textContent='—';
  $('rr').textContent='Risk/reward: unavailable until candles load';
  $('score').textContent='—';
  $('score-bar').style.width='0%';
  $('confluences').innerHTML='<div class="confluence">Market data unavailable. No technical signal was generated.</div>';
  console.error(e);
 }finally{
  busy=false;
  $('generate').disabled=false;
  $('generate').textContent='✦ Generate Signal';
 }
}

$('generate').addEventListener('click',generate);
$('market').addEventListener('change',()=>{
 setStatus('MARKET CHANGED');
 $('price').textContent='—';
 $('change').textContent='—';
 $('bias').textContent='WAIT';
 $('score').textContent='—';
 $('chart').innerHTML='<text x="380" y="125" fill="#91a4b9" text-anchor="middle">Press Generate Signal to load this market…</text>';
});
$('interval').addEventListener('change',()=>{
 $('signal-tf').textContent=$('interval').value.toUpperCase();
 setStatus('TIMEFRAME CHANGED');
});
let h=[];
try{h=JSON.parse(localStorage.getItem(stateKey)||'[]')}catch{}
renderHistory(h);
generate();
})();
</script>

<!-- BINARY INTELLIGENCE JAVASCRIPT -->
<script>
(()=>{
'use strict';

const $=id=>document.getElementById(id);
const BQ='https://biquote.io/api';
const BINANCE='https://api.binance.com/api/v3/klines';
const journalKey='tradingfloor_binary_journal_v1';

let binaryBusy=false;
let binaryCandles=[];

const biSymbols={
 EURUSD:'EUR/USD',GBPUSD:'GBP/USD',USDJPY:'USD/JPY',
 AUDUSD:'AUD/USD',NZDUSD:'NZD/USD',USDCAD:'USD/CAD',
 USDCHF:'USD/CHF',BTCUSDT:'BTC/USDT',ETHUSDT:'ETH/USDT',
 BNBUSDT:'BNB/USDT',SOLUSDT:'SOL/USDT',XRPUSDT:'XRP/USDT'
};

function biFormat(n){
 if(!Number.isFinite(n))return '—';
 const digits=n<0.01?6:n<1?5:n<100?4:2;
 return n.toLocaleString('en-US',{
  minimumFractionDigits:digits,
  maximumFractionDigits:digits
 });
}

function biSetStatus(message,live=false){
 $('bi-status').textContent=message;
 $('bi-dot').className='bi-dot'+(live?' live':'');
}

function biTimeoutFetch(url,ms=15000){
 const controller=new AbortController();
 const timer=setTimeout(()=>controller.abort(),ms);
 return fetch(url,{cache:'no-store',signal:controller.signal})
 .then(async response=>{
  if(!response.ok){
   let message='HTTP '+response.status;
   try{
    const body=await response.json();
    if(body.message)message=body.message;
    if(body.msg)message=body.msg;
   }catch{}
   throw new Error(message);
  }
  return response.json();
 })
 .catch(error=>{
  if(error.name==='AbortError')throw new Error('Market data request timed out. Try again.');
  throw error;
 })
 .finally(()=>clearTimeout(timer));
}

/* Build 45-minute candles from three completed 15-minute candles. */
function biAggregate45(candles){
 const groups=new Map();
 const bucketSize=45*60*1000;

 candles.forEach(c=>{
  const bucket=Math.floor(c.t/bucketSize)*bucketSize;
  if(!groups.has(bucket))groups.set(bucket,[]);
  groups.get(bucket).push(c);
 });

 const result=[];

 for(const [time,items] of groups.entries()){
  items.sort((a,b)=>a.t-b.t);
  if(items.length!==3)continue;

  const continuous=
   items[1].t-items[0].t===15*60*1000&&
   items[2].t-items[1].t===15*60*1000;

  if(!continuous)continue;

  result.push({
   t:time,
   o:items[0].o,
   h:Math.max(...items.map(x=>x.h)),
   l:Math.min(...items.map(x=>x.l)),
   c:items[2].c,
   v:items.reduce((sum,x)=>sum+(x.v||0),0)
  });
 }

 return result.sort((a,b)=>a.t-b.t);
}

async function biFetchCandles(symbol,interval){
 const crypto=symbol.endsWith('USDT');
 const sourceInterval=interval==='45m'?'15m':interval;
 let candles=[];

 if(crypto){
  const url=BINANCE+
   '?symbol='+encodeURIComponent(symbol)+
   '&interval='+encodeURIComponent(sourceInterval)+
   '&limit=350';

  const raw=await biTimeoutFetch(url);
  if(!Array.isArray(raw))throw new Error('Binance returned an unexpected candle response.');

  candles=raw.slice(0,-1).map(k=>({
   t:Number(k[0]),o:Number(k[1]),h:Number(k[2]),
   l:Number(k[3]),c:Number(k[4]),v:Number(k[5])
  }));
 }else{
  const url=BQ+'/'+encodeURIComponent(symbol)+
   '/ohlc?interval='+encodeURIComponent(sourceInterval)+
   '&limit=350';

  const data=await biTimeoutFetch(url);

  if(!data||!Array.isArray(data.bars)){
   throw new Error('Biquote did not return candle data for '+symbol+'.');
  }

  candles=data.bars.filter(b=>b.isOpen!==true).map(b=>({
   t:typeof b.openTime==='number'?b.openTime:Date.parse(b.openTime),
   o:Number(b.open),h:Number(b.high),l:Number(b.low),
   c:Number(b.close),v:Number(b.tickVolume||b.volume||0)
  }));
 }

 candles=candles.filter(c=>
  Number.isFinite(c.t)&&
  [c.o,c.h,c.l,c.c].every(Number.isFinite)
 ).sort((a,b)=>a.t-b.t);

 if(interval==='45m')candles=biAggregate45(candles);

 if(candles.length<60){
  throw new Error('Not enough completed candles for '+symbol+' on '+interval+'. Try another timeframe or market.');
 }

 return candles;
}

function biEmaSeries(values,period){
 if(!values.length)return [];
 const k=2/(period+1);
 const out=[values[0]];
 for(let i=1;i<values.length;i++){
  out.push(values[i]*k+out[i-1]*(1-k));
 }
 return out;
}

function biRsi(values,period=14){
 if(values.length<period+1)return 50;
 let gains=0,losses=0;

 for(let i=values.length-period;i<values.length;i++){
  const change=values[i]-values[i-1];
  if(change>0)gains+=change;
  else losses-=change;
 }

 const avgGain=gains/period;
 const avgLoss=losses/period;
 if(avgLoss===0)return 100;
 if(avgGain===0)return 0;
 return 100-(100/(1+avgGain/avgLoss));
}

function biMacd(values){
 if(values.length<35)return {line:0,signal:0,hist:0};
 const fast=biEmaSeries(values,12);
 const slow=biEmaSeries(values,26);
 const line=values.map((v,i)=>fast[i]-slow[i]);
 const signalSeries=biEmaSeries(line,9);
 const last=line.length-1;
 return{
  line:line[last],
  signal:signalSeries[last],
  hist:line[last]-signalSeries[last]
 };
}

function biGetTrend(candles){
 const closes=candles.map(c=>c.c);
 const e9=biEmaSeries(closes,9).at(-1);
 const e21=biEmaSeries(closes,21).at(-1);
 const e50=biEmaSeries(closes,50).at(-1);
 const last=closes.at(-1);

 if(e9>e21&&e21>e50&&last>e9)return 'Bullish';
 if(e9<e21&&e21<e50&&last<e9)return 'Bearish';
 return 'Mixed';
}

function biConfirmInterval(interval){
 return{
  '1m':'5m','5m':'15m','30m':'1h',
  '45m':'1h','1h':'4h'
 }[interval]||'1h';
}

function biAnalyse(primary,confirmation){
 const closes=primary.map(c=>c.c);
 const last=primary[primary.length-1];
 const previous=primary[primary.length-2];
 const recent=primary.slice(-15,-1);

 const e9=biEmaSeries(closes,9).slice(-1)[0];
 const e21=biEmaSeries(closes,21).slice(-1)[0];
 const e50=biEmaSeries(closes,50).slice(-1)[0];

 const rsi=biRsi(closes,14);
 const macd=biMacd(closes);
 const trend=biGetTrend(primary);
 const higherTrend=biGetTrend(confirmation);

 const bullishCandle=last.c>last.o;
 const bearishCandle=last.c<last.o;

 const bullishEngulf=
  previous.c<previous.o&&last.c>last.o&&
  last.o<=previous.c&&last.c>=previous.o;

 const bearishEngulf=
  previous.c>previous.o&&last.c<last.o&&
  last.o>=previous.c&&last.c<=previous.o;

 const priorHigh=Math.max(...recent.map(c=>c.h));
 const priorLow=Math.min(...recent.map(c=>c.l));

 const breakoutUp=last.c>priorHigh;
 const breakoutDown=last.c<priorLow;
 const higherHigh=last.h>previous.h&&last.c>previous.c;
 const lowerLow=last.l<previous.l&&last.c<previous.c;

 const bullishVotes=[
  e9>e21&&e21>e50,
  rsi>50&&rsi<70,
  macd.hist>0&&macd.line>macd.signal,
  bullishCandle&&last.c>previous.c,
  higherHigh||trend==='Bullish',
  breakoutUp,
  bullishEngulf,
  higherTrend==='Bullish'
 ];

 const bearishVotes=[
  e9<e21&&e21<e50,
  rsi<50&&rsi>30,
  macd.hist<0&&macd.line<macd.signal,
  bearishCandle&&last.c<previous.c,
  lowerLow||trend==='Bearish',
  breakoutDown,
  bearishEngulf,
  higherTrend==='Bearish'
 ];

 const bullScore=bullishVotes.filter(Boolean).length;
 const bearScore=bearishVotes.filter(Boolean).length;

 let decision='WAIT';

 if(bullScore>=5&&bullScore-bearScore>=2)decision='CALL';
 else if(bearScore>=5&&bearScore-bullScore>=2)decision='PUT';

 const score=Math.round(Math.max(bullScore,bearScore)/8*100);

 return{
  last,previous,rsi,macd,trend,higherTrend,
  e9,e21,e50,breakoutUp,breakoutDown,
  bullishVotes,bearishVotes,bullScore,bearScore,
  decision,score
 };
}

function biRenderChecks(a){
 const labels=[
  'EMA trend alignment',
  'RSI momentum',
  'MACD direction',
  'Candlestick momentum',
  'Market structure',
  'Breakout pressure',
  'Engulfing pattern',
  'Higher timeframe'
 ];

 const active=a.decision==='CALL'?a.bullishVotes:
  a.decision==='PUT'?a.bearishVotes:
  a.bullishVotes.map((v,i)=>v||a.bearishVotes[i]);

 $('bi-checks').innerHTML=labels.map((label,i)=>{
  const yes=active[i];
  return '<div class="bi-check"><b class="'+(yes?'positive':'bi-muted')+'">'+(yes?'✓':'○')+'</b><span>'+label+'<br><span class="small">'+(yes?'Condition detected':'Not confirmed')+'</span></span></div>';
 }).join('');

 $('bi-check-count').textContent=active.filter(Boolean).length+' / 8';
}

function biRenderSignal(a,symbol,interval){
 const call=a.decision==='CALL';
 const put=a.decision==='PUT';
 const waiting=a.decision==='WAIT';

 $('bi-direction').textContent=a.decision;
 $('bi-direction').className='bi-direction '+(call?'call':put?'put':'wait');

 $('bi-signal-title').textContent=call
  ?'Bullish confluence detected'
  :put
   ?'Bearish confluence detected'
   :'No sufficiently clear direction';

 $('bi-signal-reason').textContent=waiting
  ?'The technical votes did not meet the minimum threshold, or bullish and bearish evidence was too close. WAIT is intentional when the market is unclear.'
  :(call?'Bullish':'Bearish')+
   ' conditions agree across trend, momentum, candle behavior, structure and higher-timeframe confirmation. This is a rule-based candidate, not a prediction of a winning trade.';

 $('bi-entry').textContent=biFormat(a.last.c);
 $('bi-expiry-time').textContent=interval;
 $('bi-price').textContent=biFormat(a.last.c);
 $('bi-price-sub').textContent=biSymbols[symbol]+' · completed candle';

 $('bi-trend').textContent=a.trend.toUpperCase();
 $('bi-trend').className='bi-value '+(a.trend==='Bullish'?'positive':a.trend==='Bearish'?'negative':'');
 $('bi-trend-sub').textContent='Higher timeframe: '+a.higherTrend;

 $('bi-rsi').textContent=a.rsi.toFixed(1);
 $('bi-rsi-sub').textContent=a.rsi>=70?'Potentially overbought':a.rsi<=30?'Potentially oversold':'Momentum range';

 $('bi-score').textContent=a.score+' / 100';
 $('bi-scorebar').style.width=a.score+'%';
 $('bi-signal-tf').textContent=interval.toUpperCase();
 $('bi-market-label').textContent=biSymbols[symbol]+' · '+(symbol.endsWith('USDT')?'Binance':'Biquote');
 $('bi-last-candle').textContent='Last completed candle: '+new Date(a.last.t).toLocaleString();

 biRenderChecks(a);
}

function biReadJournal(){
 try{
  const data=JSON.parse(localStorage.getItem(journalKey)||'[]');
  return Array.isArray(data)?data:[];
 }catch{
  return [];
 }
}

function biWriteJournal(data){
 try{
  localStorage.setItem(journalKey,JSON.stringify(data.slice(0,100)));
 }catch(error){
  console.warn('Binary journal could not be saved:',error);
 }
}

function biSaveDecision(a,symbol,interval){
 if(a.decision==='WAIT')return;

 const history=biReadJournal();
 const record={
  t:Date.now(),
  symbol:symbol,
  tf:interval,
  decision:a.decision,
  score:a.score,
  price:a.last.c
 };

 const duplicate=history.some(x=>
  x.symbol===record.symbol&&
  x.tf===record.tf&&
  x.t===record.t
 );

 if(!duplicate){
  history.unshift(record);
  biWriteJournal(history);
 }

 biRenderJournal();
}

function biRenderJournal(){
 const history=biReadJournal();
 const now=new Date();
 const day=now.getDay();
 const monday=new Date(now);

 monday.setHours(0,0,0,0);
 monday.setDate(now.getDate()-(day===0?6:day-1));

 const monthStart=new Date(now.getFullYear(),now.getMonth(),1);
 const weekly=history.filter(x=>x.t>=monday.getTime());
 const monthly=history.filter(x=>x.t>=monthStart.getTime());

 $('bi-week-count').textContent=weekly.length;
 $('bi-month-count').textContent=monthly.length;

 $('bi-history').innerHTML=history.length
  ?history.slice(0,12).map(x=>
   '<tr>'+
    '<td>'+new Date(x.t).toLocaleString()+'</td>'+
    '<td>'+x.symbol+'</td>'+
    '<td>'+x.tf+'</td>'+
    '<td class="'+(x.decision==='CALL'?'positive':'negative')+'">'+x.decision+'</td>'+
    '<td>'+x.score+'/100</td>'+
   '</tr>'
  ).join('')
  :'<tr><td colspan="5">No binary decisions saved yet.</td></tr>';
}

async function biGenerate(){
 if(binaryBusy)return;

 binaryBusy=true;
 $('bi-generate').disabled=true;
 $('bi-generate').textContent='Analysing…';
 biSetStatus('FETCHING MARKET DATA');

 const symbol=$('bi-market').value;
 const interval=$('bi-timeframe').value;
 const confirmationInterval=biConfirmInterval(interval);

 try{
  const results=await Promise.all([
   biFetchCandles(symbol,interval),
   biFetchCandles(symbol,confirmationInterval)
  ]);

  const primary=results[0];
  const confirmation=results[1];

  binaryCandles=primary;

  const analysis=biAnalyse(primary,confirmation);

  biRenderSignal(analysis,symbol,interval);
  biSaveDecision(analysis,symbol,interval);

  biSetStatus(
   symbol.endsWith('USDT')?'BINANCE FEED CONNECTED':'BIQUOTE FEED CONNECTED',
   true
  );

  $('bi-generate').classList.add('flash');
  setTimeout(()=>$('bi-generate').classList.remove('flash'),600);

 }catch(error){
  biSetStatus('BINARY FEED ERROR');
  $('bi-direction').textContent='WAIT';
  $('bi-direction').className='bi-direction wait';
  $('bi-signal-title').textContent='Market data unavailable';
  $('bi-signal-reason').textContent=error.message+' No substitute or fabricated price has been used.';
  $('bi-price').textContent='—';
  $('bi-price-sub').textContent='Could not load market candles';
  $('bi-trend').textContent='WAIT';
  $('bi-rsi').textContent='—';
  $('bi-score').textContent='—';
  $('bi-scorebar').style.width='0%';
  $('bi-entry').textContent='—';
  $('bi-last-candle').textContent='No completed candle data available.';
  $('bi-checks').innerHTML='<div class="bi-check">No indicator analysis was generated because market data could not be loaded.</div>';
  $('bi-check-count').textContent='0 / 8';
  console.error('Binary analysis error:',error);

 }finally{
  binaryBusy=false;
  $('bi-generate').disabled=false;
  $('bi-generate').textContent='✦ Analyse Binary Market';
 }
}

$('bi-generate').addEventListener('click',biGenerate);

$('bi-market').addEventListener('change',()=>{
 $('bi-price').textContent='—';
 $('bi-trend').textContent='WAIT';
 $('bi-rsi').textContent='—';
 $('bi-score').textContent='—';
 $('bi-direction').textContent='WAIT';
 $('bi-direction').className='bi-direction wait';
 $('bi-signal-title').textContent='Market changed';
 $('bi-signal-reason').textContent='Press Analyse Binary Market to load the selected market.';
 biSetStatus('MARKET CHANGED');
});

$('bi-timeframe').addEventListener('change',()=>{
 $('bi-signal-tf').textContent=$('bi-timeframe').value.toUpperCase();
 biSetStatus('TIMEFRAME CHANGED');
});

$('bi-clear-history').addEventListener('click',()=>{
 if(!confirm('Clear the Binary Intelligence journal saved in this browser?'))return;
 try{localStorage.removeItem(journalKey)}catch{}
 biRenderJournal();
});

biRenderJournal();
biGenerate();

})();
</script>
</body>
</html>
