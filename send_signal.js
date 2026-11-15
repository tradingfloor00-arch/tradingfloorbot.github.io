const token = process.env.BOT_TOKEN;
const chatId = process.env.CHAT_ID;

// EDIT THESE: side, take profit and stop loss distance
// days: 0=Sun, 1=Mon ... 6=Sat
const pairs = [
  { name: "XAUUSD", days: [1,2,3,4,5], side: "BUY", tp: 15, sl: 8, dp: 2 },
  { name: "BTCUSD", days: [0,1,2,3,4,5,6], side: "BUY", tp: 800, sl: 400, dp: 0 },
  { name: "USDJPY", days: [1,2,3,4,5], side: "BUY", tp: 0.5, sl: 0.3, dp: 3 }
];

async function getPrice(name) {
  if (name === "BTCUSD") {
    const r = await fetch("https://api.coinbase.com/v2/prices/BTC-USD/spot");
    return parseFloat((await r.json()).data.amount);
  }
  const r = await fetch("https://open.er-api.com/v6/latest/USD");
  const rates = (await r.json()).rates;
  return name === "USDJPY" ? rates.JPY : 1 / rates.XAU;
}

async function main() {
  const today = new Date().getUTCDay();
  for (const p of pairs) {
    if (!p.days.includes(today)) continue;
    const entry = await getPrice(p.name);
    const dir = p.side === "BUY" ? 1 : -1;
    const tp = entry + dir * p.tp;
    const sl = entry - dir * p.sl;
    const text =
      "📊 " + p.name + " " + p.side + "\n" +
      "Entry: " + entry.toFixed(p.dp) + "\n" +
      "Take Profit: " + tp.toFixed(p.dp) + "\n" +
      "Stop Loss: " + sl.toFixed(p.dp) + "\n\n" +
      "Blue Pips";
    const res = await fetch("https://api.telegram.org/bot" + token + "/sendMessage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: text })
    });
    console.log(await res.json());
  }
}
main();
