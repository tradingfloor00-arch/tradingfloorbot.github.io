
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>TradingFloor AI - Quotex API Tester</title>
<style>
*{box-sizing:border-box}
body{margin:0;background:#07111e;color:#eaf3ff;font-family:Arial,sans-serif;padding:18px}
main{max-width:850px;margin:auto}
header{padding:22px 5px}
header small{color:#39a5ff;letter-spacing:2px}
h1{font-size:25px;margin:10px 0}
.panel{background:#101f31;border:1px solid #263d56;border-radius:13px;padding:18px;margin:14px 0}
.status{padding:12px;background:#071525;border-radius:8px;color:#ffca60;font-size:13px}
label{display:block;font-size:12px;color:#a9bdd2;margin:15px 0 6px}
input,select{width:100%;padding:13px;border-radius:8px;border:1px solid #36516e;background:#071525;color:white}
button{border:0;border-radius:8px;padding:13px;background:#087fe5;color:white;font-weight:bold;cursor:pointer;margin:5px 3px 5px 0}
button:disabled{opacity:.5}
.actions{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:15px}
.actions button{margin:0}
.price{font-size:32px;font-weight:bold;margin:15px 0;color:#53b3ff}
pre{background:#030a12;color:#9de7c2;padding:14px;border-radius:8px;white-space:pre-wrap;overflow-wrap:anywhere;min-height:110px;font-size:12px}
small{color:#9eb2c8}
</style>
</head>
<body>
<main>
<header>
<small>TRADINGFLOOR AI</small>
<h1>QUOTEX MARKET DATA TESTER</h1>
<p>Independent API connection and market data diagnostics</p>
</header>

<div class="panel">
<div class="status" id="status">NOT CONNECTED — READY TO TEST</div>

<label>API Base URL</label>
<input id="base" value="https://api1.api.cbtradersbd.com">

<label>API Key</label>
<input id="apiKey" type="password" autocomplete="off" placeholder="Enter your API key">

<label>Market Pair</label>
<select id="pair">
<option>EURUSD_otc</option>
<option>GBPUSD_otc</option>
<option>USDJPY_otc</option>
<option>AUDUSD_otc</option>
<option>USDCAD_otc</option>
<option>EURGBP_otc</option>
<option>EURUSD</option>
<option>GBPUSD</option>
<option>USDJPY</option>
</select>

<label>Timeframe</label>
<select id="timeframe">
<option value="1m">1 Minute</option>
<option value="5m">5 Minutes</option>
<option value="15m">15 Minutes</option>
<option value="30m">30 Minutes</option>
<option value="1h">1 Hour</option>
</select>

<div class="actions">
<button onclick="test('schema')">TEST API</button>
<button onclick="test('live-price')">LIVE PRICE</button>
<button onclick="test('candles')">GET CANDLES</button>
<button onclick="test('payouts')">GET PAYOUTS</button>
</div>
</div>

<div class="panel">
<small>LIVE MARKET PRICE</small>
<div class="price" id="price">--</div>
<small id="priceInfo">No verified price received</small>
</div>

<div class="panel">
<h3>API RESPONSE</h3>
<pre id="output">Ready. Select a test above.</pre>
</div>

<div class="panel">
<h3>Connection information</h3>
<p><small>API host: api1.api.cbtradersbd.com</small></p>
<p><small>Data endpoints: live-price, candles, payouts</small></p>
<p><small>This tester does not execute trades or submit account credentials.</small></p>
</div>
</main>

<script>
const $=id=>document.getElementById(id);

function display(status,data){
 $("status").textContent=status;
 $("output").textContent=typeof data==="string"?data:JSON.stringify(data,null,2);
}

function getHeaders(){
 const key=$("apiKey").value.trim();
 if(!key)throw Error("Enter the API key.");
 return {
  "Accept":"application/json",
  "Authorization":"Bearer "+key,
  "X-API-Key":key
 };
}

async function request(path,params={}){
 const base=$("base").value.trim().replace(/\/+$/,"");
 const url=new URL(base+path);
 Object.entries(params).forEach(([k,v])=>url.searchParams.set(k,v));

 const response=await fetch(url,{
  method:"GET",
  headers:getHeaders(),
  cache:"no-store"
 });

 const raw=await response.text();
 let data;
 try{data=JSON.parse(raw)}catch{data=raw}

 if(!response.ok){
  throw Error("HTTP "+response.status+": "+
   (typeof data==="string"?data:JSON.stringify(data)));
 }
 return {data,url:url.toString()};
}

async function test(type){
 $("priceInfo").textContent="Testing...";
 display("REQUEST IN PROGRESS","Contacting API...");

 try{
  let result;

  if(type==="schema"){
   result=await request("/openapi.json");
  }

  if(type==="live-price"){
   const pair=$("pair").value;
   result=await request("/api/quotex/live-price",{pair});
   const d=result.data;
   const p=typeof d==="number"?d:
    d.price??d.close??d.last??d.rate??d.data?.price??d.data?.close;
   if(p!==undefined){
    $("price").textContent=p;
    $("priceInfo").textContent="Price returned by API for "+pair;
   }else{
    $("priceInfo").textContent="Response received; price field not identified.";
   }
  }

  if(type==="candles"){
   result=await request("/api/quotex/candles",{
    pair:$("pair").value,
    timeframe:$("timeframe").value
   });
  }

  if(type==="payouts"){
   result=await request("/api/quotex/payouts");
  }

  display("SUCCESS — HTTP RESPONSE RECEIVED",{
   request:result.url,
   response:result.data
  });

 }catch(error){
  $("priceInfo").textContent="No verified live price";
  display("REQUEST FAILED",{
   error:error.message,
   guidance:"A CORS error or Failed to fetch means browser access may be blocked. HTTP 401/403 means authentication may be incorrect. HTTP 422 usually means the request parameters need correction."
  });
 }
}
</script>
</body>
</html>
