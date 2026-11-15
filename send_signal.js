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

// Which pairs each run tries. Run 0 = 05:30 UTC, run 1 = 12:30 UTC, run 2 = 13:30 UTC.
// Weekdays: 2 signals each for gold, bitcoin, USDJPY (6 a day).
const WEEKDAY_PLAN = [["XAUUSD", "BTCUSD"], ["USDJPY", "XAUUSD"], ["BTCUSD", "USDJPY"]];
// Weekends: 5 signals (bitcoin x2 + Deriv synthetics).
const WEEKEND_PLAN = [["BTCUSD", "R_75"], ["BOOM1000", "CRASH1000"], ["BTCUSD"]];

// Timeframes checked for every pair. The 1H gets a small bonus so higher timeframe wins ties.
const TFS = [
  { name: "1H",  bq: "1h",  bin: "1h",  kraken: 60, deriv: 3600, yahoo: { interval: "60m", range: "1mo" }, bonus: 10 },
  { name: "15M", bq: "15m", bin: "15m", kraken: 15, deriv: 900,  yahoo: { interval: "15m", range: "5d" },  bonus: 0 }
];

const SCHEDULE_SLOTS = { "30 5 * * *": 0, "30 12 * * *": 1, "30 13 * * *": 2 };

/* ---------- helpers ---------- */
