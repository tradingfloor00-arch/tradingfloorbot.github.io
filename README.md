
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>TradingFloor AI - Quotex API Tester</title>
<style>
*{box-sizing:border-box}
body{margin:0;padding:16px;background:#07111f;color:#eaf2ff;font-family:Arial,sans-serif}
.wrap{max-width:850px;margin:auto}
h1{color:#40a5ff;font-size:25px}
.panel{background:#102137;border:1px solid #25415f;border-radius:13px;padding:16px;margin:14px 0}
label{display:block;color:#a9bfd8;font-size:13px;margin:12px 0 6px}
input,select{width:100%;padding:12px;background:#071525;border:1px solid #34516f;color:white;border-radius:8px;font-size:15px}
button{padding:12px 15px;border:0;border-radius:8px;background:#087ee5;color:white;font-weight:bold;margin:8px 5px 0 0}
button.secondary{background:#29445f}
button:disabled{opacity:.5}
.status{padding:12px;border-radius:8px;background:#071525;margin-top:14px;color:#ffc45c;overflow-wrap:anywhere;white-space:pre-wrap}
pre{white-space:pre-wrap;overflow-wrap:anywhere;background:#050d17;padding:13px;border-radius:8px;color:#b9d9ff;max-height:420px;overflow:auto;font-size:12px}
.small{font-size:12px;color:#91a9c4;line-height:1.6}
.price{font-size:25px;color:#42d6a0;font-weight:bold;margin:12px 0}
#parameters{margin-top:12px}
.param{border-top:1px solid #29415b;padding:8px 0}
</style>
</head>
<body>
<div class="wrap">
<h1>TRADINGFLOOR AI</h1>
<p class="small">QUOTEX MARKET DATA API TESTER</p>

<div class="panel">
<label>API Base URL</label>
<input id="base" value="https://api1.api.cbtradersbd.com">

<label>API Key</label>
<input id="key" type="password" placeholder="Enter your API key">

<label>Market Pair</label>
<select id="pair">
<optgroup label="Popular OTC Forex">
<option>EURUSD_otc</option><option>GBPUSD_otc</option>
<option>USDJPY_otc</option><option>AUDUSD_otc</option>
<option>USDCAD_otc</option><option>USDCHF_otc</option>
<option>NZDUSD_otc</option><option>EURGBP_otc</option>
<option>EURJPY_otc</option><option>GBPJPY_otc</option>
<option>AUDJPY_otc</option><option>EURCHF_otc</option>
<option>EURCAD_otc</option><option>EURAUD_otc</option>
<option>GBPAUD_otc</option><option>GBPCAD_otc</option>
<option>GBPCHF_otc</option><option>AUDCHF_otc</option>
<option>AUDCAD_otc</option><option>AUDNZD_otc</option>
<option>NZDJPY_otc</option><option>NZDCHF_otc</option>
<option>CADJPY_otc</option><option>CHFJPY_otc</option>
<option>USDMXN_otc</option><option>USDZAR_otc</option>
<option>USDINR_otc</option><option>USDPKR_otc</option>
<option>USDNGN_otc</option><option>USDIDR_otc</option>
<option>USDPHP_otc</option><option>USDBDT_otc</option>
<option>USDARS_otc</option><option>USDCOP_otc</option>
<option>USDEGP_otc</option><option>USDDZD_otc</option>
<option>BRLUSD_otc</option>
</optgroup>
<optgroup label="OTC Metals and Crypto">
<option>XAUUSD_otc</option><option>XAGUSD_otc</option>
<option>BTCUSD_otc</option><option>ETHUSD_otc</option>
<option>LTCUSD_otc</option><option>BCHUSD_otc</option>
<option>BNBUSD_otc</option><option>SOLUSD_otc</option>
<option>XRPUSD_otc</option><option>DOGEUSD_otc</option>
<option>DOTUSD_otc</option><option>ETCUSD_otc</option>
</optgroup>
<optgroup label="Regular Forex">
<option>EURUSD</option><option>GBPUSD</option>
<option>USDJPY</option><option>AUDUSD</option>
<option>USDCAD</option><option>USDCHF</option>
<option>NZDUSD</option><option>EURGBP</option>
<option>EURJPY</option><option>GBPJPY</option>
<option>EURCHF</option><option>EURCAD</option>
<option>EURAUD</option><option>AUDJPY</option>
<option>AUDCHF</option><option>AUDCAD</option>
<option>GBPAUD</option><option>GBPCAD</option>
<option>GBPCHF</option><option>CADJPY</option>
<option>CHFJPY</option><option>XAUUSD</option>
<option>XAGUSD</option>
</optgroup>
</select>

<label>Or enter a custom symbol</label>
<input id="customPair" placeholder="Example: USDTRY_otc">

<label>API operation</label>
<select id="endpoint">
<option value="/api/live-price">Live Price</option>
<option value="/api/candles">Candles / Historical Data</option>
<option value="/api/payouts">Payouts</option>
</select>

<label>Timeframe</label>
<select id="timeframe">
<option value="60">1 minute (60 seconds)</option>
<option value="300">5 minutes (300 seconds)</option>
<option value="900">15 minutes (900 seconds)</option>
<option value="1800">30 minutes (1800 seconds)</option>
<option value="3600">1 hour (3600 seconds)</option>
</select>

<label>Additional API parameters</label>
<div id="parameters" class="small">
Load the API schema to discover the required parameters.
</div>

<button onclick="loadSchema()">LOAD API SCHEMA</button>
<button onclick="sendRequest()">TEST SELECTED FEED</button>
<button class="secondary" onclick="clearOutput()">CLEAR</button>

<div id="status" class="status">Ready. Load the API schema first.</div>
<div id="price" class="price"></div>
</div>

<div class="panel">
<h3>API RESPONSE</h3>
<pre id="output">Waiting for API request...</pre>
</div>

<p class="small">
This is a data-only tester. It does not place trades.
The displayed pair list is a starting catalogue, not a verified list of symbols enabled by your provider.
</p>
</div>

<script>
let apiSchema=null;
let discoveredParams=[];
let securityInfo={};

const $=id=>document.getElementById(id);

function apiBase(){
 return $("base").value.trim().replace(/\/+$/,"");
}

function selectedPair(){
 return $("customPair").value.trim() || $("pair").value;
}

function show(message,data){
 $("status").textContent=message;
 $("output").textContent=typeof data==="string"
  ?data:JSON.stringify(data,null,2);
}

function clearOutput(){
 $("price").textContent="";
 show("Cleared.","Waiting for API request...");
}

function makeHeaders(){
 const key=$("key").value.trim();
 const h={"Accept":"application/json"};

 if(key){
  h["Authorization"]="Bearer "+key;
  h["X-API-Key"]=key;
  h["api-key"]=key;
 }
 return h;
}

async function fetchWithTimeout(url,options={}){
 const controller=new AbortController();
 const timer=setTimeout(()=>controller.abort(),15000);
 try{
  return await fetch(url,{
   ...options,
   signal:controller.signal,
   cache:"no-store"
  });
 }finally{
  clearTimeout(timer);
 }
}

async function loadSchema(){
 show("Connecting to API and discovering its schema...","Please wait.");
 $("price").textContent="";

 try{
  const response=await fetchWithTimeout(
   apiBase()+"/openapi.json",
   {headers:makeHeaders()}
  );

  const raw=await response.text();
  if(!response.ok){
   throw new Error("HTTP "+response.status+": "+raw);
  }

  apiSchema=JSON.parse(raw);
  securityInfo=apiSchema.components?.securitySchemes || {};

  const paths=apiSchema.paths || {};
  const available=Object.keys(paths);

  if(!available.length){
   throw new Error("The schema loaded but contained no API paths.");
  }

  const endpoint=$("endpoint");
  const known=[
   "/api/live-price",
   "/api/candles",
   "/api/payouts"
  ];

  endpoint.innerHTML="";
  known.forEach(path=>{
   if(paths[path]?.get){
    const option=document.createElement("option");
    option.value=path;
    option.textContent=path;
    endpoint.appendChild(option);
   }
  });

  if(!endpoint.options.length){
   available.forEach(path=>{
    if(paths[path]?.get){
     const option=document.createElement("option");
     option.value=path;
     option.textContent=path;
     endpoint.appendChild(option);
    }
   });
  }

  endpoint.onchange=discoverParameters;
  discoverParameters();

  show("API SCHEMA LOADED SUCCESSFULLY",{
   title:apiSchema.info?.title,
   version:apiSchema.info?.version,
   availablePaths:available,
   authenticationSchemes:securityInfo
  });

 }catch(error){
  show("SCHEMA LOAD FAILED",diagnose(error));
 }
}

function discoverParameters(){
 const path=$("endpoint").value;
 const operation=apiSchema?.paths?.[path]?.get;

 discoveredParams=operation?.parameters || [];

 const box=$("parameters");
 box.innerHTML="";

 if(!discoveredParams.length){
  box.textContent="No query parameters are documented for this endpoint.";
  return;
 }

 discoveredParams.forEach((param,index)=>{
  const wrap=document.createElement("div");
  wrap.className="param";

  const label=document.createElement("label");
  label.textContent=param.name+
   (param.required?" (required)":" (optional)")+
   (param.description?" — "+param.description:"");

  const input=document.createElement("input");
  input.id="param_"+index;
  input.dataset.name=param.name;
  input.placeholder="Enter "+param.name;

  const schema=param.schema || {};
  if(schema.default!==undefined)input.value=schema.default;
  if(schema.type==="integer" || schema.type==="number"){
   input.type="number";
  }

  wrap.appendChild(label);
  wrap.appendChild(input);
  box.appendChild(wrap);
 });
}

function collectParameters(){
 const params={};
 const path=$("endpoint").value.toLowerCase();

 discoveredParams.forEach((param,index)=>{
  const input=$("param_"+index);
  if(!input)return;

  let value=input.value.trim();

  if(!value){
   const name=param.name.toLowerCase();

   if(["pair","symbol","asset","asset_name","instrument"].includes(name)){
    value=selectedPair();
   }

   if(["timeframe","interval","period","duration"].includes(name)){
    value=$("timeframe").value;
   }
  }

  if(value)params[param.name]=value;
 });

 if(!discoveredParams.length){
  if(path.includes("live-price") || path.includes("candles")){
   params.pair=selectedPair();
  }
  if(path.includes("candles")){
   params.timeframe=$("timeframe").value;
  }
 }

 return params;
}

function diagnose(error){
 const message=error?.message || String(error);

 if(message.includes("Failed to fetch") ||
    message.includes("NetworkError") ||
    message.includes("Load failed")){
  return message+
   "\n\nLikely causes: browser CORS restriction, network failure, DNS issue, or server unavailable. This cannot be fixed by changing the currency pair.";
 }

 if(message.toLowerCase().includes("abort")){
  return message+"\n\nThe API did not respond within 15 seconds.";
 }

 return message;
}

async function sendRequest(){
 if(!apiSchema){
  show("Load the API schema first.","Press LOAD API SCHEMA.");
  return;
 }

 const path=$("endpoint").value;
 const params=collectParameters();
 const url=new URL(apiBase()+path);

 Object.entries(params).forEach(([key,value])=>{
  url.searchParams.set(key,value);
 });

 $("price").textContent="";
 show("Requesting "+path+" ...",{url:url.toString(),parameters:params});

 try{
  const response=await fetchWithTimeout(url.toString(),{
   method:"GET",
   headers:makeHeaders()
  });

  const raw=await response.text();
  let data;
  try{data=JSON.parse(raw)}catch(e){data=raw}

  if(!response.ok){
   throw new Error("HTTP "+response.status+
    " "+response.statusText+"\n"+raw);
  }

  let price="";
  if(data && typeof data==="object"){
   price=data.price??data.close??data.rate??
    data.last_price??data.bid??"";

   if(data.data && typeof data.data==="object"){
    price=data.data.price??data.data.close??
     data.data.rate??price;
   }
  }

  if(price!==""){
   $("price").textContent="PRICE: "+price;
  }

  show("REQUEST SUCCESSFUL",{
   endpoint:url.toString(),
   httpStatus:response.status,
   response:data
  });

 }catch(error){
  show("FEED REQUEST FAILED",diagnose(error));
 }
}
</script>
</body>
</html>
