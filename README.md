
<!-- TRADINGFLOOR AI - QUOTEX BINARY FEED TESTER -->

<section id="quotex-binary" class="page-section">
  <style>
    #quotex-binary {
      color: #e2e8f0;
      background: #071426;
      padding: 20px;
      border-radius: 14px;
      font-family: Arial, sans-serif;
    }
    #quotex-binary .qx-panel {
      background: #102238;
      border: 1px solid #243c56;
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 15px;
    }
    #quotex-binary h2 { color: #38bdf8; }
    #quotex-binary input,
    #quotex-binary select {
      background: #071426;
      color: white;
      border: 1px solid #34516d;
      border-radius: 7px;
      padding: 12px;
      width: 100%;
      margin: 7px 0;
      box-sizing: border-box;
    }
    #quotex-binary button {
      background: #0284c7;
      color: white;
      border: 0;
      border-radius: 8px;
      padding: 12px 16px;
      font-weight: bold;
      cursor: pointer;
      margin: 5px 3px 5px 0;
    }
    #quotex-binary .qx-muted {
      color: #94a3b8;
      font-size: 12px;
    }
    #quotex-binary .qx-price {
      font-size: 28px;
      font-weight: bold;
      color: #22c55e;
      margin: 12px 0;
    }
    #quotex-binary pre {
      white-space: pre-wrap;
      overflow-wrap: anywhere;
      color: #a5f3fc;
      background: #050d18;
      padding: 12px;
      border-radius: 8px;
      max-height: 300px;
      overflow: auto;
      font-size: 11px;
    }
    #quotex-binary .qx-status {
      padding: 10px;
      border-radius: 8px;
      background: #172b40;
      margin: 10px 0;
      font-size: 13px;
    }
    #quotex-binary .qx-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit,minmax(130px,1fr));
      gap: 10px;
    }
  </style>

  <div class="qx-panel">
    <h2>TRADINGFLOOR AI</h2>
    <h3>Quotex Binary Intelligence</h3>
    <p class="qx-muted">
      Live feed connection diagnostic · Quotex REST API
    </p>

    <div class="qx-status" id="qx-status">
      Waiting for connection test...
    </div>

    <label>Quotex market symbol</label>
    <select id="qx-symbol">
      <option value="EURUSD_otc">EURUSD OTC</option>
      <option value="GBPUSD_otc">GBPUSD OTC</option>
      <option value="USDJPY_otc">USDJPY OTC</option>
      <option value="AUDUSD_otc">AUDUSD OTC</option>
      <option value="BTCUSD_otc">BTCUSD OTC</option>
      <option value="EURUSD">EURUSD</option>
      <option value="GBPUSD">GBPUSD</option>
    </select>

    <label>Custom symbol</label>
    <input id="qx-custom" placeholder="Example: USDCHF_otc">

    <button id="qx-test">TEST QUOTEX FEED</button>
    <button id="qx-candles">TEST CANDLES</button>
  </div>

  <div class="qx-panel">
    <h3>Market data</h3>
    <div class="qx-grid">
      <div>
        <div class="qx-muted">Selected symbol</div>
        <strong id="qx-market">--</strong>
      </div>
      <div>
        <div class="qx-muted">Live price</div>
        <div class="qx-price" id="qx-price">--</div>
      </div>
      <div>
        <div class="qx-muted">Payout</div>
        <strong id="qx-payout">--</strong>
      </div>
      <div>
        <div class="qx-muted">Candles received</div>
        <strong id="qx-count">0</strong>
      </div>
    </div>
  </div>

  <div class="qx-panel">
    <h3>Feed response</h3>
    <pre id="qx-response">No response yet.</pre>
  </div>

  <div class="qx-panel">
    <h3>Candle response</h3>
    <pre id="qx-candle-response">No candle request yet.</pre>
  </div>

  <div class="qx-panel">
    <h3>Connection information</h3>
    <p class="qx-muted">
      API host: api1.api.cbtradersbd.com
    </p>
    <p class="qx-muted">
      This tester only requests market data. It does not
      place trades or access your Quotex account.
    </p>
  </div>
</section>

<script>
(function() {
  const BASE = "https://api1.api.cbtradersbd.com";

  const $ = id => document.getElementById(id);

  function status(message) {
    $("qx-status").textContent = message;
  }

  function selectedSymbol() {
    return (
      $("qx-custom").value.trim() ||
      $("qx-symbol").value
    );
  }

  async function requestEndpoint(path, symbol) {
    const attempts = [
      {pair: symbol},
      {symbol: symbol},
      {asset: symbol}
    ];

    let errors = [];

    for (const params of attempts) {
      const query = new URLSearchParams(params);

      const url = BASE + path + "?" + query.toString();

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Accept": "application/json"
          },
          cache: "no-store"
        });

        const body = await response.text();

        let data;

        try {
          data = JSON.parse(body);
        } catch {
          data = body;
        }

        if (response.ok) {
          return {
            success: true,
            status: response.status,
            url,
            data
          };
        }

        errors.push({
          status: response.status,
          response: data
        });

      } catch (error) {
        errors.push({
          error: error.message
        });
      }
    }

    return {
      success: false,
      errors
    };
  }

  function findValue(data, keys) {
    if (!data || typeof data !== "object") return null;

    for (const key of keys) {
      if (data[key] !== undefined && data[key] !== null) {
        return data[key];
      }
    }

    for (const key of ["data", "result", "price_data"]) {
      if (data[key] && typeof data[key] === "object") {
        const found = findValue(data[key], keys);
        if (found !== null) return found;
      }
    }

    return null;
  }

  async function testPrice() {
    const symbol = selectedSymbol();

    $("qx-market").textContent = symbol;
    $("qx-price").textContent = "Testing...";
    status("Connecting to Quotex live-price endpoint...");

    const result = await requestEndpoint(
      "/api/quotex/live-price",
      symbol
    );

    $("qx-response").textContent =
      JSON.stringify(result, null, 2);

    if (!result.success) {
      $("qx-price").textContent = "--";
      status(
        "Feed test failed. Check API availability, endpoint parameters and CORS."
      );
      return;
    }

    const price = findValue(result.data, [
      "price",
      "close",
      "last_price",
      "current_price"
    ]);

    const payout = findValue(result.data, [
      "payout",
      "payout_percentage"
    ]);

    $("qx-price").textContent =
      price !== null ? String(price) : "Response received";

    $("qx-payout").textContent =
      payout !== null ? String(payout) + "%" : "--";

    status(
      price !== null
        ? "Price data received. Verify the symbol and timestamp."
        : "API responded, but the price field needs mapping."
    );
  }

  async function testCandles() {
    const symbol = selectedSymbol();

    status("Requesting Quotex historical candles...");

    const result = await requestEndpoint(
      "/api/quotex/candles",
      symbol
    );

    $("qx-candle-response").textContent =
      JSON.stringify(result, null, 2);

    if (!result.success) {
      status(
        "Candle request failed. Endpoint schema or browser access may differ."
      );
      return;
    }

    let candles = result.data;

    if (!Array.isArray(candles)) {
      candles = findValue(result.data, [
        "candles",
        "data",
        "history",
        "results"
      ]);
    }

    $("qx-count").textContent =
      Array.isArray(candles) ? candles.length : "Unknown";

    status(
      Array.isArray(candles)
        ? "Candle response received. Check the returned OHLC fields."
        : "API responded. Candle response format needs mapping."
    );
  }

  $("qx-test").addEventListener("click", testPrice);
  $("qx-candles").addEventListener("click", testCandles);

})();
</script>

<!-- END QUOTEX BINARY FEED TESTER -->
