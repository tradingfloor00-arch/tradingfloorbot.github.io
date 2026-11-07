
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>TradingFloor AI | Quotex Feed Test</title>
<style>
*{box-sizing:border-box}
body{margin:0;background:#07111f;color:#eaf3ff;font-family:Arial,sans-serif;padding:18px}
main{max-width:850px;margin:auto}
.panel{background:#101f32;border:1px solid #263e58;border-radius:14px;padding:18px;margin-bottom:15px}
h1{font-size:23px;color:#55adff}
p{color:#a9bdd2;line-height:1.5}
input,select{width:100%;padding:13px;margin:7px 0 14px;background:#071525;color:white;border:1px solid #36516e;border-radius:7px}
button{padding:13px 16px;margin:4px 3px 8px 0;background:#087fe5;color:white;border:0;border-radius:7px;font-weight:bold}
button:disabled{opacity:.5}
pre{background:#030a12;color:#9ee7c1;padding:14px;border-radius:9px;white-space:pre-wrap;overflow-wrap:anywhere;min-height:130px}
.status{padding:12px;background:#071525;border-radius:8px;color:#67c4ff}
small{color:#9eb2c8}
</style>
</head>
<body>
<main>
<div class="panel">
<h1>TRADINGFLOOR AI</h1>
<h2>Quotex API Connection Test</h2>
<p>Diagnostic only. This page does not place trades or generate trading instructions.</p>
<div class="status" id="status">Ready to test</div>
</div>

<div class="panel">
<label>API base URL</label>
<input id="base" value="https://api1.api.cbtradersbd.com">

<label>API key</label>
<input id="key" type="password" autocomplete="off" placeholder="Enter your API key">

<label>Market symbol</label>
<input id="symbol" value="EURUSD_otc">

<label>Candle timeframe</label>
<select id="timeframe">
<option value="1m">1 minute</option>
<option value="5m">5 minutes</option>
<option value="15m">15 minutes</option>
<option value="30m">30 minutes</option>
<option value="1h">1 hour</option>
</select>

<button onclick="testSchema()">TEST API SCHEMA</button>
<button onclick="testEndpoint('live-price')">TEST LIVE PRICE</button>
<button onclick="testEndpoint('candles')">TEST CANDLES</button>
<button onclick="testEndpoint('payouts')">TEST PAYOUTS</button>
</div>

<div class="panel">
<h3>API Response</h3>
<pre id="output">Waiting for your test...</pre>
</div>
</main>

<script>
const $ = id => document.getElementById(id);

function report(message,data){
  $("status").textContent=message;
  $("output").textContent=
    typeof data==="string"?data:JSON.stringify(data,null,2);
}

function baseURL(){
  return $("base").value.trim().replace(/\/+$/,"");
}

function headers(){
  const key=$("key").value.trim();
  if(!key) throw new Error("Enter the API key first.");
  return {
    "Accept":"application/json",
    "Authorization":"Bearer "+key,
    "X-API-Key":key
  };
}

async function request(path){
  const response=await fetch(baseURL()+path,{
    method:"GET",
    headers:headers(),
    cache:"no-store"
  });

  const text=await response.text();
  let data;
  try{data=JSON.parse(text)}
  catch{data=text}

  if(!response.ok){
    throw new Error("HTTP "+response.status+" | "+
      (typeof data==="string"?data:JSON.stringify(data)));
  }
  return data;
}

async function testSchema(){
  report("Testing API documentation...", "Connecting...");
  try{
    const data=await request("/openapi.json");
    report("API SCHEMA SUCCESS",data);
  }catch(error){
    report("SCHEMA TEST FAILED",{
      error:error.message,
      note:"The provider may use another schema URL, require different authentication, or block browser access."
    });
  }
}

async function testEndpoint(name){
  const symbol=$("symbol").value.trim();
  const timeframe=$("timeframe").value;

  if(!symbol){
    report("Missing symbol","Enter a market symbol.");
    return;
  }

  const params=new URLSearchParams();
  params.set("symbol",symbol);

  if(name==="candles"){
    params.set("timeframe",timeframe);
  }

  const path="/api/quotex/"+name+"?"+params.toString();

  report("Testing "+name+"...",{
    endpoint:baseURL()+path,
    symbol,
    timeframe
  });

  try{
    const data=await request(path);
    report(name.toUpperCase()+" SUCCESS",{
      endpoint:path,
      response:data
    });
  }catch(error){
    report(name.toUpperCase()+" FAILED",{
      endpoint:path,
      error:error.message,
      guidance:"Check the provider's exact parameter names and authentication requirements. Failed to fetch may indicate CORS or network restrictions."
    });
  }
}
</script>
</body>
</html>
