<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#07111f">
<title>TradingFloor AI — Market Intelligence</title>
<style>
:root{color-scheme:dark;--bg:#07111f;--panel:#101d30;--panel2:#14243a;--line:#273a52;--text:#edf4ff;--muted:#93a7bf;--gold:#e9bd64;--green:#32d6a0;--red:#ff7086;--blue:#65baff;--radius:18px}
*{box-sizing:border-box}
body{margin:0;background:radial-gradient(ellipse at 15% -5%,#193652 0,transparent 38%),linear-gradient(145deg,#07111f,#0a1424 65%,#10172a);color:var(--text);font:14px/1.5 Inter,system-ui,-apple-system,Segoe UI,Arial,sans-serif;min-height:100vh}
button,select{font:inherit}
button{cursor:pointer;transition:transform .18s,filter .18s}
button:hover{filter:brightness(1.08);transform:translateY(-1px)}
button:disabled{opacity:.55;cursor:wait;transform:none}
.shell{max-width:1320px;margin:auto;padding:22px}
.top{display:flex;justify-content:space-between;align-items:center;gap:16px;margin-bottom:22px}
.brand{font-size:20px;font-weight:950;letter-spacing:1.4px}
.brand span{color:var(--gold)}
.eyebrow{color:var(--gold);font-size:10px;font-weight:850;letter-spacing:2.5px;text-transform:uppercase}
.sub{color:var(--muted);font-size:12px;margin-top:4px}
.status{display:inline-flex;align-items:center;gap:8px;padding:9px 12px;border:1px solid var(--line);border-radius:99px;background:#102237;color:#d4e2f1;font-size:11px}
.dot{height:8px;width:8px;border-radius:50%;background:var(--gold)}
.dot.live{background:var(--green);box-shadow:0 0 12px #32d6a080}
.dot.bad{background:var(--red)}
.hero{display:flex;justify-content:space-between;align-items:flex-end;gap:18px;margin:16px 0 20px}
.hero h1{font-size:clamp(28px,4.5vw,46px);line-height:1.04;margin:7px 0}
.hero h1 em{font-style:normal;color:var(--gold)}
.hero p{max-width:620px;color:var(--muted);font-size:13px;margin:10px 0 0}
.tabs{display:flex;gap:8px;flex-wrap:wrap;margin:18px 0 14px;padding:7px;border:1px solid var(--line);background:#0b1828;border-radius:14px}
.tab{flex:1;min-width:130px;border:1px solid transparent;background:transparent;color:#b5c6d9;border-radius:10px;padding:12px 15px;font-weight:850}
.tab.active{background:linear-gradient(135deg,#ffe29a,var(--gold));color:#17202a;box-shadow:0 5px 18px #e9bd6420}
.panel{background:linear-gradient(145deg,rgba(19,37,58,.97),rgba(12,24,39,.98));border:1px solid var(--line);border-radius:var(--radius);padding:19px;min-width:0;box-shadow:0 12px 30px #00000018}
.panel h2{font-size:16px;margin:0}
.panel h3{font-size:14px;margin:0}
.panel-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:15px}
.tag{font-size:10px;padding:5px 8px;border:1px solid #344b63;border-radius:8px;color:#c7d7e7;background:#12253a;white-space:nowrap}
.controls{display:flex;align-items:end;gap:9px;flex-wrap:wrap}
.field{display:flex;flex-direction:column;gap:5px;min-width:150px;flex:1}
.field label{color:var(--muted);font-size:11px}
.select,.btn{border:1px solid #30475f;border-radius:10px;background:#0c1a2b;color:var(--text);padding:11px 12px;min-height:42px;width:100%;font-size:12px}
.btn-primary{background:linear-gradient(135deg,#ffe29a,var(--gold));border-color:var(--gold);color:#17202a;font-weight:950}
.btn-secondary{background:#152b42}
.btn-blue{background:linear-gradient(135deg,#8bd5ff,#4ca6e8);border-color:#4ca6e8;color:#061a2b;font-weight:900}
.metrics{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:11px;margin-top:13px}
.metric{background:#0b1828;border:1px solid #263a51;border-radius:13px;padding:14px;min-width:0}
.metric small{display:block;color:var(--muted);font-size:10px;text-transform:uppercase;letter-spacing:.7px}
.metric strong{display:block;font-size:clamp(18px,2.5vw,27px);font-weight:900;letter-spacing:-.4px;margin:6px 0 2px;overflow-wrap:anywhere}
.metric .hint{font-size:10px;color:var(--muted)}
.columns{display:grid;grid-template-columns:1.1fr .9fr;gap:13px;margin-top:13px}
.chart{width:100%;height:255px;display:block}
.diagnostics-panel{display:none!important}
.chart-note{color:var(--muted);font-size:11px;margin-top:8px}
.signalbox{border:1px solid #345044;background:linear-gradient(135deg,#102f2b,#102133);border-radius:14px;padding:16px}
.signalbox.wait{border-color:#655332;background:linear-gradient(135deg,#30291c,#182434)}
.signalbox.sell{border-color:#75404e;background:linear-gradient(135deg,#351e2a,#172333)}
.signal-top{display:flex;justify-content:space-between;align-items:center;gap:10px}
.signal-title{font-size:25px;font-weight:950;margin:9px 0 5px}
.green{color:var(--green)}
.red{color:var(--red)}
.gold{color:var(--gold)}
.levels{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-top:14px}
.level{background:#091624;border:1px solid #263a50;border-radius:10px;padding:10px;min-width:0}
.level small{display:block;color:var(--muted);font-size:10px}
.level strong{display:block;margin-top:5px;font-size:14px;overflow-wrap:anywhere}
.meter{height:6px;background:#26394c;border-radius:99px;overflow:hidden;margin:8px 0}
.meter i{height:100%;display:block;width:0;background:var(--gold);transition:width .3s}
.note{margin-top:13px;border-left:3px solid var(--gold);border-radius:0 9px 9px 0;background:#192736;padding:11px 13px;color:#b8c8d7;font-size:11px}
.diagnostics{white-space:pre-wrap;overflow-wrap:anywhere;max-height:160px;overflow:auto;background:#081321;border:1px solid #22374b;border-radius:10px;padding:11px;color:#b8c9da;font-size:11px}
.hidden{display:none!important}
.foot{text-align:center;color:#71869a;font-size:10px;padding:25px 0 8px}
.small{font-size:11px;color:var(--muted)}
.binary-output{margin-top:14px}
.binary-output .signal-title{font-size:30px}
.countdown{font-size:12px;color:var(--gold);font-weight:800}
.market-list-note{font-size:11px;color:var(--muted);margin-top:7px}
@media(max-width:850px){.shell{padding:14px}.hero{align-items:flex-start;flex-direction:column}.columns{grid-template-columns:1fr}.metrics{grid-template-columns:repeat(2,minmax(0,1fr))}.top{align-items:flex-start}.status{max-width:170px}.field{min-width:135px}}
@media(max-width:480px){.shell{padding:11px}.panel{padding:14px}.brand{font-size:17px}.tabs{gap:5px}.tab{min-width:calc(50% - 5px);padding:11px 8px;font-size:11px}.metrics{gap:8px}.metric{padding:11px}.metric strong{font-size:20px}.levels{grid-template-columns:1fr}.controls .field{min-width:100%;flex-basis:100%}.chart{height:220px}}
</style>
</head>
<body>
<main class="shell">
<header class="top">
  <div><div class="brand">TRADING<span>FLOOR AI</span></div><div class="sub">Market intelligence terminal · Public market data · Signal workspace</div></div>
  <div class="status"><span id="statusDot" class="dot"></span><span id="globalStatus">READY</span></div>
</header>
<section class="hero">
  <div><div class="eyebrow">GoldTracker-inspired workspace</div><h1>Trade the setup.<br><em>Not the noise.</em></h1><p>Three market workspaces in one responsive dashboard. Signals are rule-based technical readings from public market data; they are not guaranteed outcomes or a promise of broker execution.</p></div>
</section>
<nav class="tabs" aria-label="Market sections">
  <button class="tab active" data-section="forex">◈ Forex & Metals</button>
  <button class="tab" data-section="binary">◎ Binary Intelligence</button>
  <button class="tab" data-section="deriv">✦ Deriv Synthetics</button>
</nav>
<!-- FOREX / METALS -->
<section id="section-forex" class="workspace">
  <div class="panel">
    <div class="panel-head"><div><h2>Forex & Metals Signal Generator</h2><div class="small">Original BiQuote feed · currency pairs and metals when supplied by the feed</div></div><span class="tag">FOREX BOT</span></div>
    <div class="controls">
      <div class="field"><label for="forexMarket">Available pair / instrument</label><select id="forexMarket" class="select"><option value="">Loading pairs…</option></select></div>
      <div class="field"><label for="forexTF">Analysis timeframe</label><select id="forexTF" class="select"><option value="1m">1 minute</option><option value="5m">5 minutes</option><option value="15m" selected>15 minutes</option><option value="30m">30 minutes</option><option value="1h">1 hour</option><option value="4h">4 hours</option><option value="1d">1 day</option></select></div>
      <button id="forexGenerate" class="btn btn-primary" style="max-width:220px">✦ Generate Signal</button>
      <button id="forexRefresh" class="btn btn-secondary" style="max-width:150px">Refresh pairs</button>
    </div>
    <div class="metrics">
      <div class="metric"><small>Latest price</small><strong id="forexPrice">—</strong><div class="hint" id="forexPriceHint">Waiting for feed</div></div>
      <div class="metric"><small>Market bias</small><strong id="forexBias">WAIT</strong><div class="hint">Rule-based analysis</div></div>
      <div class="metric"><small>Confluence score</small><strong id="forexScore">—</strong><div class="meter"><i id="forexMeter"></i></div><div class="hint">Not a win probability</div></div>
      <div class="metric"><small>Candles loaded</small><strong id="forexCandles">—</strong><div class="hint" id="forexUpdated">Not updated</div></div>
    </div>
  </div>
  <div class="columns">
    <article class="panel"><div class="panel-head"><h2>Price action</h2><span class="tag" id="forexSymbolTag">Pair · timeframe</span></div><canvas id="forexChart" class="chart" aria-label="Forex price chart"></canvas><div class="chart-note" id="forexChartNote">Load market candles to display price movement.</div></article>
    <article class="panel"><div class="panel-head"><h2>Generated setup</h2><span class="tag" id="forexSignalTime">Not generated</span></div>
      <div id="forexSignalBox" class="signalbox wait"><div class="signal-top"><span class="tag">FOREX SIGNAL</span><span id="forexRR" class="small">Risk plan pending</span></div><div id="forexSignal" class="signal-title gold">WAIT</div><div id="forexReason" class="small">Select an instrument and generate a signal.</div>
      <div class="levels"><div class="level"><small>Entry reference</small><strong id="forexEntry">—</strong></div><div class="level"><small>Stop loss</small><strong id="forexSL">—</strong></div><div class="level"><small>Take profit</small><strong id="forexTP">—</strong></div></div></div>
      <div class="note" id="forexFeedNote">Live candles are loaded from the official public BiQuote REST API. If the feed is unavailable, no fabricated prices or signals are shown.</div>
    </article>
  </div>
  <div class="panel diagnostics-panel" style="margin-top:13px"><div class="panel-head"><h2>Forex feed diagnostics</h2><span class="tag">BiQuote</span></div><pre id="forexDiagnostics" class="diagnostics">Starting Forex feed…</pre></div>
</section>

<!-- BINARY INTELLIGENCE -->
<section id="section-binary" class="workspace hidden">
  <div class="panel">
    <div class="panel-head"><div><h2>Binary Intelligence</h2><div class="small">Crypto pairs sourced from Binance Spot public market data</div></div><span class="tag">CALL / PUT ONLY</span></div>
    <div class="controls">
      <div class="field"><label for="binaryMarket">Available Binance pair</label><select id="binaryMarket" class="select"><option value="BTCUSDT">BTC/USDT</option></select></div>
      <div class="field"><label for="binaryTF">Analysis timeframe</label><select id="binaryTF" class="select"><option value="1m" selected>1 minute</option><option value="3m">3 minutes</option><option value="5m">5 minutes</option><option value="15m">15 minutes</option><option value="30m">30 minutes</option><option value="1h">1 hour</option><option value="4h">4 hours</option><option value="1d">1 day</option></select></div>
      <div class="field"><label for="binaryExpiryDuration">Signal expiry</label><select id="binaryExpiryDuration" class="select"><option value="30">30 seconds</option><option value="60" selected>1 minute</option><option value="120">2 minutes</option><option value="180">3 minutes</option><option value="300">5 minutes</option></select></div>
      <button id="binaryGenerate" class="btn btn-primary" style="max-width:220px">✦ Generate Signal</button>
      <button id="binaryRefreshPairs" class="btn btn-secondary" style="max-width:150px">Refresh pairs</button>
    </div>
    <div class="metrics">
      <div class="metric"><small>Selected pair</small><strong id="binaryPairName">BTC/USDT</strong><div class="hint">Binance Spot</div></div>
      <div class="metric"><small>Latest price</small><strong id="binaryPrice">—</strong><div class="hint" id="binaryPriceHint">Awaiting candles</div></div>
      <div class="metric"><small>Available USDT pairs</small><strong id="binaryPairCount">Loading…</strong><div class="hint">Spot markets marked TRADING</div></div>
      <div class="metric"><small>Signal expires in</small><strong id="binaryCountdown">—</strong><div class="hint" id="binaryExpiryStatus">No active signal</div></div>
    </div>
  </div>
  <div class="columns">
    <article class="panel"><div class="panel-head"><h2>Market movement</h2><span class="tag" id="binarySymbolTag">BTCUSDT · 1m</span></div><canvas id="binaryChart" class="chart" aria-label="Binary crypto price chart"></canvas><div class="chart-note" id="binaryChartNote">Binance candles load when you generate a signal.</div></article>
    <article class="panel"><div class="panel-head"><h2>Binary signal</h2><span class="tag" id="binarySignalTime">Not generated</span></div>
      <div id="binarySignalBox" class="signalbox wait binary-output"><div class="signal-top"><span class="tag" id="binaryExpiryLabel">BINARY EXPIRY</span><span id="binarySignalPill" class="tag">WAIT</span></div><div id="binarySignal" class="signal-title gold">WAIT</div><div id="binaryReason" class="small">Choose a pair, then tap Generate Signal.</div>
      <div class="levels"><div class="level"><small>Option</small><strong id="binaryOption">—</strong></div><div class="level"><small>Confluence score</small><strong id="binaryScore">—</strong></div><div class="level"><small>Expiry</small><strong id="binaryExpiry">—</strong></div></div></div>
      <div class="note">CALL means the rule-based reading favors upward movement; PUT favors downward movement. A WAIT result means the conditions do not align. Binance prices may differ from the price feed used by a binary broker. No outcome is guaranteed.</div>
    </article>
  </div>
  <div class="panel diagnostics-panel" style="margin-top:13px"><div class="panel-head"><h2>Binary feed diagnostics</h2><span class="tag">Binance public API</span></div><pre id="binaryDiagnostics" class="diagnostics">Loading available markets…</pre></div>
</section>

<!-- DERIV -->
<section id="section-deriv" class="workspace hidden">
  <div class="panel">
    <div class="panel-head"><div><h2>Deriv Synthetic Market Monitor</h2><div class="small">Live ticks and candle history from Deriv's public WebSocket</div></div><span class="tag">VOLATILITY · BOOM · CRASH · MORE</span></div>
    <div class="controls">
      <div class="field"><label for="derivCategory">Market group</label><select id="derivCategory" class="select"><option value="all">All supported synthetic indices</option><option value="volatility">Volatility indices</option><option value="boom">Boom indices</option><option value="crash">Crash indices</option><option value="step">Step indices</option><option value="range">Range Break indices</option><option value="drift">Drift Switch indices</option></select></div>
      <div class="field"><label for="derivMarket">Available market</label><select id="derivMarket" class="select"><option>Connecting…</option></select></div>
      <div class="field"><label for="derivTF">Analysis timeframe</label><select id="derivTF" class="select"><option value="60">1 minute</option><option value="300" selected>5 minutes</option><option value="900">15 minutes</option><option value="1800">30 minutes</option><option value="3600">1 hour</option><option value="14400">4 hours</option></select></div>
      <button id="derivGenerate" class="btn btn-blue" style="max-width:220px">✦ Generate Signal</button>
      <button id="derivRefresh" class="btn btn-secondary" style="max-width:150px">Refresh candles</button>
    </div>
    <div class="metrics">
      <div class="metric"><small>Latest price</small><strong id="derivPrice">—</strong><div class="hint" id="derivLastTick">Waiting for live tick</div></div>
      <div class="metric"><small>Market bias</small><strong id="derivBias">WAIT</strong><div class="hint">Rule-based analysis</div></div>
      <div class="metric"><small>Confluence score</small><strong id="derivScore">—</strong><div class="meter"><i id="derivMeter"></i></div><div class="hint">Not a probability</div></div>
      <div class="metric"><small>Candles loaded</small><strong id="derivCandles">0</strong><div class="hint" id="derivUpdated">Waiting for history</div></div>
    </div>
  </div>
  <div class="columns">
    <article class="panel"><div class="panel-head"><h2>Recent price movement</h2><span class="tag" id="derivSymbolTag">Market · timeframe</span></div><canvas id="derivChart" class="chart" aria-label="Deriv price chart"></canvas><div class="chart-note" id="derivChartNote">Connect to Deriv to load candles.</div></article>
    <article class="panel"><div class="panel-head"><h2>Generated setup</h2><span class="tag" id="derivSignalTime">Not generated</span></div>
      <div id="derivSignalBox" class="signalbox wait"><div class="signal-top"><span class="tag">DERIV SIGNAL</span><span class="tag" id="derivSignalPill">WAIT</span></div><div id="derivSignal" class="signal-title gold">WAIT</div><div id="derivReason" class="small">Select a synthetic index and generate a signal.</div>
      <div class="levels"><div class="level"><small>Entry reference</small><strong id="derivEntry">—</strong></div><div class="level"><small>Stop loss</small><strong id="derivSL">—</strong></div><div class="level"><small>Take profit</small><strong id="derivTP">—</strong></div></div></div>
      <div class="note">Deriv signals use public candle history and simple technical rules. They do not place trades or access your Deriv account.</div>
    </article>
  </div>
  <div class="panel diagnostics-panel" style="margin-top:13px"><div class="panel-head"><h2>Deriv connection diagnostics</h2><span class="tag">Public WebSocket</span></div><pre id="derivDiagnostics" class="diagnostics">Connecting…</pre></div>
</section>

<div class="note">Risk notice: Trading involves substantial risk. Confluence scores represent agreement between simple technical rules, not the probability of a profitable trade. Entry, stop-loss, and take-profit levels are illustrative references only. Binary CALL/PUT signals are not guaranteed predictions. This page does not execute trades.</div>
<footer class="foot">© <span id="copyrightYear">2026</span> Trading Floor LLC. All rights reserved.<br>By Darius Kipchoge · CEO &amp; Founder · WhatsApp: <a href="https://wa.me/254110501210" target="_blank" rel="noopener noreferrer">+254110501210</a></footer>
</main>
<script>
(() => {
'use strict';
const $ = id => document.getElementById(id);
const fmt = (n, max=8) => Number.isFinite(Number(n)) ? Number(n).toLocaleString('en-US',{maximumSignificantDigits:max}) : '—';
const money = n => '$' + fmt(n, 9);
const log = (id, msg) => { const el=$(id); if(el) el.textContent=new Date().toISOString()+'  '+msg+'\n'+el.textContent.slice(0,3600); };
function globalStatus(text, kind=''){ $('globalStatus').textContent=text; $('statusDot').className='dot'+(kind?' '+kind:''); }
document.querySelectorAll('[data-section]').forEach(b=>b.addEventListener('click',()=>{
 document.querySelectorAll('[data-section]').forEach(x=>x.classList.toggle('active',x===b));
 ['forex','binary','deriv'].forEach(s=>$('section-'+s).classList.toggle('hidden',s!==b.dataset.section));
 globalStatus(b.dataset.section.toUpperCase()+' WORKSPACE');
}));

function drawChart(id, candles) {
 const canvas=$(id); if(!canvas) return;
 const rect=canvas.getBoundingClientRect(), dpr=window.devicePixelRatio||1, h=255, w=Math.max(1,rect.width);
 canvas.width=Math.max(1,Math.floor(w*dpr)); canvas.height=Math.floor(h*dpr);
 const ctx=canvas.getContext('2d'); ctx.setTransform(dpr,0,0,dpr,0,0); ctx.clearRect(0,0,w,h);
 ctx.strokeStyle='rgba(147,167,191,.14)';ctx.lineWidth=1;
 for(let i=1;i<=4;i++){ctx.beginPath();ctx.moveTo(0,i*h/5);ctx.lineTo(w,i*h/5);ctx.stroke();}
 const cs=(candles||[]).filter(c=>[c.o,c.h,c.l,c.c].every(v=>Number.isFinite(Number(v)))).slice(-55);
 if(cs.length<2){ctx.fillStyle='#93a7bf';ctx.font='12px system-ui';ctx.fillText('Waiting for candle history…',12,26);return;}
 const hi=Math.max(...cs.map(c=>c.h)),lo=Math.min(...cs.map(c=>c.l)),range=Math.max(hi-lo,1e-12),top=15,bottom=h-18;
 const y=v=>top+(hi-v)/range*(bottom-top),gap=4,slot=(w-18)/cs.length,bw=Math.max(2,Math.min(12,slot-gap));
 cs.forEach((c,i)=>{
  const x=9+i*slot+slot/2,up=c.c>=c.o,color=up?'#20c997':'#ff647c';
  ctx.strokeStyle=color;ctx.lineWidth=1.2;ctx.beginPath();ctx.moveTo(x,y(c.h));ctx.lineTo(x,y(c.l));ctx.stroke();
  const yo=y(c.o),yc=y(c.c),bodyH=Math.max(1.5,Math.abs(yc-yo));
  ctx.fillStyle=color;ctx.fillRect(x-bw/2,Math.min(yo,yc),bw,bodyH);
 });
 ctx.fillStyle='#93a7bf';ctx.font='10px system-ui';ctx.fillText('H '+fmt(hi,7),8,11);ctx.fillText('L '+fmt(lo,7),8,h-4);
}
function ema(vals,p){if(!vals.length)return[];const k=2/(p+1),out=[vals[0]];for(let i=1;i<vals.length;i++)out.push(vals[i]*k+out[i-1]*(1-k));return out;}
function rsi(vals,p=14){if(vals.length<p+1)return 50;let g=0,l=0;for(let i=vals.length-p;i<vals.length;i++){const d=vals[i]-vals[i-1];if(d>0)g+=d;else l-=d;}if(!l)return 100;return 100-100/(1+(g/p)/(l/p));}
function atr(cs,p=14){if(cs.length<2)return 0;const trs=[];for(let i=1;i<cs.length;i++)trs.push(Math.max(cs[i].h-cs[i].l,Math.abs(cs[i].h-cs[i-1].c),Math.abs(cs[i].l-cs[i-1].c)));const a=trs.slice(-p);return a.reduce((s,v)=>s+v,0)/(a.length||1);}
function analyzeCandles(cs){
 if(!Array.isArray(cs)||cs.length<35)return {dir:'WAIT',score:0,why:'Not enough valid candle history to analyze this market.',entry:cs?.length?cs[cs.length-1].c:null,sl:null,tp:null};
 const close=cs.map(c=>c.c),n=close.length,last=cs[n-1],prev=cs[n-2],ef=ema(close.slice(-100),9).at(-1),es=ema(close.slice(-120),21).at(-1),rv=rsi(close),av=atr(cs);
 let bull=0,bear=0,notes=[];
 if(ef>es){bull++;notes.push('fast EMA above slow EMA');}else if(ef<es){bear++;notes.push('fast EMA below slow EMA');}
 if(last.c>ef){bull++;notes.push('price above fast EMA');}else if(last.c<ef){bear++;notes.push('price below fast EMA');}
 if(rv>=52&&rv<72){bull++;notes.push('RSI bullish');}else if(rv<=48&&rv>28){bear++;notes.push('RSI bearish');}
 if(last.c>prev.c){bull++;}else if(last.c<prev.c){bear++;}
 const prior=cs.slice(-21,-1),hi=Math.max(...prior.map(c=>c.h)),lo=Math.min(...prior.map(c=>c.l));
 if(last.c>hi){bull+=2;notes.push('range breakout');}if(last.c<lo){bear+=2;notes.push('range breakdown');}
 const total=Math.max(bull,bear),score=Math.min(100,Math.round(total/6*100));
 const dir=(bull>=4&&bull>=bear+2)?'BUY':(bear>=4&&bear>=bull+2)?'SELL':'WAIT';
 const entry=last.c,sl=dir==='BUY'?entry-1.5*av:dir==='SELL'?entry+1.5*av:null,tp=dir==='BUY'?entry+2.5*av:dir==='SELL'?entry-2.5*av:null;
 return {dir,score,why:notes.join(' · ')||'No strong confluence',entry,sl,tp,atr:av,rsi:rv};
}
function showTrade(prefix, a, price, sourceLabel) {
 $(prefix+'Price').textContent=price==null?'—':fmt(price,9);

 if(prefix==='forex'){
  $('forexBias').textContent=a.dir;
  $('forexScore').textContent=a.score+'%';
  $('forexMeter').style.width=a.score+'%';
  $('forexCandles').textContent=forexState.candles.length;
  $('forexUpdated').textContent='Updated '+new Date().toLocaleTimeString();
  $('forexSymbolTag').textContent=forexState.symbol+' · '+forexState.tf;
  $('forexSignalTime').textContent=new Date().toLocaleTimeString();
  $('forexSignal').textContent=a.dir;
  $('forexSignal').className='signal-title '+(a.dir==='BUY'?'green':a.dir==='SELL'?'red':'gold');
  $('forexSignalBox').className='signalbox '+(a.dir==='SELL'?'sell':a.dir==='WAIT'?'wait':'');
  $('forexReason').textContent=a.why+' · Feed: '+sourceLabel;
  $('forexEntry').textContent=a.entry==null?'—':fmt(a.entry);
  $('forexSL').textContent=a.sl==null?'—':fmt(a.sl);
  $('forexTP').textContent=a.tp==null?'—':fmt(a.tp);
  $('forexRR').textContent=a.sl!=null?'Illustrative 1:1.67 risk/reward':'Risk plan unavailable';
 } else if(prefix==='deriv'){
  $('derivBias').textContent=a.dir;
  $('derivScore').textContent=a.score+'%';
  $('derivMeter').style.width=a.score+'%';
  $('derivCandles').textContent=derivState.candles.length;
  $('derivUpdated').textContent='Updated '+new Date().toLocaleTimeString();
  $('derivSymbolTag').textContent=derivState.symbol+' · '+$('derivTF').selectedOptions[0].textContent;
  $('derivSignalTime').textContent=new Date().toLocaleTimeString();
  $('derivSignal').textContent=a.dir;
  $('derivSignal').className='signal-title '+(a.dir==='BUY'?'green':a.dir==='SELL'?'red':'gold');
  $('derivSignalBox').className='signalbox '+(a.dir==='SELL'?'sell':a.dir==='WAIT'?'wait':'');
  $('derivSignalPill').textContent=a.dir;
  $('derivReason').textContent=a.why;
  $('derivEntry').textContent=a.entry==null?'—':fmt(a.entry);
  $('derivSL').textContent=a.sl==null?'—':fmt(a.sl);
  $('derivTP').textContent=a.tp==null?'—':fmt(a.tp);
 }
}

async function getJson(url, timeout=15000){
 const controller=new AbortController();
 const timer=setTimeout(()=>controller.abort(),timeout);

 try{
  const response=await fetch(url,{
   cache:'no-store',
   signal:controller.signal,
   headers:{'Accept':'application/json'}
  });

  if(!response.ok){
   throw Error('HTTP '+response.status+' from '+new URL(url).host);
  }

  return await response.json();
 }catch(error){
  if(error.name==='AbortError'){
   throw Error('Request timed out. Check your internet connection or whether the feed is responding.');
  }
  throw error;
 }finally{
  clearTimeout(timer);
 }
}

/* Convert BiQuote and other candle formats into one consistent format. */
function normalizeCandles(raw){
 let rows=Array.isArray(raw)
  ?raw
  :(raw?.bars||raw?.candles||raw?.data||raw?.ohlc||raw?.results||raw?.history||[]);

 if(rows&&!Array.isArray(rows)&&typeof rows==='object'){
  rows=Object.values(rows);
 }
 if(!Array.isArray(rows))return [];

 return rows.map(c=>{
  if(Array.isArray(c)){
   const rawTime=c[0];
   let t=typeof rawTime==='string'&&!/^\d+(\.\d+)?$/.test(rawTime)
    ?Date.parse(rawTime):Number(rawTime);
   if(Number.isFinite(t)&&t>0&&t<1e12)t*=1000;

   return {t,o:Number(c[1]),h:Number(c[2]),l:Number(c[3]),c:Number(c[4])};
  }

  const rawTime=c.openTime??c.t??c.time??c.timestamp??c.epoch??c.open_time;
  let t=typeof rawTime==='string'&&!/^\d+(\.\d+)?$/.test(rawTime)
   ?Date.parse(rawTime):Number(rawTime);

  if(Number.isFinite(t)&&t>0&&t<1e12)t*=1000;

  return {
   t,
   o:Number(c.o??c.open),
   h:Number(c.h??c.high),
   l:Number(c.l??c.low),
   c:Number(c.c??c.close??c.price),
   isOpen:c.isOpen===true
  };
 }).filter(c=>
  !c.isOpen&&
  [c.o,c.h,c.l,c.c].every(Number.isFinite)&&
  c.o>0&&c.h>0&&c.l>0&&c.c>0&&
  c.h>=c.l
 ).sort((a,b)=>(a.t||0)-(b.t||0));
}

/* FOREX / METALS — BiQuote public OHLC API */
const forexState={
 symbols:[],
 symbol:'',
 tf:'15m',
 candles:[],
 price:null
};

const BIQUOTE='https://biquote.io/api';

const COMMON_FOREX_ORDER=[
 'EURUSD','GBPUSD','USDJPY','USDCHF','USDCAD','AUDUSD','NZDUSD',
 'EURGBP','EURJPY','GBPJPY','EURCHF','EURAUD','EURCAD','EURNZD',
 'GBPCHF','GBPAUD','GBPCAD','GBPNZD','AUDJPY','AUDCAD','AUDCHF',
 'AUDNZD','CADJPY','CADCHF','CHFJPY','NZDJPY','NZDCAD','NZDCHF'
];

const COMMON_METALS_ORDER=['XAUUSD','XAGUSD','XPTUSD','XPDUSD'];

const METAL_NAMES={
 XAUUSD:'Gold (XAU/USD)',
 XAGUSD:'Silver (XAG/USD)',
 XPTUSD:'Platinum (XPT/USD)',
 XPDUSD:'Palladium (XPD/USD)'
};

function symbolName(item){
 if(typeof item==='string')return item.toUpperCase();
 return String(
  item?.symbol??item?.pair??item?.name??item?.instrument??item?.ticker??''
 ).toUpperCase().replace('/','').replace('_','').replace('-','');
}

function renderForexPairs(symbols){
 const select=$('forexMarket');
 const previous=forexState.symbol||select.value;
 select.innerHTML='';

 const forexGroup=document.createElement('optgroup');
 forexGroup.label='Common Forex pairs';

 const metalsGroup=document.createElement('optgroup');
 metalsGroup.label='Precious metals';

 symbols.forEach(symbol=>{
  const option=document.createElement('option');
  option.value=symbol;
  option.textContent=METAL_NAMES[symbol]||(
   COMMON_METALS_ORDER.includes(symbol)
    ?symbol
    :symbol.slice(0,3)+'/'+symbol.slice(3)
  );

  (COMMON_METALS_ORDER.includes(symbol)?metalsGroup:forexGroup)
   .appendChild(option);
 });

 if(forexGroup.children.length)select.appendChild(forexGroup);
 if(metalsGroup.children.length)select.appendChild(metalsGroup);

 forexState.symbols=symbols;
 forexState.symbol=symbols.includes(previous)
  ?previous
  :(symbols.includes('EURUSD')?'EURUSD':symbols[0]||'');

 select.value=forexState.symbol;

 if(forexState.symbol){
  $('forexFeedNote').textContent=
   'BiQuote market selected. Live OHLC data will be checked when you generate a signal.';
 }
}

async function loadForexPairs(){
 const refresh=$('forexRefresh');
 refresh.disabled=true;

 try{
  let symbols=[];

  /* Try the active-symbol route first. */
  try{
   const response=await getJson(BIQUOTE+'/active',9000);

   let rows=Array.isArray(response)
    ?response
    :(response?.active||response?.symbols||response?.data||response?.pairs||[]);

   if(rows&&!Array.isArray(rows)&&typeof rows==='object'){
    rows=Object.values(rows);
   }

   if(Array.isArray(rows)){
    const available=new Set(rows.map(symbolName).filter(Boolean));

    symbols=[...COMMON_FOREX_ORDER,...COMMON_METALS_ORDER]
     .filter(symbol=>available.has(symbol));
   }
  }catch(error){
   log('forexDiagnostics','Active-pair list unavailable: '+error.message);
  }

  /*
   * Fallback: keep common pairs selectable if the active list endpoint
   * is unavailable. The OHLC request below must still succeed before
   * a signal is generated.
   */
  if(!symbols.length){
   symbols=[...COMMON_FOREX_ORDER,...COMMON_METALS_ORDER];
  }

  renderForexPairs(symbols);

  $('forexFeedNote').textContent=
   'Pair list ready. Each selected instrument must return valid BiQuote candles before analysis.';

  $('forexDiagnostics').textContent=
   'BiQuote API: '+BIQUOTE+
   '\nPairs listed: '+symbols.length+
   '\nThe OHLC endpoint is checked when you generate a signal.'+
   '\nFallback pairs are not a guarantee that every instrument is supported by the provider.';

  globalStatus('FOREX PAIRS READY','live');

 }catch(error){
  $('forexFeedNote').textContent='Could not prepare the BiQuote pair list: '+error.message;
  globalStatus('BIQUOTE FEED ERROR','bad');
 }finally{
  refresh.disabled=false;
 }
}

async function generateForex(){
 const button=$('forexGenerate');
 button.disabled=true;
 globalStatus('LOADING FOREX…');

 try{
  const symbol=$('forexMarket').value;
  const timeframe=$('forexTF').value;

  if(!symbol){
   throw Error('Choose a Forex pair or metal first.');
  }

  forexState.symbol=symbol;
  forexState.tf=timeframe;

  const url=BIQUOTE+'/'+encodeURIComponent(symbol)+
   '/ohlc?interval='+encodeURIComponent(timeframe)+'&limit=180';

  const response=await getJson(url);
  const candles=normalizeCandles(response?.bars?response.bars:response);

  if(candles.length<35){
   throw Error(
    'BiQuote returned only '+candles.length+
    ' valid closed candles for '+symbol+
    '. This instrument or timeframe may not be supported, or the feed response may have changed.'
   );
  }

  forexState.candles=candles;
  forexState.price=candles[candles.length-1].c;

  const analysis=analyzeCandles(candles);

  showTrade('forex',analysis,forexState.price,'BiQuote');
  drawChart('forexChart',candles);

  $('forexPriceHint').textContent=
   'BiQuote · '+new Date().toLocaleTimeString();

  $('forexChartNote').textContent=
   candles.length+' valid closed candles loaded from BiQuote.';

  $('forexFeedNote').textContent=
   'Connected to the BiQuote OHLC endpoint for '+symbol+
   '. Prices are taken from the returned feed; no prices are fabricated.';

  $('forexDiagnostics').textContent=
   'Status: connected'+
   '\nSymbol: '+symbol+
   '\nTimeframe: '+timeframe+
   '\nValid closed candles: '+candles.length+
   '\nLatest candle close: '+forexState.price+
   '\nEndpoint: '+url;

  globalStatus('BIQUOTE FOREX CONNECTED','live');

 }catch(error){
  $('forexSignal').textContent='WAIT';
  $('forexSignal').className='signal-title gold';
  $('forexSignalBox').className='signalbox wait';
  $('forexReason').textContent='No signal generated: '+error.message;
  $('forexPriceHint').textContent='Feed unavailable';
  $('forexChartNote').textContent='No valid candle history was loaded.';
  $('forexFeedNote').textContent=
   'BiQuote could not provide enough valid candles. Check your connection, selected pair, timeframe, and the public feed response. No signal was fabricated.';
  $('forexDiagnostics').textContent=
   'Status: error'+
   '\nSymbol: '+(forexState.symbol||'none')+
   '\nTimeframe: '+forexState.tf+
   '\nError: '+error.message;

  globalStatus('BIQUOTE FEED ERROR','bad');
 }finally{
  button.disabled=false;
 }
}

$('forexGenerate').addEventListener('click',generateForex);
$('forexRefresh').addEventListener('click',loadForexPairs);
$('forexMarket').addEventListener('change',()=>{
 forexState.symbol=$('forexMarket').value;
});
$('forexTF').addEventListener('change',()=>{
 forexState.tf=$('forexTF').value;
});
/* BINARY: Binance Spot market list and candles */
const binaryState={
 symbols:[],
 candles:[],
 price:null,
 expiresAt:0,
 timer:null
};

const BINANCE='https://api.binance.com/api/v3';

async function loadBinaryPairs(){
 $('binaryRefreshPairs').disabled=true;

 try{
  const data=await getJson(BINANCE+'/exchangeInfo');

  const symbolsRaw=(data.symbols||[])
   .filter(s=>
    s.status==='TRADING'&&
    s.isSpotTradingAllowed&&
    s.quoteAsset==='USDT'&&
    /^[A-Z0-9]+USDT$/.test(s.symbol)
   )
   .map(s=>s.symbol);

  const popular=[
   'BTCUSDT','ETHUSDT','BNBUSDT','SOLUSDT','XRPUSDT','DOGEUSDT',
   'ADAUSDT','TRXUSDT','AVAXUSDT','LINKUSDT','DOTUSDT','LTCUSDT',
   'BCHUSDT','TONUSDT','SHIBUSDT','NEARUSDT','APTUSDT','SUIUSDT',
   'ETCUSDT','ATOMUSDT','XLMUSDT','UNIUSDT','FILUSDT','ICPUSDT',
   'HBARUSDT','VETUSDT','OPUSDT','ARBUSDT','INJUSDT','AAVEUSDT',
   'MKRUSDT','PEPEUSDT','FETUSDT','RENDERUSDT','TAOUSDT','WLDUSDT',
   'SEIUSDT','TIAUSDT','IMXUSDT','GRTUSDT','ALGOUSDT','EOSUSDT',
   'XTZUSDT','CRVUSDT','SANDUSDT','MANAUSDT','AXSUSDT',
   'THETAUSDT','RUNEUSDT','KASUSDT'
  ];

  const symbols=[
   ...popular.filter(s=>symbolsRaw.includes(s)),
   ...symbolsRaw.filter(s=>!popular.includes(s)).sort()
  ];

  if(!symbols.length){
   throw Error('Binance returned no available USDT spot pairs.');
  }

  binaryState.symbols=symbols;

  const select=$('binaryMarket');
  const previous=select.value;
  select.innerHTML='';

  symbols.forEach(symbol=>{
   const option=document.createElement('option');
   option.value=symbol;
   option.textContent=symbol.replace('USDT','/USDT');
   select.appendChild(option);
  });

  select.value=symbols.includes(previous)
   ?previous
   :(symbols.includes('BTCUSDT')?'BTCUSDT':symbols[0]);

  $('binaryPairCount').textContent=symbols.length.toLocaleString();
  $('binaryPairName').textContent=select.value.replace('USDT','/USDT');

  $('binaryDiagnostics').textContent=
   'Binance Spot markets loaded: '+symbols.length+
   '\nSource: '+BINANCE+'/exchangeInfo'+
   '\nPairs shown are markets reported as TRADING, spot-enabled, with USDT quote asset.';

  globalStatus('BINANCE PAIRS LOADED','live');

 }catch(error){
  $('binaryPriceHint').textContent='Binance feed unavailable; retry market loading';
  $('binaryDiagnostics').textContent='Binance error: '+error.message;
  globalStatus('BINANCE FEED ERROR','bad');
 }finally{
  $('binaryRefreshPairs').disabled=false;
 }
}

function updateBinaryCountdown(){
 if(!binaryState.expiresAt){
  $('binaryCountdown').textContent='—';
  return;
 }

 const remain=Math.max(
  0,
  Math.ceil((binaryState.expiresAt-Date.now())/1000)
 );

 $('binaryCountdown').textContent=remain>0?remain+'s':'EXPIRED';

 $('binaryExpiryStatus').textContent=remain>0
  ?'Signal active until expiry'
  :'Signal expired — generate a new one';

 if(remain===0){
  $('binarySignal').textContent='EXPIRED';
  $('binarySignal').className='signal-title gold';
  $('binarySignalPill').textContent='EXPIRED';
  $('binarySignalBox').className='signalbox wait';
  $('binaryReason').textContent=
   'The signal window has ended. Generate a new signal to re-analyze current candles.';
  $('binaryOption').textContent='—';
  binaryState.expiresAt=0;
 }
}

async function generateBinary(){
 const button=$('binaryGenerate');
 button.disabled=true;
 globalStatus('ANALYZING BINANCE…');

 try{
  const symbol=$('binaryMarket').value;
  const timeframe=$('binaryTF').value;

  if(!symbol)throw Error('Choose a Binance pair first.');

  const url=BINANCE+'/klines?symbol='+encodeURIComponent(symbol)+
   '&interval='+encodeURIComponent(timeframe)+'&limit=180';

  const raw=await getJson(url);

  const candles=raw.map(k=>({
   t:Number(k[0]),
   o:Number(k[1]),
   h:Number(k[2]),
   l:Number(k[3]),
   c:Number(k[4]),
   v:Number(k[5])
  })).filter(c=>
   [c.o,c.h,c.l,c.c].every(Number.isFinite)
  );

  if(candles.length<35){
   throw Error('Not enough Binance candles returned.');
  }

  binaryState.candles=candles;
  binaryState.price=candles[candles.length-1].c;

  const analysis=analyzeCandles(candles);
  const callPut=analysis.dir==='BUY'
   ?'CALL'
   :analysis.dir==='SELL'
    ?'PUT'
    :'WAIT';

  const expirySeconds=Number($('binaryExpiryDuration').value)||60;

  $('binaryPairName').textContent=symbol.replace('USDT','/USDT');
  $('binaryPrice').textContent=fmt(binaryState.price,9);
  $('binaryPriceHint').textContent='Binance Spot · '+new Date().toLocaleTimeString();
  $('binarySymbolTag').textContent=symbol+' · '+timeframe.toUpperCase();

  drawChart('binaryChart',candles);

  $('binaryChartNote').textContent=
   candles.length+' candles from Binance Spot public market data.';

  $('binarySignal').textContent=callPut;
  $('binarySignal').className='signal-title '+
   (callPut==='CALL'?'green':callPut==='PUT'?'red':'gold');

  $('binarySignalBox').className='signalbox '+
   (callPut==='PUT'?'sell':callPut==='WAIT'?'wait':'');

  $('binarySignalPill').textContent=callPut;
  $('binaryOption').textContent=callPut==='WAIT'?'No option':callPut;
  $('binaryScore').textContent=analysis.score+'%';

  $('binaryExpiry').textContent=expirySeconds>=60
   ?(expirySeconds/60)+' min'
   :expirySeconds+' sec';

  $('binaryExpiryLabel').textContent=
   'EXPIRY · '+$('binaryExpiryDuration').selectedOptions[0].textContent.toUpperCase();

  $('binarySignalTime').textContent=new Date().toLocaleTimeString();

  $('binaryReason').textContent=callPut==='WAIT'
   ?'No clear directional confluence; no CALL/PUT recommendation generated.'
   :'Directional technical confluence favors '+callPut+
    '. The score measures indicator agreement, not a win probability.';

  binaryState.expiresAt=Date.now()+expirySeconds*1000;
  updateBinaryCountdown();

  globalStatus('BINARY ANALYSIS COMPLETE','live');

 }catch(error){
  $('binarySignal').textContent='WAIT';
  $('binarySignal').className='signal-title gold';
  $('binarySignalPill').textContent='FEED ERROR';
  $('binarySignalBox').className='signalbox wait';
  $('binaryReason').textContent='No signal generated: '+error.message;
  $('binaryOption').textContent='—';
  $('binaryScore').textContent='—';
  $('binaryExpiry').textContent='—';
  globalStatus('BINANCE FEED ERROR','bad');
 }finally{
  button.disabled=false;
 }
}

$('binaryGenerate').addEventListener('click',generateBinary);
$('binaryRefreshPairs').addEventListener('click',loadBinaryPairs);

$('binaryMarket').addEventListener('change',()=>{
 $('binaryPairName').textContent=$('binaryMarket').value.replace('USDT','/USDT');
 binaryState.expiresAt=0;
});

setInterval(updateBinaryCountdown,1000);
/* DERIV: public WebSocket and dynamically discovered synthetic markets */
const DERIV_ENDPOINT='wss://api.derivws.com/trading/v1/options/ws/public';

const derivState={
 ws:null,
 connected:false,
 symbols:[],
 symbol:'',
 candles:[],
 price:null,
 tickSub:null,
 reconnect:null,
 historyReq:null,
 req:100
};

function derivLog(message){
 log('derivDiagnostics',message);
}

function derivSend(data){
 if(!derivState.ws||derivState.ws.readyState!==WebSocket.OPEN){
  return false;
 }

 derivState.ws.send(JSON.stringify(data));
 return true;
}

function derivCategory(item){
 const text=(
  (item.display_name||item.underlying_symbol_name||'')+' '+
  (item.symbol||item.underlying_symbol||'')+' '+
  (item.market_display_name||'')+' '+
  (item.submarket_display_name||'')
 ).toLowerCase();

 if(text.includes('drift switch')||text.includes('drift-switch'))return'drift';
 if(text.includes('range break')||text.includes('range-break'))return'range';
 if(text.includes('boom'))return'boom';
 if(text.includes('crash'))return'crash';
 if(text.includes('step'))return'step';

 if(
  text.includes('volatility')||
  /^(1hz|2hz|3hz|5hz|10hz|25hz|50hz|75hz|90hz|100hz)/.test(
   (item.symbol||item.underlying_symbol||'').toLowerCase()
  )
 ){
  return'volatility';
 }

 return'other';
}

function derivSym(item){
 return item.underlying_symbol||item.symbol||'';
}

function derivName(item){
 return item.underlying_symbol_name||item.display_name||derivSym(item);
}

function derivConnect(){
 if(
  derivState.ws&&
  (
   derivState.ws.readyState===WebSocket.OPEN||
   derivState.ws.readyState===WebSocket.CONNECTING
  )
 ){
  return;
 }

 try{
  derivState.ws=new WebSocket(DERIV_ENDPOINT);
 }catch(error){
  derivLog('WebSocket error: '+error.message);
  derivState.reconnect=setTimeout(derivConnect,5000);
  return;
 }

 derivState.ws.onopen=()=>{
  derivState.connected=true;
  globalStatus('DERIV CONNECTED','live');
  derivSend({active_symbols:'brief',req_id:1});
  derivLog('Connected to Deriv public WebSocket.');
 };

 derivState.ws.onmessage=event=>{
  let data;

  try{
   data=JSON.parse(event.data);
  }catch{
   return;
  }

  if(data.error){
   derivLog('Deriv API error: '+(data.error.message||'Unknown error'));
   return;
  }

  if(data.msg_type==='active_symbols'){
   const raw=Array.isArray(data.active_symbols)
    ?data.active_symbols
    :[];

   derivState.symbols=raw
    .filter(item=>derivCategory(item)!=='other')
    .map(item=>({
     symbol:derivSym(item),
     name:derivName(item),
     category:derivCategory(item)
    }))
    .filter(item=>item.symbol);

   renderDerivSymbols();
   derivLog('Available supported synthetic markets: '+derivState.symbols.length);
   return;
  }

  if(data.msg_type==='tick'&&data.tick){
   if(data.tick.symbol!==derivState.symbol)return;

   derivState.price=Number(data.tick.quote);

   $('derivPrice').textContent=fmt(derivState.price,10);
   $('derivLastTick').textContent=
    'Tick '+new Date(Number(data.tick.epoch)*1000).toLocaleTimeString();

   if(data.subscription?.id){
    derivState.tickSub=data.subscription.id;
   }

   return;
  }

  if(
   (data.msg_type==='history'||data.msg_type==='candles')&&
   (data.candles||data.history)
  ){
   if(
    derivState.historyReq!==null&&
    data.req_id!==derivState.historyReq
   ){
    return;
   }

   const raw=data.candles||data.history||[];

   derivState.candles=raw.map(candle=>({
    t:Number(candle.epoch??candle.time),
    o:Number(candle.open),
    h:Number(candle.high),
    l:Number(candle.low),
    c:Number(candle.close)
   }))
   .filter(candle=>
    [candle.o,candle.h,candle.l,candle.c].every(Number.isFinite)
   )
   .sort((a,b)=>(a.t||0)-(b.t||0));

   $('derivCandles').textContent=derivState.candles.length;
   $('derivUpdated').textContent='Updated '+new Date().toLocaleTimeString();
   $('derivChartNote').textContent=
    derivState.candles.length+' candles received from Deriv.';

   drawChart('derivChart',derivState.candles);

   derivLog('Received '+derivState.candles.length+' Deriv candles.');
  }
 };

 derivState.ws.onerror=()=>{
  globalStatus('DERIV CONNECTION ERROR','bad');
  derivLog('WebSocket connection error.');
 };

 derivState.ws.onclose=()=>{
  derivState.connected=false;
  derivState.tickSub=null;
  globalStatus('DERIV RECONNECTING','bad');
  derivLog('Connection closed. Attempting to reconnect.');
  derivState.reconnect=setTimeout(derivConnect,5000);
 };
}

function renderDerivSymbols(){
 const category=$('derivCategory').value;

 const list=derivState.symbols.filter(item=>
  category==='all'||item.category===category
 );

 const select=$('derivMarket');
 const previous=select.value;

 select.innerHTML='';

 list.sort((a,b)=>a.name.localeCompare(b.name)).forEach(item=>{
  const option=document.createElement('option');
  option.value=item.symbol;
  option.textContent=item.name+' ('+item.symbol+')';
  select.appendChild(option);
 });

 if(!list.length){
  select.innerHTML='<option value="">No markets in this group</option>';
  derivState.symbol='';
  return;
 }

 select.value=list.some(item=>item.symbol===previous)
  ?previous
  :list[0].symbol;

 selectDerivMarket();
}

function selectDerivMarket(){
 if(derivState.tickSub){
  derivSend({forget:derivState.tickSub});
 }

 derivState.tickSub=null;
 derivState.symbol=$('derivMarket').value;
 derivState.candles=[];
 derivState.price=null;

 $('derivPrice').textContent='—';
 $('derivCandles').textContent='0';
 $('derivBias').textContent='WAIT';
 $('derivScore').textContent='—';
 $('derivMeter').style.width='0%';

 drawChart('derivChart',[]);

 if(!derivState.symbol||!derivState.connected)return;

 derivSend({
  ticks:derivState.symbol,
  subscribe:1,
  req_id:++derivState.req
 });

 requestDerivCandles();
}

function requestDerivCandles(){
 if(!derivState.symbol||!derivState.connected)return;

 const id=++derivState.req;
 derivState.historyReq=id;

 derivSend({
  ticks_history:derivState.symbol,
  style:'candles',
  granularity:Number($('derivTF').value),
  count:250,
  end:'latest',
  req_id:id
 });

 $('derivSymbolTag').textContent=
  derivState.symbol+' · '+$('derivTF').selectedOptions[0].textContent;
}

function generateDeriv(){
 if(derivState.candles.length<35){
  $('derivReason').textContent=
   'Not enough candle history yet. Refresh candles or select another available index.';
  globalStatus('DERIV WAITING FOR CANDLES');
  return;
 }

 const analysis=analyzeCandles(derivState.candles);

 const price=Number.isFinite(derivState.price)
  ?derivState.price
  :analysis.entry;

 showTrade('deriv',analysis,price,'Deriv public feed');

 $('derivReason').textContent=analysis.why+' · '+derivState.symbol;

 $('derivChartNote').textContent=
  'Generated '+new Date().toLocaleTimeString()+
  ' · '+derivState.candles.length+' candles analyzed.';

 globalStatus('DERIV ANALYSIS COMPLETE','live');
}

$('derivCategory').addEventListener('change',renderDerivSymbols);
$('derivMarket').addEventListener('change',selectDerivMarket);
$('derivTF').addEventListener('change',requestDerivCandles);
$('derivRefresh').addEventListener('click',requestDerivCandles);
$('derivGenerate').addEventListener('click',generateDeriv);
/* INITIALIZE DASHBOARD */
$('copyrightYear').textContent=new Date().getFullYear();

loadForexPairs();
loadBinaryPairs();
derivConnect();

window.addEventListener('resize',()=>{
 drawChart('forexChart',forexState.candles);
 drawChart('binaryChart',binaryState.candles);
 drawChart('derivChart',derivState.candles);
});

})();
</script>
</body>
</html>
