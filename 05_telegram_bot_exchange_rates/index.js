const axios = require("axios");
const TelegramBot = require('node-telegram-bot-api');
const {weatherAPI, buttons} = require("./objects");

const token = '6917976917:AAEgSNuMh-95G-459Ox7bEzxgAVazexF6mQ';
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Choose the option", buttons.choose_option_buttons);
});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const message = msg.text;

    switch(message) {
        case "Forecast in Rivne, Ukraine": {
            bot.sendMessage(chatId, "Choose the interval", buttons.forecast_buttons);
            break;
        }
        case "At intervals of 3 hours": {
            GetForecast("3", chatId);
            break;
        }
        case "At intervals of 6 hours": {
            GetForecast("6", chatId);
            break;
        }
        case "Exchange rate": {
            bot.sendMessage(chatId, "Choose currency exchange rate", buttons.exchange_buttons)
            break;
        }
        case "USD": {
            break;
        }
        case "EUR": {
            break;
        }
        case "Previous menu": {
            bot.sendMessage(chatId, "Choose the option", buttons.choose_option_buttons);
            break;
        }
    }
});

const GetForecast = (interval, chatId) => {
    const weatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${weatherAPI.lat}&lon=${weatherAPI.lon}&cnt=${weatherAPI.cnt[interval]}&appid=${weatherAPI.appid}&units=${weatherAPI.units["Celsius"]}&lang=${weatherAPI.lang["English"]}`;
    axios.get(weatherURL)
        .then((res) => {
            const data = res.data;
            const list = data.list;
            var str = `Forecast ${interval} hours interval:\n`;
            list.forEach(item => {
                str += `
                    ------
                    Weather: ${item.weather[0].description}
                    Min temperature: ${item.main.temp_min}
                    Max temperature: ${item.main.temp_max}
                    Humidity: ${item.main.humidity}
                    Wind speed: ${item.wind.speed}
                    ------
                `
            });
            bot.sendMessage(chatId, str, buttons.first_button);
        })
        .cathc((err) => {
            bot.sendMessage(chatId, err.toString(), buttons.first_button);
        })
}

