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

const buttons = {
    first_button: {
        reply_markup: {
            keyboard: [
                ["Forecast in Rivne, Ukraine"],
            ],
            one_time_keyboard: true,
        },
    },
    second_buttons: {
        reply_markup: {
            keyboard: [
                ["At intervals of 3 hours", "At intervals of 6 hours"],
            ],
            one_time_keyboard: true,
        },
    }
}

module.exports = {
    weatherAPI,
    buttons
};