const axios = require("axios");
const TelegramBot = require('node-telegram-bot-api');
const {weatherAPI} = require("./objects");

const weatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${weatherAPI.lat}&lon=${weatherAPI.lon}&cnt=${weatherAPI.cnt["3"]}&appid=${weatherAPI.appid}&units=${weatherAPI.units["Celsius"]}&lang=${weatherAPI.lang["English"]}`;
const token = "";

axios.get(weatherURL)
    .then((res) => {
        const data = res.data;
        const list = data.list;
        const city = data.city;
        const weather = list[0].weather[0];
        console.log(weather.description)
    }).catch(err => console.log(err));

