import type { Config } from "@netlify/functions";
import { sendFootballNotification } from "../lib/telegram";

const Azamat = `<a href="tg://user?id=8534185220">Азамат</a>`;

export default async function handler() {
  const basicMessage =  "го футбол в субботу в 10?"
  return sendFootballNotification({
    members: [
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
    ],
    message: `${Azamat}\n${basicMessage}`,
    pollQuestion: basicMessage,
    pollOptions: ["да", "нет"],
  });
}

export const config: Config = {
  schedule: "30 8 * * 5", // 14:30 Bishkek (UTC+6), пятница
};