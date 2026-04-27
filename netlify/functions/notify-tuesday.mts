import type { Config } from "@netlify/functions";
import { sendFootballNotification } from "./_shared/telegram";

export default async function handler() {
  const basicMessage =  "го футбол завтра в 10?"
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
    message: basicMessage,
    pollQuestion: basicMessage,
    pollOptions: [
      "с Мухаммедом — 4 команды",
      "с Мухаммедом — 5 команд",
      "FootballTime (Душанбинка) — 4 команды",
      "FootballHub — 3 команды (возможно)",
      "нет",
    ],
    allowsMultipleAnswers: true,
  });
}

export const config: Config = {
  schedule: "30 7 * * 2", // 13:30 Bishkek (UTC+6), вторник
};