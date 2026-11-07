
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>TradingFloor AI | Binary Intelligence</title>
<style>
#tf-binary{
--bg:#07111f;--panel:#0e1d30;--panel2:#12263d;
--line:#203b59;--blue:#168cff;--cyan:#36c5ff;
--green:#19d69b;--red:#ff5575;--muted:#91a8c2;
color:#eaf3ff;background:var(--bg);
font-family:Arial,Helvetica,sans-serif;
padding:16px;border-radius:14px;width:100%;
box-sizing:border-box;
}
#tf-binary *{box-sizing:border-box}
#tf-binary .tf-wrap{max-width:1100px;margin:auto}
#tf-binary .tf-header{
display:flex;justify-content:space-between;align-items:center;
gap:12px;flex-wrap:wrap;margin-bottom:18px
}
#tf-binary .tf-brand{font-weight:900;font-size:21px;letter-spacing:1px}
#tf-binary .tf-brand span{color:var(--cyan)}
#tf-binary .tf-sub{font-size:11px;color:var(--muted);margin-top:5px}
#tf-binary .tf-status{
font-size:11px;padding:8px 12px;border-radius:20px;
background:#132b43;color:var(--cyan);border:1px solid var(--line)
}
#tf-binary .tf-panel{
background:var(--panel);border:1px solid var(--line);
border-radius:13px;padding:15px;margin-bottom:14px;
}
#tf-binary .tf-title{font-size:15px;font-weight:800;margin:0 0 13px}
#tf-binary .tf-grid{
display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:11px
}
#tf-binary label{
display:block;color:var(--muted);font-size:11px;margin-bottom:6px
}
#tf-binary input,#tf-binary select{
width:100%;min-width:0;background:#071525;color:white;
border:1px solid #294664;border-radius:8px;
padding:11px;font-size:13px;outline:none
}
#tf-binary input:focus,#tf-binary select:focus{border-color:var(--blue)}
#tf-binary button{
border:0;border-radius:8px;padding:12px 16px;
font-size:12px;font-weight:800;cursor:pointer;
background:var(--blue);color:white;
}
#tf-binary button:disabled{opacity:.5;cursor:wait}
#tf-binary .tf-secondary{background:#25415f}
#tf-binary .tf-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:13px}
#tf-binary .tf-signal{
text-align:center;padding:22px 12px;
border:1px solid var(--line);border-radius:12px;
background:linear-gradient(145deg,#10243a,#091726);
}
#tf-binary .tf-signal-name{
font-size:35px;font-weight:900;letter-spacing:2px;margin:7px 0
}
#tf-binary .tf-wait{color:#ffc45c}
#tf-binary .tf-call{color:var(--green)}
#tf-binary .tf-put{color:var(--red)}
#tf-binary .tf-score{font-size:13px;color:var(--muted)}
#tf-binary .tf-metrics{
display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:9px
}
#tf-binary .tf-metric{
background:var(--panel2);border:1px solid var(--line);
border-radius:10px;padding:12px;min-width:0
}
#tf-binary .tf-metric small{
display:block;color:var(--muted);font-size:10px;margin-bottom:8px
}
#tf-binary .tf-metric strong{
font-size:16px;overflow-wrap:anywhere
}
#tf-binary .tf-votes{display:grid;gap:9px}
#tf-binary .tf-vote{
display:flex;justify-content:space-between;gap:10px;
align-items:center;background:var(--panel2);
border:1px solid var(--line);border-radius:8px;
padding:11px;font-size:12px
}
#tf-binary .tf-up{color:var(--green);font-weight:bold}
#tf-binary .tf-down{color:var(--red);font-weight:bold}
#tf-binary .tf-neutral{color:#ffc45c;font-weight:bold}
#tf-binary .tf-bar{
height:8px;background:#263b53;border-radius:10px;overflow:hidden;margin-top:10px
}
#tf-binary .tf-bar-fill{
height:100%;width:0;background:var(--blue);transition:width .3s
}
#tf-binary .tf-chart{
width:100%;height:190px;display:block;
background:#081727;border-radius:9px
}
#tf-binary .tf-message{
font-size:12px;color:var(--muted);line-height:1.6;overflow-wrap:anywhere
}
#tf-binary .tf-error{color:#ff8797}
#tf-binary .tf-good{color:var(--green)}
#tf-binary .tf-foot{
font-size:10px;color:var(--muted);line-height:1.6;margin-top:12px
}
@media(max-width:650px){
#tf-binary{padding:10px}
#tf-binary .tf-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
#tf-binary .tf-metrics{grid-template-columns:repeat(2,minmax(0,1fr))}
#tf-binary .tf-signal-name{font-size:30px}
}
</style>
</head>
<body style="margin:0;background:#07111f">

