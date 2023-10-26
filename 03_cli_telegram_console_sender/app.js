const fs = require('fs');
const TelegramBot = require('node-telegram-bot-api');
const token = '6917976917:AAEgSNuMh-95G-459Ox7bEzxgAVazexF6mQ';

const bot = new TelegramBot(token, { polling: true });

bot.on('message', (msg) => {

    const chatId = msg.chat.id;
    const text = msg.text;

    fs.writeFileSync('chatId.txt', chatId.toString(), 'utf-8');

    bot.sendMessage(chatId, 'Here is your message: ' + text);
});
