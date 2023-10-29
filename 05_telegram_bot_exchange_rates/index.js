const axios = require("axios");
const NodeCache = require( "node-cache" );
const TelegramBot = require('node-telegram-bot-api');
const {weatherAPI, BanksAPI, MonoCacheMessages, buttons} = require("./objects");

const myCache = new NodeCache();
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
            GetExchangeRate("USD", chatId);
            break;
        }
        case "EUR": {
            GetExchangeRate("EUR", chatId);
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

const GetExchangeRate = async (currency, chatId) => {
    let privatMsg = await GetExchangeRatePrivat(currency);
    let monoMsg = await GetExchangeRateMono(currency);
    bot.sendMessage(chatId, privatMsg + monoMsg, buttons.choose_option_buttons);
}

const GetExchangeRatePrivat = async (currency) => {
    try {
        let message = "🟢🟢🟢PRIVAT BANK🟢🟢🟢\n";
        const response = await axios.get(BanksAPI.privat);
        const data = response.data;
        const rateCurrency = data.find(x => x.ccy.includes(currency));
        if (currency == "USD")
            message += `BUY: ${rateCurrency.buy} 💵\nSELL: ${rateCurrency.sale} 💵\n\n`
        else if (currency == "EUR")
            message += `BUY: ${rateCurrency.buy} 💶\nSELL: ${rateCurrency.sale} 💶\n\n`
        return message;
    }
    catch (err) {
        console.log(`ERR PRIVAT ${currency}`, err);
    }
}

const GetExchangeRateMono = async (currency) => {
    let message = "⚫️⚫️⚫️MONO BANK⚫️⚫️⚫️\n";
    try {
        const response = await axios.get(BanksAPI.mono);
        const data = response.data;

        const rateUSD = data.find(x => x.currencyCodeA == 840 && x.currencyCodeB == 980);
        if (rateUSD !== null) {
            MonoCacheMessages["USD"] = `BUY: ${rateUSD.rateBuy} 💵\nSELL: ${rateUSD.rateSell} 💵\n`;
            myCache.set("MonoUSD", MonoCacheMessages["USD"], 10000);
        } else {
            myCache.set("MonoUSD", "unknown", 10000);
        }
        
        const rateEUR = data.find(x => x.currencyCodeA == 978 && x.currencyCodeB == 980);
        if (rateEUR !== null) {
            MonoCacheMessages["EUR"] = `BUY: ${rateEUR.rateBuy} 💶\nSELL: ${rateEUR.rateSell} 💶\n`;
            myCache.set("MonoEUR", MonoCacheMessages["EUR"], 10000);
        } else {
            myCache.set("MonoEUR", "unknown", 10000);
        }
        
        return message + MonoCacheMessages[currency];
    }
    catch (err) {
        let key =`Mono${currency}`;
        const result = myCache.get(key);
        return message + result;
    }
}
