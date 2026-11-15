// send_signal.js - uses the same rule-based engine as the TradingFloor AI website
// (EMA + RSI + breakout + ATR), pulls live candles, sends the best setup to Telegram.
// Needs Node 22+ (built-in fetch and WebSocket).

const token = process.env.BOT_TOKEN;
const chatId = process.env.CHAT_ID;

/* ---------- EDIT HERE: pairs ---------- */
const PAIRS = {
  XAUUSD:    { label: "XAUUSD (Gold)",         kind: "forex",  dp: 2, yahoo: ["XAUUSD=X", "GC=F"] },
  USDJPY:    { label: "USDJPY",                kind: "forex",  dp: 3, yahoo: ["USDJPY=X"] },
  BTCUSD:    { label: "BTCUSD",                kind: "crypto", dp: 2, binance: "BTCUSDT", kraken: "XBTUSD" },
  R_75:      { label: "Volatility 75 Index",   kind: "deriv",  dp: 2 },
  BOOM1000:  { label: "Boom 1000 Index",       kind: "deriv",  dp: 3 },
  CRASH1000: { label: "Crash 1000 Index",      kind: "deriv",  dp: 3 }
};

// Run 0 = 05:30 UTC, run 1 = 12:30 UTC, run 2 = 13:30 UTC.
const WEEKDAY_PLAN = [["XAUUSD", "BTCUSD"], ["USDJPY", "XAUUSD"], ["BTCUSD", "USDJPY"]];
const WEEKEND_PLAN = [["BTCUSD", "R_75"], ["BOOM1000", "CRASH1000"], ["BTCUSD"]];

const TFS = [
  { name: "1H",  bq: "1h",  bin: "1h",  kraken: 60, deriv: 3600, yahoo: { interval: "60m", range: "1mo" }, bonus: 10 },
  { name: "15M", bq: "15m", bin: "15m", kraken: 15, deriv: 900,  yahoo: { interval: "15m", range: "5d" },  bonus: 0 }
];

const SCHEDULE_SLOTS = { "30 5 * * *": 0, "30 12 * * *": 1, "30 13 * * *": 2 };

/* ---------- helpers ---------- */
async function getJson(url, timeout = 15000) {
  const c = new AbortController();
  const t = setTimeout(() => c.abort(), timeout);
  try {
    const r = await fetch(url, {
      signal: c.signal,
      headers: { "User-Agent": "Mozilla/5.0", "Accept": "application/json" }
    });
    if (!r.ok) throw new Error("HTTP " + r.status);
    return await r.json();
  } finally {
    clearTimeout(t);
  }
}

function normalize(raw) {
  let rows = Array.isArray(raw) ? raw : (raw?.bars || raw?.candles || raw?.data || raw?.ohlc || raw?.results || raw?.history || []);
  if (rows && !Array.isArray(rows) && typeof rows === "object") rows = Object.values(rows);
  if (!Array.isArray(rows)) return [];
  return rows.map(x => {
    if (Array.isArray(x)) return { t: Number(x[0]), o: Number(x[1]), h: Number(x[2]), l: Number(x[3]), c: Number(x[4]) };
    const time = x.openTime ?? x.t ?? x.time ?? x.timestamp ?? x.epoch ?? x.open_time;
    return {
      t: typeof time === "string" && !/^\d+(\.\d+)?$/.test(time) ? Date.parse(time) : Number(time),
      o: Number(x.o ?? x.open), h: Number(x.h ?? x.high), l: Number(x.l ?? x.low), c: Number(x.c ?? x.close ?? x.price)
    };
  }).filter(c => [c.o, c.h, c.l, c.c].every(Number.isFinite)).sort((a, b) => (a.t || 0) - (b.t || 0));
}

/* ---------- candle feeds ---------- */
async function fromBiQuote(sym, tf) {
  const raw = await getJson("https://biquote.io/api/" + sym + "/ohlc?interval=" + tf + "&limit=180");
  return normalize(raw?.bars ? raw.bars : raw);
}

