export default async function handler(req, res) {
  const { symbol, tf, limit = '120', venue = 'quotex' } = req.query || {};

  if (!symbol || !tf) {
    return res.status(400).json({
      error: 'Missing required query params: symbol and tf',
      example: '/api/quotex?symbol=EURUSD_otc&tf=60'
    });
  }

  const targets = [
    {
      name: 'cbtraders',
      method: 'GET',
      url: 'https://api1.api.cbtradersbd.com/api/quotex/candles',
      params: {
        symbol,
        limit,
        tf,
        interval: tf,
        timeframe: tf
      },
      headers: {
        Accept: 'application/json'
      }
    },
    {
      name: 'otcharts',
      method: 'GET',
      url: 'https://otcharts.com/v1/candles',
      params: {
        venue,
        symbol,
        tf,
        limit
      },
      headers: {
        Accept: 'application/json',
        ...(process.env.OTCHARTS_KEY ? { Authorization: `Bearer ${process.env.OTCHARTS_KEY}` } : {})
      }
    }
  ];

  let lastError = null;

  for (const target of targets) {
    try {
      const url = new URL(target.url);
      Object.entries(target.params).forEach(([key, value]) => url.searchParams.set(key, String(value)));

      const response = await fetch(url.toString(), {
        method: target.method,
        headers: target.headers,
        cache: 'no-store'
      });

      const raw = await response.text();
      if (!response.ok) {
        lastError = new Error(`${target.name} HTTP ${response.status}: ${raw.slice(0, 180)}`);
        continue;
      }

      let json;
      try {
        json = JSON.parse(raw);
      } catch (err) {
        lastError = new Error(`${target.name} returned invalid JSON`);
        continue;
      }

      const candles = normalizeCandles(json);
      if (candles.length < 25) {
        lastError = new Error(`${target.name} returned only ${candles.length} valid candles`);
        continue;
      }

      return res.status(200).json({
        symbol,
        tf,
        source: target.name,
        candles
      });
    } catch (err) {
      lastError = err;
    }
  }

  return res.status(502).json({
    error: 'Unable to fetch candles from any upstream source.',
    detail: lastError ? lastError.message : 'Unknown upstream error',
    hint: 'Set OTCHARTS_KEY in your deployment environment for the fallback market feed.'
  });
}

function normalizeCandles(data) {
  let rows = data?.candles ?? data?.data?.candles ?? data?.data ?? data?.result ?? data;

  if (rows && !Array.isArray(rows)) {
    if (Array.isArray(rows.items)) rows = rows.items;
    else if (Array.isArray(rows.history)) rows = rows.history;
    else if (Array.isArray(rows.candles)) rows = rows.candles;
  }

  if (!Array.isArray(rows)) return [];

  return rows
    .map((c) => {
      if (Array.isArray(c)) {
        return {
          time: Number(c[0]),
          open: Number(c[1]),
          high: Number(c[2]),
          low: Number(c[3]),
          close: Number(c[4])
        };
      }

      return {
        time: Number(c.time ?? c.timestamp ?? c.from ?? c.at ?? 0),
        open: Number(c.open ?? c.o),
        high: Number(c.high ?? c.max ?? c.h),
        low: Number(c.low ?? c.min ?? c.l),
        close: Number(c.close ?? c.price ?? c.c)
      };
    })
    .filter((c) =>
      Number.isFinite(c.open) &&
      Number.isFinite(c.high) &&
      Number.isFinite(c.low) &&
      Number.isFinite(c.close) &&
      c.close > 0
    )
    .sort((a, b) => a.time - b.time);
}
