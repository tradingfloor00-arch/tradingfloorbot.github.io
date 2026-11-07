
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>TradingFloor AI - Quotex Feed Tester</title>
<style>
*{box-sizing:border-box}
body{margin:0;background:#07111f;color:#eaf2ff;font-family:Arial,sans-serif;padding:18px}
.wrap{max-width:850px;margin:auto}
h1{color:#45a7ff;font-size:25px}
.panel{background:#102137;border:1px solid #203b58;border-radius:13px;padding:16px;margin:14px 0}
label{display:block;color:#9eb6d1;font-size:13px;margin:12px 0 6px}
input,select{width:100%;padding:12px;background:#071525;border:1px solid #31516f;color:white;border-radius:8px;font-size:15px}
button{padding:12px 15px;border:0;border-radius:8px;background:#087ee5;color:white;font-weight:bold;margin:8px 5px 0 0;cursor:pointer}
button.secondary{background:#25415f}
button:disabled{opacity:.5}
.status{padding:12px;border-radius:8px;background:#071525;margin-top:12px;color:#ffc45c;overflow-wrap:anywhere}
pre{white-space:pre-wrap;overflow-wrap:anywhere;background:#050d17;padding:13px;border-radius:8px;color:#b9d9ff;max-height:400px;overflow:auto;font-size:12px}
.small{font-size:12px;color:#91a9c4;line-height:1.5}
.price{font-size:26px;color:#42d6a0;font-weight:bold;margin:12px 0}
</style>
</head>
<body>
<div class="wrap">
<h1>TRADINGFLOOR AI</h1>
<p class="small">QUOTEX API CONNECTION & MARKET DATA TESTER</p>

<div class="panel">
<label>API Base URL</label>
<input id="base" value="https://api1.api.cbtradersbd.com">

<label>API Key</label>
<input id="key" type="password" placeholder="Enter your API key">

<label>Market Pair</label>
<select id="pair">
<optgroup label="Popular OTC Forex">
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
</optgroup>
<optgroup label="OTC Metals and Crypto">
<option>XAUUSD_otc</option>
<option>XAGUSD_otc</option>
<option>BTCUSD_otc</option>
<option>ETHUSD_otc</option>
<option>LTCUSD_otc</option>
<option>BCHUSD_otc</option>
<option>BNBUSD_otc</option>
<option>SOLUSD_otc</option>
<option>XRPUSD_otc</option>
<option>DOGEUSD_otc</option>
<option>DOTUSD_otc</option>
<option>ETCUSD_otc</option>
</optgroup>
<optgroup label="Live Forex">
<option>EURUSD</option>
<option>GBPUSD</option>
<option>USDJPY</option>
<option>AUDUSD</option>
<option>USDCAD</option>
<option>USDCHF</option>
<option>NZDUSD</option>
<option>EURGBP</option>
<option>EURJPY</option>
<option>GBPJPY</option>
<option>EURCHF</option>
<option>EURCAD</option>
<option>EURAUD</option>
<option>AUDJPY</option>
<option>AUDCHF</option>
<option>AUDCAD</option>
<option>GBPAUD</option>
<option>GBPCAD</option>
<option>GBPCHF</option>
<option>CADJPY</option>
<option>CHFJPY</option>
<option>XAUUSD</option>
<option>XAGUSD</option>
</optgroup>
</select>

<label>Or enter another symbol</label>
<input id="customPair" placeholder="Example: USDTRY_otc (leave blank to use selection)">

<label>Timeframe</label>
<select id="tf">
<option value="60">1 minute</option>
<option value="300">5 minutes</option>
<option value="900">15 minutes</option>
<option value="1800">30 minutes</option>
<option value="3600">1 hour</option>
</select>

<div>
<button onclick="testApi()">TEST CONNECTION</button>
<button onclick="getPrice()">LIVE PRICE</button>
<button onclick="getCandles()">GET CANDLES</button>
<button onclick="getPayouts()" class="secondary">GET PAYOUTS</button>
</div>

<div id="status" class="status">Ready. Enter your API key and test the connection.</div>
<div id="price" class="price"></div>
</div>

<div class="panel">
<h3>API RESPONSE / DIAGNOSTICS</h3>
<pre id="output">Waiting for request...</pre>
</div>

<p class="small">
This page only reads market data. It does not place trades.
Pair names are a test catalogue, not confirmation that every symbol is enabled by the API.
</p>
</div>

<script>
const $=id=>document.getElementById(id);

function pair(){
 return $("customPair").value.trim() || $("pair").value;
}

function show(message,data){
 $("status").textContent=message;
 $("output").textContent=typeof data==="string"?data:JSON.stringify(data,null,2);
}

function headers(){
 const k=$("key").value.trim();
 const h={"Accept":"application/json"};
 if(k){
  h["Authorization"]="Bearer "+k;
  h["X-API-Key"]=k;
 }
 return h;
}

function base(){
 return $("base").value.trim().replace(/\/+$/,"");
}

async function request(path,params={}){
 const url=new URL(base()+path);
 Object.entries(params).forEach(([k,v])=>url.searchParams.set(k,v));
 const response=await fetch(url.toString(),{
  method:"GET",
  headers:headers(),
  cache:"no-store"
 });
 const body=await response.text();
 let parsed;
 try{parsed=JSON.parse(body)}catch(e){parsed=body}
 if(!response.ok){
  throw new Error("HTTP "+response.status+" "+response.statusText+
   "\nEndpoint: "+url+
   "\nResponse: "+(typeof parsed==="string"?parsed:JSON.stringify(parsed)));
 }
 return {endpoint:url.toString(),status:response.status,data:parsed};
}

async function tryEndpoints(paths,parameterSets){
 let errors=[];
 for(const path of paths){
  for(const params of parameterSets){
   try{
    return await request(path,params);
   }catch(e){
    errors.push(e.message);
   }
  }
 }
 throw new Error(errors.join("\n\n----------------\n\n"));
}

async function testApi(){
 $("price").textContent="";
 show("Testing API connection...","Please wait.");
 try{
  const r=await request("/openapi.json");
  show("API CONNECTION SUCCESS",r);
 }catch(e){
  show("CONNECTION TEST FAILED",e.message);
 }
}

async function getPrice(){
 $("price").textContent="";
 show("Requesting live price...","Please wait.");
 const p=pair();
 const sets=[
  {pair:p},
  {symbol:p},
  {asset:p},
  {asset_name:p}
 ];
 try{
  const r=await tryEndpoints(
   ["/api/live-price","/api/quotex/live-price"],
   sets
  );
  const data=r.data;
  let found="";
  if(data && typeof data==="object"){
   found=data.price??data.close??data.rate??data.last_price??data.bid??"";
   if(typeof data.data==="object" && data.data!==null){
    found=data.data.price??data.data.close??data.data.rate??found;
   }
  }
  $("price").textContent=found!==""?"PRICE: "+found:"Price field not recognized - inspect response below.";
  show("LIVE PRICE RESPONSE RECEIVED",r);
 }catch(e){
  show("LIVE PRICE FAILED",e.message);
 }
}

async function getCandles(){
 $("price").textContent="";
 show("Requesting candle data...","Please wait.");
 const p=pair();
 const t=$("tf").value;
 const sets=[
  {pair:p,timeframe:t},
  {symbol:p,timeframe:t},
  {asset:p,timeframe:t},
  {pair:p,interval:t},
  {symbol:p,interval:t},
  {asset:p,interval:t},
  {pair:p,timeframe:Number(t)},
  {symbol:p,timeframe:Number(t)}
 ];
 try{
  const r=await tryEndpoints(
   ["/api/candles","/api/quotex/candles"],
   sets
  );
  show("CANDLE DATA RECEIVED",r);
 }catch(e){
  show("CANDLE REQUEST FAILED",e.message);
 }
}

async function getPayouts(){
 show("Requesting payout information...","Please wait.");
 try{
  const r=await tryEndpoints(
   ["/api/payouts","/api/quotex/payouts"],
   [{},{pair:pair()},{symbol:pair()}]
  );
  show("PAYOUT RESPONSE RECEIVED",r);
 }catch(e){
  show("PAYOUT REQUEST FAILED",e.message);
 }
}
</script>
</body>
</html>