async function fromYahoo(sym, y) {
  const raw = await getJson("https://query1.finance.yahoo.com/v8/finance/chart/" + encodeURIComponent(sym) +
    "?interval=" + y.interval + "&range=" + y.range);
  const r = raw.chart.result[0], q = r.indicators.quote[0];
  return r.timestamp.map((t, i) => ({ t: t * 1000, o: q.open[i], h: q.high[i], l: q.low[i], c: q.close[i] }))
    .filter(c => [c.o, c.h, c.l, c.c].every(Number.isFinite));
}

async function fromBinance(sym, tf) {
  const bases = ["https://data-api.binance.vision/api/v3", "https://api.binance.com/api/v3"];
  let err;
  for (const b of bases) {
    try {
      const raw = await getJson(b + "/klines?symbol=" + sym + "&interval=" + tf + "&limit=180");
      return raw.map(k => ({ t: +k[0], o: +k[1], h: +k[2], l: +k[3], c: +k[4] }));
    } catch (e) { err = e; }
  }
  throw err;
}

async function fromKraken(pair, minutes) {
  const raw = await getJson("https://api.kraken.com/0/public/OHLC?pair=" + pair + "&interval=" + minutes);
  const key = Object.keys(raw.result).find(k => k !== "last");
  return raw.result[key].map(k => ({ t: +k[0] * 1000, o: +k[1], h: +k[2], l: +k[3], c: +k[4] }));
}

function derivOnce(url, symbol, gran) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(url);
    const timer = setTimeout(() => { try { ws.close(); } catch {} reject(new Error("Deriv timeout")); }, 15000);
    ws.onopen = () => ws.send(JSON.stringify({
      ticks_history: symbol, style: "candles", granularity: gran, count: 250, end: "latest", req_id: 1
    }));
    ws.onmessage = ev => {
      let d; try { d = JSON.parse(ev.data); } catch { return; }
      if (d.error) { clearTimeout(timer); ws.close(); return reject(new Error(d.error.message)); }
      if (d.candles) {
        clearTimeout(timer); ws.close();
        resolve(d.candles.map(c => ({ t: +c.epoch, o: +c.open, h: +c.high, l: +c.low, c: +c.close })));
      }
    };
    ws.onerror = () => { clearTimeout(timer); reject(new Error("Deriv connection error")); };
  });
}

async function fromDeriv(symbol, gran) {
  const urls = [
    "wss://api.derivws.com/trading/v1/options/ws/public",
    "wss://ws.derivws.com/websockets/v3?app_id=1089"
  ];
  let err;
  for (const u of urls) {
    try { return await derivOnce(u, symbol, gran); } catch (e) { err = e; }
  }
  throw err;
}

