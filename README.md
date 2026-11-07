<!DOCTYPE html>
<html>
<body>
<h2>Quotex Signal Generator</h2>
Pair: <input id="pair" value="EURUSD_otc">
<button onclick="generate()">Generate Signal</button>
<pre id="out"></pre>
<script>
async function generate() {
  const pair = document.getElementById('pair').value;
  const out = document.getElementById('out');
  out.textContent = 'Fetching...';
  try {
    const r = await fetch('https://api1.api.cbtradersbd.com/api/quotex/candles?symbol=' + pair + '&limit=60');
    const data = await r.json();
    const candles = data.candles || data;
    if (!candles.length) { out.textContent = 'No data returned'; return; }
    const closes = candles.map(c => c.close);
    const last = closes ;
    const prev = closes ;
    const sma = closes.slice(-14).reduce((a, b) => a + b, 0) / 14;
    let signal = 'HOLD';
    if (last > sma && last > prev) signal = 'CALL';
    if (last < sma && last < prev) signal = 'PUT';
    out.textContent = 'Price: ' + last + '\nSMA14: ' + sma.toFixed(5) + '\nSignal: ' + signal;
  } catch (e) {
    out.textContent = 'Error: ' + e.message;
  }
}
</script>
</body>
</html>
