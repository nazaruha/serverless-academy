const fs = require('fs');
const https = require('https');
const { program } = require('commander');
const TelegramBot = require('node-telegram-bot-api');

program.version('11.1.0');

const token = '6917976917:AAEgSNuMh-95G-459Ox7bEzxgAVazexF6mQ';
const bot = new TelegramBot(token);

// commands help
program.command('send-message <message>').description('Send message to Telegram Bot.')
    .alias('m')
    .action((message) => {
        fs.readFile('./chatId.txt', 'utf-8', (err, data) => {
            if (err) {
              console.error('Помилка читання файлу: ' + err);
            } else {
              chatId = parseInt(data, 10);
              bot.sendMessage(chatId, message)
                    .then(resp => {}).catch(err => console.log("Enter /start command in your TelegramBot"))
            }
        });
    });

program.command('send-photo <path>').description('Send photo to Telegram Bot. Just drag and drop it console after p-flag.')
    .alias('p')
    .action((path) => {
        fs.readFile('./chatId.txt', 'utf-8', (err, data) => {
            if (err) {
              console.error('Помилка читання файлу: ' + err);
            } else {
              chatId = parseInt(data, 10);
              bot.sendPhoto(chatId, path)
                    .then(resp => {}).catch(err => console.log("Enter /start command in your TelegramBot"))
            }
        });
    })



program.parse(process.argv);