<section id="tf-binary">
<div class="tf-wrap">

<header class="tf-header">
<div>
<div class="tf-brand">TRADINGFLOOR <span>AI</span></div>
<div class="tf-sub">BINARY INTELLIGENCE · QUOTEX MARKET FEED</div>
</div>
<div class="tf-status" id="tf-connection">● READY</div>
</header>

<div class="tf-panel">
<h3 class="tf-title">Market Configuration</h3>
<div class="tf-grid">
<div>
<label>Market Category</label>
<select id="tf-category">
<option value="otc">OTC Forex</option>
<option value="live">Regular Forex</option>
<option value="crypto">Crypto OTC</option>
<option value="metals">Metals OTC</option>
</select>
</div>
<div>
<label>Currency Pair</label>
<select id="tf-pair">
<option>EURUSD_otc</option>
<option>GBPUSD_otc</option>
<option>USDJPY_otc</option>
<option>AUDUSD_otc</option>
<option>USDCAD_otc</option>
<option>USDCHF_otc</option>
<option>NZDUSD_otc</option>
<option>EURGBP_otc</option>
<option>EURJPY_otc</option>
<option>GBPJPY_otc</option>
<option>AUDJPY_otc</option>
<option>EURCHF_otc</option>
<option>EURCAD_otc</option>
<option>EURAUD_otc</option>
<option>GBPAUD_otc</option>
<option>GBPCAD_otc</option>
<option>GBPCHF_otc</option>
<option>AUDCHF_otc</option>
<option>AUDCAD_otc</option>
<option>AUDNZD_otc</option>
<option>NZDJPY_otc</option>
<option>NZDCHF_otc</option>
<option>CADJPY_otc</option>
<option>CHFJPY_otc</option>
<option>USDMXN_otc</option>
<option>USDZAR_otc</option>
<option>USDINR_otc</option>
<option>USDPKR_otc</option>
<option>USDNGN_otc</option>
<option>USDIDR_otc</option>
<option>USDPHP_otc</option>
<option>USDBDT_otc</option>
<option>USDARS_otc</option>
<option>USDCOP_otc</option>
<option>USDEGP_otc</option>
<option>USDDZD_otc</option>
<option>BRLUSD_otc</option>
</select>
</div>
<div>
<label>Timeframe</label>
<select id="tf-timeframe">
<option value="60">1 Minute</option>
<option value="300">5 Minutes</option>
<option value="900">15 Minutes</option>
<option value="1800">30 Minutes</option>
<option value="3600">1 Hour</option>
</select>
</div>
<div>
<label>Custom Pair (Optional)</label>
<input id="tf-custom" placeholder="Enter symbol">
</div>
</div>
<div class="tf-actions">
<button id="tf-generate">GENERATE SIGNAL</button>
<button class="tf-secondary" id="tf-refresh">REFRESH DATA</button>
<button class="tf-secondary" id="tf-auto">AUTO: OFF</button>
</div>
<p class="tf-message" id="tf-message">Ready. Select a pair and generate a signal.</p>
</div>

<div class="tf-panel">
<h3 class="tf-title">AI Signal Decision</h3>
<div class="tf-signal">
<div class="tf-sub">CURRENT MARKET DIRECTION</div>
<div class="tf-signal-name tf-wait" id="tf-signal">WAIT</div>
<div class="tf-score" id="tf-confidence">Waiting for market data · 0/6 votes</div>
<div class="tf-bar"><div class="tf-bar-fill" id="tf-scorebar"></div></div>
<p class="tf-message" id="tf-reason">No confirmed setup yet.</p>
</div>
</div>

<div class="tf-panel">
<h3 class="tf-title">Live Market Metrics</h3>
<div class="tf-metrics">
<div class="tf-metric"><small>LATEST PRICE</small><strong id="tf-price">--</strong></div>
<div class="tf-metric"><small>RSI (14)</small><strong id="tf-rsi">--</strong></div>
<div class="tf-metric"><small>SMA (14)</small><strong id="tf-sma">--</strong></div>
<div class="tf-metric"><small>MACD</small><strong id="tf-macd">--</strong></div>
<div class="tf-metric"><small>SUPPORT</small><strong id="tf-support">--</strong></div>
<div class="tf-metric"><small>RESISTANCE</small><strong id="tf-resistance">--</strong></div>
<div class="tf-metric"><small>MARKET TREND</small><strong id="tf-trend">--</strong></div>
<div class="tf-metric"><small>DATA CANDLES</small><strong id="tf-count">--</strong></div>
</div>
</div>

