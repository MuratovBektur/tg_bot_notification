const BASE_URL = (token: string) => `https://api.telegram.org/bot${token}`;

async function sendMessage(
  token: string,
  chatId: string,
  text: string,
  parseMode: "HTML" | "Markdown" = "HTML"
): Promise<void> {
  const response = await fetch(`${BASE_URL(token)}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: parseMode }),
  });

  const result = await response.json();
  if (!response.ok) throw new Error(`sendMessage failed: ${JSON.stringify(result)}`);
}

async function sendPoll(
  token: string,
  chatId: string,
  question: string,
  options: string[],
  allowsMultipleAnswers = false
): Promise<void> {
  await fetch(`${BASE_URL(token)}/sendPoll`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      question,
      options,
      is_anonymous: false,
      allows_multiple_answers: allowsMultipleAnswers,
    }),
  });
}

function getEnv(): { BOT_TOKEN: string; CHAT_ID: string } {
  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
  if (!BOT_TOKEN || !CHAT_ID) throw new Error("Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID");
  return { BOT_TOKEN, CHAT_ID };
}

interface NotificationConfig {
  members: string[];
  message: string;
  pollQuestion: string;
  pollOptions: string[];
  allowsMultipleAnswers?: boolean;
}

export async function sendFootballNotification(cfg: NotificationConfig): Promise<Response> {
  try {
    const { BOT_TOKEN, CHAT_ID } = getEnv();
    const mentions = cfg.members.join(" ");

    await sendMessage(BOT_TOKEN, CHAT_ID, `${mentions}\n${cfg.message}`);
    await sendPoll(BOT_TOKEN, CHAT_ID, cfg.pollQuestion, cfg.pollOptions, cfg.allowsMultipleAnswers);
  } catch (e) {
    console.error(e);
    return new Response("Error", { status: 500 });
  }

  return new Response("OK", { status: 200 });
}