async function getCandles(key, tf) {
  const p = PAIRS[key], errs = [], sources = [];
  if (p.kind === "forex") {
    sources.push(["BiQuote", () => fromBiQuote(key, tf.bq)]);
    p.yahoo.forEach(s => sources.push(["Yahoo " + s, () => fromYahoo(s, tf.yahoo)]));
  } else if (p.kind === "crypto") {
    sources.push(["Binance", () => fromBinance(p.binance, tf.bin)]);
    sources.push(["Kraken", () => fromKraken(p.kraken, tf.kraken)]);
  } else {
    sources.push(["Deriv", () => fromDeriv(key, tf.deriv)]);
  }
  for (const [name, fn] of sources) {
    try {
      const cs = await fn();
      if (cs.length >= 35) return { cs, source: name };
      errs.push(name + ": only " + cs.length + " candles");
    } catch (e) { errs.push(name + ": " + e.message); }
  }
  throw new Error(errs.join(" | "));
}
/* ---------- signal engine (same logic as the website) ---------- */
function ema(vals, p) {
  if (!vals.length) return [];
  const k = 2 / (p + 1), out = [vals[0]];
  for (let i = 1; i < vals.length; i++) out.push(vals[i] * k + out[i - 1] * (1 - k));
  return out;
}
function rsi(vals, p = 14) {
  if (vals.length < p + 1) return 50;
  let g = 0, l = 0;
  for (let i = vals.length - p; i < vals.length; i++) { const d = vals[i] - vals[i - 1]; if (d > 0) g += d; else l -= d; }
  if (!l) return 100;
  return 100 - 100 / (1 + (g / p) / (l / p));
}
function atr(cs, p = 14) {
  if (cs.length < 2) return 0;
  const trs = [];
  for (let i = 1; i < cs.length; i++) trs.push(Math.max(cs[i].h - cs[i].l, Math.abs(cs[i].h - cs[i - 1].c), Math.abs(cs[i].l - cs[i - 1].c)));
  const a = trs.slice(-p);
  return a.reduce((s, v) => s + v, 0) / (a.length || 1);
}
function analyzeCandles(cs) {
  if (!Array.isArray(cs) || cs.length < 35) return { dir: "WAIT", score: 0 };
  const close = cs.map(c => c.c), n = close.length, last = cs[n - 1], prev = cs[n - 2];
  const ef = ema(close.slice(-100), 9).at(-1), es = ema(close.slice(-120), 21).at(-1), rv = rsi(close), av = atr(cs);
  let bull = 0, bear = 0;
  if (ef > es) bull++; else if (ef < es) bear++;
  if (last.c > ef) bull++; else if (last.c < ef) bear++;
  if (rv >= 52 && rv < 72) bull++; else if (rv <= 48 && rv > 28) bear++;
  if (last.c > prev.c) bull++; else if (last.c < prev.c) bear++;
  const prior = cs.slice(-21, -1), hi = Math.max(...prior.map(c => c.h)), lo = Math.min(...prior.map(c => c.l));
  if (last.c > hi) bull += 2;
  if (last.c < lo) bear += 2;
  const score = Math.min(100, Math.round(Math.max(bull, bear) / 6 * 100));
  const dir = (bull >= 4 && bull >= bear + 2) ? "BUY" : (bear >= 4 && bear >= bull + 2) ? "SELL" : "WAIT";
  const entry = last.c;
  const sl = dir === "BUY" ? entry - 1.5 * av : dir === "SELL" ? entry + 1.5 * av : null;
  const tp = dir === "BUY" ? entry + 2.5 * av : dir === "SELL" ? entry - 2.5 * av : null;
  return { dir, score, entry, sl, tp };
}

/* ---------- run ---------- */
let hadFeedError = false;

async function bestSetup(key) {
  const results = [];
  for (const tf of TFS) {
    try {
      const { cs, source } = await getCandles(key, tf);
      const a = analyzeCandles(cs);
      console.log(key, tf.name, a.dir, a.score + "%", "via", source);
      if (a.dir !== "WAIT") results.push({ ...a, tf: tf.name, source, rank: a.score + tf.bonus });
    } catch (e) {
      hadFeedError = true;
      console.log(key, tf.name, "FEED ERROR:", e.message);
    }
  }
  results.sort((x, y) => y.rank - x.rank);
  return results[0] || null;
}

async function sendTelegram(text) {
  const res = await fetch("https://api.telegram.org/bot" + token + "/sendMessage", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text })
  });
  const out = await res.json();
  console.log("Telegram:", out.ok ? "sent" : JSON.stringify(out));
  if (!out.ok) hadFeedError = true;
}

function currentSlot() {
  const s = SCHEDULE_SLOTS[process.env.SCHEDULE];
  if (s !== undefined) return s;
  const h = new Date().getUTCHours();
  return h < 10 ? 0 : h < 13 ? 1 : 2;
}

async function main() {
  const day = new Date().getUTCDay();
  const plan = (day === 0 || day === 6) ? WEEKEND_PLAN : WEEKDAY_PLAN;
  const keys = plan[currentSlot()] || [];
  console.log("Run slot", currentSlot(), "pairs:", keys.join(", "));
  for (const key of keys) {
    const p = PAIRS[key];
    const s = await bestSetup(key);
    if (!s) { console.log(key, "no clear setup, nothing sent"); continue; }
    const text =
      "📊 " + p.label + " " + s.dir + " (" + s.tf + ")\n" +
      "Entry: " + s.entry.toFixed(p.dp) + "\n" +
      "Take Profit: " + s.tp.toFixed(p.dp) + "\n" +
      "Stop Loss: " + s.sl.toFixed(p.dp) + "\n" +
      "Confluence: " + s.score + "%\n\n" +
      "Blue Pips";
    await sendTelegram(text);
  }
}

main().then(() => process.exit(hadFeedError ? 1 : 0)).catch(e => { console.error(e); process.exit(1); });
