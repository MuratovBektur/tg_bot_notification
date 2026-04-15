import type { Config } from "@netlify/functions";

export default async function handler() {
  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  if (!BOT_TOKEN || !CHAT_ID) {
    console.error("Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID");
    return new Response("Missing env vars", { status: 500 });
  }

  const MEMBERS = [
    "@a_slave_of_habit",
    "@ST_tshaibekov",
    "@Lorderonn",
    "@Toraev23",
    "@EldiiarDzhunusov",
    "@Namazbek0102",
    "@Aitkul_M",
    "@KlimSaifutdinov",
    "@ascetsanjar",
    "@Adzhumabaev_GTS",
  ];

  const mentions = MEMBERS.join(" ");

  const response = await fetch(
    `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: `${mentions}\nго футбол в субботу в 10?`,
        parse_mode: "HTML",
      }),
    },
  );

  const result = await response.json();

  if (!response.ok) {
    console.error("Telegram error:", result);
    return new Response("Telegram error", { status: 500 });
  }

  console.log("Message sent:", result);

  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPoll`, {
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

export const config: Config = {
  schedule: "0 9 * * 5", // 15:00 Bishkek (UTC+6), пятница
};