<div class="tf-panel">
<h3 class="tf-title">Market Structure Chart</h3>
<canvas id="tf-chart" class="tf-chart"></canvas>
<p class="tf-message">Chart uses the candle data returned by the selected feed.</p>
</div>

<div class="tf-panel">
<h3 class="tf-title">Six-Method Confluence Engine</h3>
<div class="tf-votes" id="tf-votes">
<div class="tf-vote"><span>Trend and SMA analysis</span><b>WAIT</b></div>
<div class="tf-vote"><span>RSI momentum</span><b>WAIT</b></div>
<div class="tf-vote"><span>MACD momentum</span><b>WAIT</b></div>
<div class="tf-vote"><span>Support and resistance</span><b>WAIT</b></div>
<div class="tf-vote"><span>Breakout analysis</span><b>WAIT</b></div>
<div class="tf-vote"><span>Candlestick patterns</span><b>WAIT</b></div>
</div>
</div>

<div class="tf-panel">
<h3 class="tf-title">Signal Journal</h3>
<div id="tf-journal" class="tf-message">No signals generated yet.</div>
</div>

<p class="tf-foot">
DATA SOURCE: CB TRADERS BD QUOTEX CANDLES ENDPOINT THROUGH CORS PROXY.
CALL / PUT / WAIT ARE ANALYTICAL OUTPUTS, NOT GUARANTEED RESULTS.
OTC SYMBOL AVAILABILITY AND TIMEFRAME SUPPORT DEPEND ON THE DATA PROVIDER.
</p>

</div>
</section>

