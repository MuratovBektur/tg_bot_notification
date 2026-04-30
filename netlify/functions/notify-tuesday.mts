import type { Config } from "@netlify/functions";
import { sendFootballNotification } from "../lib/telegram.mts";

const Azamat = `<a href="tg://user?id=8534185220">Азамат</a>`;

export default async function handler() {
  const basicMessage =  "го футбол завтра в 10:30?"
  return sendFootballNotification({
    members: [
      "@a_slave_of_habit",
      "@ST_tshaibekov",
      "@Lorderonn",
      "@Toraev23",
      "@Namazbek0102",
      "@Aitkul_M",
      "@ascetsanjar",
    ],
    message: `${Azamat}\n${basicMessage}`,
    pollQuestion: basicMessage,
    pollOptions: [
      "Да",
      "Нет",
    ],
  });
}

export const config: Config = {
  schedule: "30 7 * * 2", // 13:30 Bishkek (UTC+6), вторник
};