<!-- TRADINGFLOOR AI — BINARY INTELLIGENCE SECTION -->
<section class="page" id="page-binary">
  <div class="wrap">

    <div class="heading">
      <small>TRADINGFLOOR AI · QUOTEX INTELLIGENCE</small>
      <h2>Binary Intelligence</h2>
      <p>Live OTC and Forex analysis · Multi-indicator confirmation · CALL / PUT signals</p>
    </div>

    <div class="panel tf-binary">

      <div class="tf-binary-top">
        <div>
          <span class="tf-live-dot"></span>
          <strong>QUOTEX MARKET FEED</strong>
        </div>
        <span id="tfBinaryStatus">CONNECTING</span>
      </div>

      <div class="tf-binary-controls">
        <label>
          MARKET PAIR
          <select id="tfBinaryPair">
            <option value="EURUSD_otc">EUR/USD OTC</option>
            <option value="GBPUSD_otc">GBP/USD OTC</option>
            <option value="USDJPY_otc">USD/JPY OTC</option>
            <option value="AUDUSD_otc">AUD/USD OTC</option>
            <option value="USDCAD_otc">USD/CAD OTC</option>
            <option value="EURGBP_otc">EUR/GBP OTC</option>
            <option value="EURUSD">EUR/USD</option>
            <option value="GBPUSD">GBP/USD</option>
            <option value="USDJPY">USD/JPY</option>
          </select>
        </label>

        <label>
          TIMEFRAME
          <select id="tfBinaryTimeframe">
            <option value="1m">1 MIN</option>
            <option value="5m">5 MIN</option>
            <option value="30m">30 MIN</option>
            <option value="45m">45 MIN</option>
            <option value="1h">1 HOUR</option>
          </select>
        </label>
      </div>

      <div class="tf-binary-price">
        <small>LIVE MARKET PRICE</small>
        <h2 id="tfBinaryPrice">--</h2>
        <span id="tfBinaryChange">Waiting for market data</span>
      </div>

      <div class="tf-binary-signal">
        <small>TRADINGFLOOR AI SIGNAL</small>
        <h1 id="tfBinarySignal">WAIT</h1>
        <p id="tfBinaryReason">Collecting candle data for analysis...</p>
        <div class="tf-binary-meter">
          <div id="tfBinaryMeter"></div>
        </div>
        <span id="tfBinaryConfidence">CONFIDENCE: --</span>
      </div>

      <div class="tf-binary-grid">
        <div>
          <small>RSI (14)</small>
          <strong id="tfBinaryRSI">--</strong>
          <span id="tfBinaryRSIState">WAITING</span>
        </div>
        <div>
          <small>MACD</small>
          <strong id="tfBinaryMACD">--</strong>
          <span id="tfBinaryMACDState">WAITING</span>
        </div>
        <div>
          <small>EMA TREND</small>
          <strong id="tfBinaryEMA">--</strong>
          <span id="tfBinaryEMAState">WAITING</span>
        </div>
        <div>
          <small>MARKET STRUCTURE</small>
          <strong id="tfBinaryStructure">--</strong>
          <span id="tfBinaryStructureState">WAITING</span>
        </div>
        <div>
          <small>SUPPORT</small>
          <strong id="tfBinarySupport">--</strong>
        </div>
        <div>
          <small>RESISTANCE</small>
          <strong id="tfBinaryResistance">--</strong>
        </div>
      </div>

      <div class="tf-binary-checks">
        <h3>CONFLUENCE ANALYSIS</h3>
        <div><span>RSI confirmation</span><b id="tfCheckRSI">WAITING</b></div>
        <div><span>MACD confirmation</span><b id="tfCheckMACD">WAITING</b></div>
        <div><span>EMA trend alignment</span><b id="tfCheckEMA">WAITING</b></div>
        <div><span>Breakout / retest</span><b id="tfCheckBreakout">WAITING</b></div>
        <div><span>Candlestick confirmation</span><b id="tfCheckCandle">WAITING</b></div>
        <div><span>Market structure</span><b id="tfCheckStructure">WAITING</b></div>
      </div>

      <div class="tf-binary-bottom">
        <span>LIVE PAYOUT</span>
        <strong id="tfBinaryPayout">--</strong>
      </div>

      <button type="button" id="tfBinaryRefresh">✦ GENERATE SIGNAL</button>

      <p class="tf-binary-disclaimer">
        Signals are analytical estimates, not guaranteed outcomes.
        Confirm market conditions before placing any trade.
      </p>
    </div>
  </div>
</section>

