const weatherAPI = {
    lat: "50.6196175",
    lon: "26.2513165",
    appid: "18a2165c7cf02561da97f430a93fd424",
    cnt: {
        '3': 3,
        '6': 6
    },
    units: {
        "Fahrenheit":  "imperial",
        "Celsius": "metric",
        "Kelvin": "" // default
    },
    lang: {
        "Ukrainian": "uk",
        "English": "en"
    }
}

const BanksAPI = {
    privat: "https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=5",
    mono: "https://api.monobank.ua/bank/currency"
};

const MonoCacheMessages = {
    "USD": "",
    "EUR": ""
};

const buttons = {
    choose_option_buttons: {
        reply_markup: {
            keyboard: [
                ["Forecast in Rivne, Ukraine", "Exchange rate"],
            ],
            one_time_keyboard: true,
        },
    },
    forecast_buttons: {
        reply_markup: {
            keyboard: [
                ["At intervals of 3 hours", "At intervals of 6 hours"],
                ["Previous menu"]
            ],
            one_time_keyboard: true,
        },
    },
    exchange_buttons: {
        reply_markup: {
            keyboard: [
                ["USD", "EUR"],
                ["Previous menu"]
            ],
            one_time_keyboard: true,
        }
    }
}

module.exports = {
    weatherAPI,
    BanksAPI,
    MonoCacheMessages,
    buttons
};