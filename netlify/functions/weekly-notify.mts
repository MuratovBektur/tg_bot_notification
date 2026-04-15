import type { Config } from "@netlify/functions";

export default async function handler() {
  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
  const MESSAGE = process.env.TELEGRAM_MESSAGE ?? "Еженедельное уведомление!";

  if (!BOT_TOKEN || !CHAT_ID) {
    console.error("Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID");
    return new Response("Missing env vars", { status: 500 });
  }

  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: MESSAGE,
      parse_mode: "HTML",
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    console.error("Telegram error:", result);
    return new Response("Telegram error", { status: 500 });
  }

  console.log("Message sent:", result);

  const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPoll`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      question: "го футбол",
      options: ["да", "нет"],
      is_anonymous: false,
    }),
  });

  return new Response("OK", { status: 200 });
}

// Каждую среду в 12:00 UTC (= 15:00 по Москве UTC+3)
// export const config: Config = {
//   schedule: "0 12 * * 3",
// };

export const config: Config = {
  schedule: "27 9 * * 3", // 09:26 UTC = 15:26 Bishkek (UTC+6),
};