<script>
(function(){
"use strict";

const ROOT=document.getElementById("tf-binary");
if(!ROOT || ROOT.dataset.initialized==="yes")return;
ROOT.dataset.initialized="yes";

const $=id=>document.getElementById("tf-"+id);
const API="https://api1.api.cbtradersbd.com/api/quotex/candles";
const PROXY="https://corsproxy.io/?";
let autoTimer=null;
let lastCandles=[];
let journal=[];
let busy=false;

const otcPairs=[
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

const livePairs=[
"EURUSD","GBPUSD","USDJPY","AUDUSD","USDCAD",
"USDCHF","NZDUSD","EURGBP","EURJPY","GBPJPY",
"AUDJPY","EURCHF","EURCAD","EURAUD","GBPAUD",
"GBPCAD","GBPCHF","AUDCHF","AUDCAD","AUDNZD",
"NZDJPY","NZDCHF","CADJPY","CHFJPY","XAUUSD","XAGUSD"
];

const cryptoPairs=[
"BTCUSD_otc","ETHUSD_otc","LTCUSD_otc","BCHUSD_otc",
"BNBUSD_otc","SOLUSD_otc","XRPUSD_otc","DOGEUSD_otc",
"DOTUSD_otc","ETCUSD_otc"
];

const metalPairs=["XAUUSD_otc","XAGUSD_otc"];

function setStatus(message,error){
 $("connection").textContent=(error?"● ERROR":"● "+message);
 $("connection").style.color=error?"#ff8797":"#36c5ff";
}

function setMessage(message,error){
 $("message").textContent=message;
 $("message").className="tf-message"+(error?" tf-error":"");
}

function selectedPair(){
 return $("custom").value.trim() || $("pair").value;
}

function changeCategory(){
 let category=$("category").value;
 let list=category==="live"?livePairs:
 category==="crypto"?cryptoPairs:
 category==="metals"?metalPairs:otcPairs;
 let select=$("pair");
 let old=select.value;
 select.innerHTML="";
 list.forEach(pair=>{
  let option=document.createElement("option");
  option.value=pair;
  option.textContent=pair;
  select.appendChild(option);
 });
 if(list.includes(old))select.value=old;
 $("custom").value="";
}

$("category").addEventListener("change",changeCategory);

function normalizeCandles(data){
 let rows=data?.candles??data?.data?.candles??data?.data??data?.result??data;
 if(rows && !Array.isArray(rows)){
  if(Array.isArray(rows.items))rows=rows.items;
  else if(Array.isArray(rows.history))rows=rows.history;
  else if(Array.isArray(rows.candles))rows=rows.candles;
 }
 if(!Array.isArray(rows))return [];

 return rows.map(c=>{
  if(Array.isArray(c)){
   return {
    time:Number(c[0]),open:Number(c[1]),
    high:Number(c[2]),low:Number(c[3]),close:Number(c[4])
   };
  }
  return {
   time:Number(c.time??c.timestamp??c.from??c.at??0),
   open:Number(c.open??c.o),
   high:Number(c.high??c.max??c.h),
   low:Number(c.low??c.min??c.l),
   close:Number(c.close??c.price??c.c)
  };
 }).filter(c=>
  Number.isFinite(c.open)&&Number.isFinite(c.high)&&
  Number.isFinite(c.low)&&Number.isFinite(c.close)&&
  c.close>0
 ).sort((a,b)=>a.time-b.time);
}

async function fetchCandles(){
 const pair=selectedPair();
 const target=API+"?symbol="+encodeURIComponent(pair)+"&limit=100";
 const url=PROXY+encodeURIComponent(target);

 const controller=new AbortController();
 const timer=setTimeout(()=>controller.abort(),18000);

 try{
  const response=await fetch(url,{
   method:"GET",
   headers:{"Accept":"application/json"},
   cache:"no-store",
   signal:controller.signal
  });
  const raw=await response.text();
  if(!response.ok){
   throw new Error("HTTP "+response.status+": "+raw.slice(0,500));
  }
  let data;
  try{data=JSON.parse(raw)}
  catch(e){throw new Error("The API returned invalid JSON: "+raw.slice(0,300))}
  const candles=normalizeCandles(data);
  if(candles.length<30){
   throw new Error("Only "+candles.length+
    " valid candles received. At least 30 are needed for analysis.");
  }
  return candles;
 }finally{
  clearTimeout(timer);
 }
}

function average(values){
 return values.reduce((a,b)=>a+b,0)/values.length;
}

function sma(values,period){
 if(values.length<period)return null;
 return average(values.slice(-period));
}

function calculateRSI(values,period=14){
 if(values.length<=period)return null;
 let gains=0,losses=0;
 for(let i=values.length-period;i<values.length;i++){
  const change=values[i]-values[i-1];
  if(change>0)gains+=change;
  else losses-=change;
 }
 if(losses===0)return 100;
 const rs=(gains/period)/(losses/period);
 return 100-(100/(1+rs));
}

function ema(values,period){
 if(values.length<period)return [];
 let result=[];
 let current=average(values.slice(0,period));
 result.push(current);
 const multiplier=2/(period+1);
 for(let i=period;i<values.length;i++){
  current=(values[i]-current)*multiplier+current;
  result.push(current);
 }
 return result;
}

function calculateMACD(values){
 const fast=ema(values,12);
 const slow=ema(values,26);
 if(!fast.length||!slow.length)return null;
 const macd=[];
 for(let i=0;i<slow.length;i++){
  macd.push(fast[i+14]-slow[i]);
 }
 const signal=ema(macd,9);
 if(!signal.length)return null;
 return {
  line:macd[macd.length-1],
  signal:signal[signal.length-1],
  histogram:macd[macd.length-1]-signal[signal.length-1]
 };
}

function analyze(candles){
 const closes=candles.map(c=>c.close);
 const highs=candles.map(c=>c.high);
 const lows=candles.map(c=>c.low);
 const last=candles[candles.length-1];
 const previous=candles[candles.length-2];

 const ma14=sma(closes,14);
 const ma30=sma(closes,30);
 const rsi=calculateRSI(closes,14);
 const macd=calculateMACD(closes);

 const recentHigh=Math.max(...highs.slice(-20,-1));
 const recentLow=Math.min(...lows.slice(-20,-1));
 const support=Math.min(...lows.slice(-30));
 const resistance=Math.max(...highs.slice(-30));

 let votes=[];
 let trend="NEUTRAL";

 if(last.close>ma14 && ma14>ma30)trend="BULLISH";
 else if(last.close<ma14 && ma14<ma30)trend="BEARISH";

 votes.push({
  name:"Trend and SMA analysis",
  direction:trend==="BULLISH"?"CALL":
   trend==="BEARISH"?"PUT":"WAIT",
  detail:"Price, SMA 14 and SMA 30 alignment"
 });

 let rsiDirection="WAIT";
 if(rsi!==null){
  if(rsi>=52 && rsi<70)rsiDirection="CALL";
  else if(rsi<=48 && rsi>30)rsiDirection="PUT";
 }
 votes.push({
  name:"RSI momentum",
  direction:rsiDirection,
  detail:"RSI "+(rsi===null?"unavailable":rsi.toFixed(2))
 });

 let macdDirection="WAIT";
 if(macd){
  if(macd.histogram>0 && macd.line>macd.signal)macdDirection="CALL";
  if(macd.histogram<0 && macd.line<macd.signal)macdDirection="PUT";
 }
 votes.push({
  name:"MACD momentum",
  direction:macdDirection,
  detail:macd?"MACD histogram "+macd.histogram.toFixed(6):
   "Insufficient MACD history"
 });

 let srDirection="WAIT";
 const range=Math.max(resistance-support,0);
 if(range>0){
  const position=(last.close-support)/range;
  if(position<=0.18 && last.close>previous.close)srDirection="CALL";
  if(position>=0.82 && last.close<previous.close)srDirection="PUT";
 }
 votes.push({
  name:"Support and resistance",
  direction:srDirection,
  detail:"Nearby 30-candle price zones"
 });

 let breakoutDirection="WAIT";
 if(last.close>recentHigh)breakoutDirection="CALL";
 if(last.close<recentLow)breakoutDirection="PUT";
 votes.push({
  name:"Breakout analysis",
  direction:breakoutDirection,
  detail:"Close beyond previous 19-candle range"
 });

 let candleDirection="WAIT";
 const body=Math.abs(last.close-last.open);
 const lowerWick=Math.min(last.open,last.close)-last.low;
 const upperWick=last.high-Math.max(last.open,last.close);

 if(last.close>last.open && lowerWick>body*1.5 &&
    last.close>previous.close)candleDirection="CALL";
 else if(last.close<last.open && upperWick>body*1.5 &&
    last.close<previous.close)candleDirection="PUT";
 else if(last.close>last.open && previous.close<previous.open &&
    last.close>previous.open && last.open<previous.close)
  candleDirection="CALL";
 else if(last.close<last.open && previous.close>previous.open &&
    last.close<previous.open && last.open>previous.close)
  candleDirection="PUT";

 votes.push({
  name:"Candlestick patterns",
  direction:candleDirection,
  detail:"Engulfing and rejection candle checks"
 });

 const calls=votes.filter(v=>v.direction==="CALL").length;
 const puts=votes.filter(v=>v.direction==="PUT").length;

 let signal="WAIT";
 if(calls>=4 && calls-puts>=2)signal="CALL";
 else if(puts>=4 && puts-calls>=2)signal="PUT";

 const score=Math.max(calls,puts);
 const confidence=Math.round(score/6*100);

 return {
  signal,calls,puts,score,confidence,votes,
  price:last.close,rsi,ma14,macd,support,resistance,
  trend,candleCount:candles.length,
  recentHigh,recentLow
 };
}

function fmt(value){
 if(value===null||value===undefined||!Number.isFinite(value))return "--";
 return value.toFixed(value>100?3:5);
}

function renderVotes(votes){
 $("votes").innerHTML="";
 votes.forEach(v=>{
  const row=document.createElement("div");
  row.className="tf-vote";
  const name=document.createElement("span");
  name.textContent=v.name+" · "+v.detail;
  const result=document.createElement("b");
  result.textContent=v.direction;
  result.className=v.direction==="CALL"?"tf-up":
   v.direction==="PUT"?"tf-down":"tf-neutral";
  row.appendChild(name);
  row.appendChild(result);
  $("votes").appendChild(row);
 });
}

function renderChart(candles){
 const canvas=$("chart");
 const rect=canvas.getBoundingClientRect();
 const ratio=window.devicePixelRatio||1;
 canvas.width=Math.max(300,Math.floor(rect.width*ratio));
 canvas.height=Math.floor(190*ratio);
 const ctx=canvas.getContext("2d");
 ctx.scale(ratio,ratio);
 const w=canvas.width/ratio,h=canvas.height/ratio;
 ctx.clearRect(0,0,w,h);

 const data=candles.slice(-45);
 const max=Math.max(...data.map(c=>c.high));
 const min=Math.min(...data.map(c=>c.low));
 const span=max-min||1;
 const pad=12;
 const chartH=h-24;
 const step=(w-pad*2)/data.length;
 const candleW=Math.max(2,step*.58);

 ctx.strokeStyle="#203b59";
 ctx.lineWidth=1;
 for(let i=1;i<4;i++){
  const y=pad+(chartH/4)*i;
  ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke();
 }

 data.forEach((c,i)=>{
  const x=pad+i*step+step/2;
  const y=value=>pad+(max-value)/span*chartH;
  const up=c.close>=c.open;
  ctx.strokeStyle=up?"#19d69b":"#ff5575";
  ctx.fillStyle=ctx.strokeStyle;
  ctx.beginPath();
  ctx.moveTo(x,y(c.high));ctx.lineTo(x,y(c.low));ctx.stroke();
  const top=y(Math.max(c.open,c.close));
  const bottom=y(Math.min(c.open,c.close));
  ctx.fillRect(x-candleW/2,top,candleW,Math.max(1,bottom-top));
 });
}

function render(result,candles){
 const signal=result.signal;
 $("signal").textContent=signal;
 $("signal").className="tf-signal-name "+
  (signal==="CALL"?"tf-call":signal==="PUT"?"tf-put":"tf-wait");

 $("confidence").textContent=
  result.calls+" CALL votes · "+result.puts+
  " PUT votes · "+result.score+"/6 agreement";

 $("scorebar").style.width=result.confidence+"%";
 $("reason").textContent=signal==="WAIT"
  ?"No sufficiently strong agreement. Waiting for a clearer setup."
  :"The analysis engine found "+result.score+
   " aligned votes. Confirm the next candle before acting.";

 $("price").textContent=fmt(result.price);
 $("rsi").textContent=result.rsi===null?"--":result.rsi.toFixed(2);
 $("sma").textContent=fmt(result.ma14);
 $("macd").textContent=result.macd?
  result.macd.histogram.toFixed(6):"--";
 $("support").textContent=fmt(result.support);
 $("resistance").textContent=fmt(result.resistance);
 $("trend").textContent=result.trend;
 $("count").textContent=result.candleCount;

 renderVotes(result.votes);
 renderChart(candles);

 if(signal!=="WAIT"){
  const entry={
   time:new Date().toLocaleTimeString(),
   pair:selectedPair(),
   signal,
   price:result.price,
   score:result.score
  };
  journal.unshift(entry);
  journal=journal.slice(0,20);
  $("journal").innerHTML="";
  journal.forEach(item=>{
   const line=document.createElement("div");
   line.className="tf-vote";
   const left=document.createElement("span");
   left.textContent=item.time+" · "+item.pair;
   const right=document.createElement("b");
   right.textContent=item.signal+" · "+item.score+"/6";
   right.className=item.signal==="CALL"?"tf-up":"tf-down";
   line.appendChild(left);
   line.appendChild(right);
   $("journal").appendChild(line);
  });
 }
}

async function generate(){
 if(busy)return;
 busy=true;
 $("generate").disabled=true;
 $("refresh").disabled=true;
 setStatus("FETCHING");
 setMessage("Requesting market candles for "+selectedPair()+"...");

 try{
  const candles=await fetchCandles();
  lastCandles=candles;
  const result=analyze(candles);
  render(result,candles);
  setStatus("FEED CONNECTED");
  setMessage("Received "+candles.length+
   " candles for "+selectedPair()+". Analysis completed.");
 }catch(error){
  setStatus("FEED ERROR",true);
  setMessage("Feed error: "+error.message,true);
  $("signal").textContent="WAIT";
  $("signal").className="tf-signal-name tf-wait";
  $("confidence").textContent="No valid feed · No signal generated";
  $("reason").textContent="Waiting for valid market data.";
 }finally{
  busy=false;
  $("generate").disabled=false;
  $("refresh").disabled=false;
 }
}

$("generate").addEventListener("click",generate);
$("refresh").addEventListener("click",generate);

$("auto").addEventListener("click",()=>{
 if(autoTimer){
  clearInterval(autoTimer);
  autoTimer=null;
  $("auto").textContent="AUTO: OFF";
  setMessage("Automatic refresh stopped.");
 }else{
  autoTimer=setInterval(generate,30000);
  $("auto").textContent="AUTO: ON";
  generate();
  setMessage("Automatic refresh enabled: every 30 seconds.");
 }
});

window.addEventListener("resize",()=>{
 if(lastCandles.length)renderChart(lastCandles);
});

})();
</script>
</body>
</html>