<style>
.tf-binary{padding:20px;margin-top:20px}
.tf-binary-top,.tf-binary-bottom{
  display:flex;justify-content:space-between;align-items:center;
  gap:12px;padding-bottom:15px;border-bottom:1px solid var(--border,#26394d);
  font-size:12px;letter-spacing:1px
}
.tf-live-dot{
  display:inline-block;width:8px;height:8px;border-radius:50%;
  background:#16c784;margin-right:8px;box-shadow:0 0 10px #16c784
}
.tf-binary-controls{
  display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:20px 0
}
.tf-binary-controls label{
  display:flex;flex-direction:column;gap:8px;
  font-size:11px;color:var(--muted,#91a4b8)
}
.tf-binary-controls select{
  width:100%;padding:12px;border-radius:9px;
  background:var(--panel2,#122337);color:var(--text,#fff);
  border:1px solid var(--border,#26394d);outline:none
}
.tf-binary-price{
  padding:18px;border-radius:12px;
  background:var(--panel2,#122337);margin-bottom:15px
}
.tf-binary-price small,.tf-binary-signal small,
.tf-binary-grid small{
  display:block;color:var(--muted,#91a4b8);font-size:10px;
  letter-spacing:1px
}
.tf-binary-price h2{font-size:27px;margin:9px 0}
.tf-binary-price span{font-size:12px;color:var(--muted,#91a4b8)}
.tf-binary-signal{
  text-align:center;padding:22px 15px;border-radius:12px;
  background:var(--panel2,#122337);margin-bottom:15px
}
.tf-binary-signal h1{font-size:35px;margin:12px 0;color:#f0b90b}
.tf-binary-signal p{font-size:12px;color:var(--muted,#91a4b8)}
.tf-binary-meter{
  height:7px;border-radius:20px;background:#26394d;
  overflow:hidden;margin:18px 0 9px
}
.tf-binary-meter div{
  height:100%;width:0%;background:#16c784;
  transition:width .3s
}
#tfBinaryConfidence{font-size:11px;color:var(--muted,#91a4b8)}
.tf-binary-grid{
  display:grid;grid-template-columns:repeat(2,1fr);
  gap:10px;margin:15px 0
}
.tf-binary-grid>div{
  padding:14px;border-radius:10px;
  background:var(--panel2,#122337);min-width:0
}
.tf-binary-grid strong{
  display:block;font-size:16px;margin:9px 0;overflow-wrap:anywhere
}
.tf-binary-grid span{font-size:10px;color:var(--muted,#91a4b8)}
.tf-binary-checks{
  padding:15px;border-radius:10px;
  background:var(--panel2,#122337);margin:15px 0
}
.tf-binary-checks h3{font-size:12px;letter-spacing:1px;margin:0 0 12px}
.tf-binary-checks div{
  display:flex;justify-content:space-between;gap:10px;
  padding:10px 0;border-bottom:1px solid var(--border,#26394d);
  font-size:11px
}
.tf-binary-checks div:last-child{border:0}
.tf-binary-checks b{color:#f0b90b}
.tf-binary-bottom{padding:15px 0;margin-bottom:15px}
.tf-binary-bottom strong{font-size:17px;color:#16c784}
#tfBinaryRefresh{
  width:100%;padding:15px;border:0;border-radius:9px;
  background:linear-gradient(110deg,#0878df,#0752a5);
  color:white;font-weight:800;letter-spacing:1px;cursor:pointer
}
#tfBinaryRefresh:disabled{opacity:.6;cursor:wait}
.tf-binary-disclaimer{
  font-size:10px;color:var(--muted,#91a4b8);
  text-align:center;line-height:1.6;margin:15px 0 0
}
@media(max-width:480px){
  .tf-binary{padding:13px}
  .tf-binary-grid{gap:7px}
  .tf-binary-grid>div{padding:11px}
}
</style>

<script>
(function(){
"use strict";

const API="https://api1.api.cbtradersbd.com";
const $=id=>document.getElementById(id);

const state={
  candles:[],
  busy:false,
  timer:null
};

function setText(id,value){
  const el=$(id);
  if(el)el.textContent=value;
}

function number(value){
  const n=Number(value);
  return Number.isFinite(n)?n:null;
}

function extractArray(data){
  if(Array.isArray(data))return data;
  if(!data||typeof data!=="object")return [];
  for(const key of ["candles","data","result","history","prices"]){
    if(Array.isArray(data[key]))return data[key];
    if(data[key]&&Array.isArray(data[key].candles))return data[key].candles;
  }
  return [];
}

function normalizeCandle(c){
  if(Array.isArray(c)){
    return {
      time:c[0],open:number(c[1]),high:number(c[2]),
      low:number(c[3]),close:number(c[4]),volume:number(c[5])||0
    };
  }
  return {
    time:c.time??c.timestamp??c.from??c.date,
    open:number(c.open??c.o),
    high:number(c.high??c.h),
    low:number(c.low??c.l),
    close:number(c.close??c.c),
    volume:number(c.volume??c.v)||0
  };
}

async function apiGet(path,params={}){
  const url=new URL(API+path);
  Object.entries(params).forEach(([k,v])=>url.searchParams.set(k,v));
  const response=await fetch(url.toString(),{
    method:"GET",
    headers:{Accept:"application/json"},
    cache:"no-store"
  });
  if(!response.ok)throw new Error("API HTTP "+response.status);
  return response.json();
}

async function getCandles(pair,timeframe){
  const data=await apiGet("/api/quotex/candles",{
    pair:pair,
    symbol:pair,
    timeframe:timeframe,
    interval:timeframe,
    limit:150
  });
  return extractArray(data).map(normalizeCandle)
    .filter(c=>c.open!==null&&c.high!==null&&c.low!==null&&c.close!==null);
}

async function getPrice(pair){
  const data=await apiGet("/api/quotex/live-price",{
    pair:pair,
    symbol:pair
  });
  if(typeof data==="number")return data;
  return number(
    data.price??data.close??data.last??data.rate??
    data.data?.price??data.data?.close
  );
}

async function getPayouts(){
  return apiGet("/api/quotex/payouts");
}

function ema(values,period){
  if(values.length<period)return null;
  const k=2/(period+1);
  let result=values.slice(0,period).reduce((a,b)=>a+b,0)/period;
  for(let i=period;i<values.length;i++){
    result=values[i]*k+result*(1-k);
  }
  return result;
}

function rsi(values,period=14){
  if(values.length<=period)return null;
  let gains=0,losses=0;
  for(let i=values.length-period;i<values.length;i++){
    const diff=values[i]-values[i-1];
    if(diff>0)gains+=diff;
    else loss-=diff;
  }
  const avgGain=gains/period;
  const avgLoss=losses/period;
  if(avgLoss===0)return 100;
  return 100-(100/(1+avgGain/avgLoss));
}

function macd(values){
  const fast=ema(values,12);
  const slow=ema(values,26);
  if(fast===null||slow===null)return null;
  return fast-slow;
}

function analyze(candles){
  const closes=candles.map(c=>c.close);
  const highs=candles.map(c=>c.high);
  const lows=candles.map(c=>c.low);

  if(closes.length<35)throw new Error("Not enough candles for analysis");

  const r=rsi(closes);
  const e9=ema(closes,9);
  const e21=ema(closes,21);
  const e50=ema(closes,50);
  const m=macd(closes);

  const last=candles[candles.length-1];
  const previous=candles[candles.length-2];

  const support=Math.min(...lows.slice(-20));
  const resistance=Math.max(...highs.slice(-20));

  const bullish=last.close>last.open;
  const bearish=last.close<last.open;

  const bullishEngulf= bullish && bearish===false &&
    previous.close<previous.open &&
    last.close>previous.open &&
    last.open<previous.close;

  const bearishEngulf= bearish &&
    previous.close>previous.open &&
    last.close<previous.open &&
    last.open>previous.close;

  const bullishBreak=last.close>Math.max(...highs.slice(-6,-1));
  const bearishBreak=last.close<Math.min(...lows.slice(-6,-1));

  let buy=0,sell=0;
  const checks={};

  if(r!==null){
    if(r>50&&r<70)buy++;
    if(r<50&&r>30)sell++;
    checks.rsi=r>50&&r<70?"BUY":r<50&&r>30?"SELL":"NEUTRAL";
  }else checks.rsi="WAITING";

  if(e9>e21&&e21>e50)buy++;
  else if(e9<e21&&e21<e50)sell++;
  checks.ema=e9>e21&&e21>e50?"BULLISH":
    e9<e21&&e21<e50?"BEARISH":"MIXED";

  if(m>0)buy++;
  else if(m<0)sell++;
  checks.macd=m>0?"BULLISH":"BEARISH";

  if(bullishBreak)buy++;
  else if(bearishBreak)sell++;
  checks.breakout=bullishBreak?"BULLISH":
    bearishBreak?"BEARISH":"NO BREAKOUT";

  if(bullishEngulf)buy++;
  else if(bearishEngulf)sell++;
  checks.candle=bullishEngulf?"BULLISH ENGULFING":
    bearishEngulf?"BEARISH ENGULFING":"NO CONFIRMATION";

  if(last.close>closes[closes.length-6])buy++;
  else if(last.close<closes[closes.length-6])sell++;
  checks.structure=buy>sell?"BULLISH STRUCTURE":
    sell>buy?"BEARISH STRUCTURE":"NEUTRAL";

  const total=6;
  const confidence=Math.round(Math.max(buy,sell)/total*100);

  let signal="WAIT";
  if(buy>=4&&buy>sell)signal="CALL";
  if(sell>=4&&sell>buy)signal="PUT";

  return {
    signal,confidence,r,m,e9,e21,e50,support,resistance,
    checks,last,previous,buy,sell
  };
}

function updateChecks(a){
  const mapping={
    RSI:a.checks.rsi,
    MACD:a.checks.macd,
    EMA:a.checks.ema,
    Breakout:a.checks.breakout,
    Candle:a.checks.candle,
    Structure:a.checks.structure
  };
  Object.entries(mapping).forEach(([key,value])=>{
    const id={
      RSI:"tfCheckRSI",MACD:"tfCheckMACD",EMA:"tfCheckEMA",
      Breakout:"tfCheckBreakout",Candle:"tfCheckCandle",
      Structure:"tfCheckStructure"
    }[key];
    setText(id,value);
  });
}

function displayAnalysis(a,price){
  setText("tfBinarySignal",a.signal);
  setText("tfBinaryReason",
    a.signal==="WAIT"?"Insufficient directional confluence":
    a.signal+" confirmation from "+Math.max(a.buy,a.sell)+" of 6 checks"
  );

  const signalEl=$("tfBinarySignal");
  signalEl.style.color=a.signal==="CALL"?"#16c784":
    a.signal==="PUT"?"#ff5263":"#f0b90b";

  setText("tfBinaryConfidence","CONFIDENCE: "+a.confidence+"%");
  $("tfBinaryMeter").style.width=a.confidence+"%";

  setText("tfBinaryRSI",a.r===null?"--":a.r.toFixed(2));
  setText("tfBinaryRSIState",a.checks.rsi);
  setText("tfBinaryMACD",a.m===null?"--":a.m.toFixed(6));
  setText("tfBinaryMACDState",a.checks.macd);
  setText("tfBinaryEMA",a.e9>a.e21?"BULLISH":"BEARISH");
  setText("tfBinaryEMAState",a.checks.ema);
  setText("tfBinaryStructure",a.checks.structure);
  setText("tfBinaryStructureState",a.checks.structure);
  setText("tfBinarySupport",a.support.toFixed(5));
  setText("tfBinaryResistance",a.resistance.toFixed(5));

  if(price!==null)setText("tfBinaryPrice",price);
  setText("tfBinaryChange",
    "Last candle: "+(a.last.close>=a.last.open?"BULLISH":"BEARISH")
  );

  updateChecks(a);
}

async function refresh(){
  if(state.busy)return;
  state.busy=true;
  const button=$("tfBinaryRefresh");
  button.disabled=true;
  button.textContent="ANALYZING...";

  const pair=$("tfBinaryPair").value;
  const timeframe=$("tfBinaryTimeframe").value;

  try{
    const candleData=await getCandles(pair,timeframe);
    if(candleData.length<35)throw new Error("Insufficient candle history");

    state.candles=candleData;
    const analysis=analyze(candleData);

    let price=null;
    try{price=await getPrice(pair)}catch(e){}

    displayAnalysis(analysis,price);
    setText("tfBinaryStatus","LIVE DATA RECEIVED");

    try{
      const payouts=await getPayouts();
      const payoutValue=payouts?.[pair]??
        payouts?.data?.[pair]??payouts?.payouts?.[pair];
      if(payoutValue!==undefined)setText(
        "tfBinaryPayout",
        Number(payoutValue)+"%"
      );
    }catch(e){}
  }catch(error){
    setText("tfBinaryStatus","FEED ERROR");
    setText("tfBinarySignal","WAIT");
    setText("tfBinaryReason",error.message);
    setText("tfBinaryConfidence","NO VERIFIED SIGNAL");
  }finally{
    state.busy=false;
    button.disabled=false;
    button.textContent="✦ GENERATE SIGNAL";
  }
}

$("tfBinaryRefresh").addEventListener("click",refresh);
$("tfBinaryPair").addEventListener("change",refresh);
$("tfBinaryTimeframe").addEventListener("change",refresh);

refresh();
state.timer=setInterval(refresh,15000);

})();
</script>
