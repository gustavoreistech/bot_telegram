const axios = require("axios");
const API_KEY = "numero-token";

const openai = axios.create({
  baseURL: "https://api.openai.com/v1/engines/davinci/jobs",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${API_KEY}`
  }
});

const TelegramBot = require("node-telegram-bot-api");
const TELEGRAM_BOT_TOKEN = "meu-token";

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const userMessage = msg.text;

  // Envia a mensagem do usuário para o OpenAI
  const response = await openai.post("", {
    prompt: userMessage,
    max_tokens: 100,
    n: 1,
    stop: ["User:"]
  });

  // Envia a resposta do OpenAI de volta para o usuário
  const reply = response.data.choices[0].text.split("\n")[0];
  bot.sendMessage(chatId, reply);
});
