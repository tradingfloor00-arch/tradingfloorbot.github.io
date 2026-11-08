const OTCHARTS_URL = 'https://otcharts.com/v1/candles';
const ALLOWED_TIMEFRAMES = new Set(['60', '120', '180', '240', '300', '600', '900', '1800', '3600', '14400', '86400']);

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const query = req.query || {};
  const symbol = typeof query.symbol === 'string' ? query.symbol.trim() : '';
  const tf = typeof query.tf === 'string' ? query.tf : '';
  const limitValue = Number.parseInt(query.limit || '120', 10);
  const limit = Number.isFinite(limitValue) ? Math.min(Math.max(limitValue, 25), 500) : 120;
  const apiKey = process.env.OTCHARTS_KEY;

  if (!symbol || !/^[A-Za-z0-9_-]{1,32}$/.test(symbol)) {
    return res.status(400).json({ error: 'A valid symbol is required.' });
  }
  if (!ALLOWED_TIMEFRAMES.has(tf)) {
    return res.status(400).json({ error: 'Unsupported timeframe. Use a timeframe in seconds such as 60, 120, 180, or 300.' });
  }
  if (!apiKey) {
    return res.status(503).json({
      error: 'OTCharts is not configured on the server.',
      hint: 'Set OTCHARTS_KEY in the deployment environment, then redeploy.'
    });
  }

  const url = new URL(OTCHARTS_URL);
  url.searchParams.set('venue', 'quotex');
  url.searchParams.set('symbol', symbol);
  url.searchParams.set('tf', tf);
  url.searchParams.set('limit', String(limit));

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);

  try {
    const upstream = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      cache: 'no-store',
      signal: controller.signal
    });

    const raw = await upstream.text();
    if (!upstream.ok) {
      return res.status(502).json({
        error: 'OTCharts candle request failed.',
        upstreamStatus: upstream.status,
        detail: raw.slice(0, 250)
      });
    }

    let data;
    try {
      data = JSON.parse(raw);
    } catch {
      return res.status(502).json({ error: 'OTCharts returned invalid JSON.' });
    }

    const candles = normalizeCandles(data);
    if (candles.length < 25) {
      return res.status(502).json({
        error: `OTCharts returned only ${candles.length} valid candles.`,
        hint: 'Check the symbol, timeframe, API key, and OTCharts account limits.'
      });
    }

    res.setHeader('Cache-Control', 'no-store, max-age=0');
    return res.status(200).json({ symbol, tf: Number(tf), source: 'otcharts', candles });
  } catch (error) {
    const isTimeout = error?.name === 'AbortError';
    return res.status(502).json({
      error: isTimeout ? 'OTCharts request timed out.' : 'Could not reach OTCharts.',
      detail: isTimeout ? 'Upstream timeout after 12 seconds.' : error.message
    });
  } finally {
    clearTimeout(timeout);
  }
}

function normalizeCandles(data) {
  let rows = data?.candles ?? data?.data?.candles ?? data?.data ?? data?.result ?? data;

  if (rows && !Array.isArray(rows)) {
    if (Array.isArray(rows.items)) rows = rows.items;
    else if (Array.isArray(rows.history)) rows = rows.history;
    else if (Array.isArray(rows.candles)) rows = rows.candles;
  }
  if (!Array.isArray(rows)) return [];

  return rows.map((c) => {
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
  }).filter((c) =>
    Number.isFinite(c.time) &&
    Number.isFinite(c.open) &&
    Number.isFinite(c.high) &&
    Number.isFinite(c.low) &&
    Number.isFinite(c.close) &&
    c.close > 0
  ).sort((a, b) => a.time - b.time);
}
