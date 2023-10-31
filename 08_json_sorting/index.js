const fs = require('fs').promises;
const fullURLs = require("./objects");

var countTrue = 0;
var countFalse = 0;
async function MakeRequest(url) {
    let count = 3;
    for (let i = 0; i < count; i++) {
        try {
            const resp = await fetch(url);
            if (resp.ok) {
                if (resp.includes("\"isDone\": true") || resp.includes("\'isDone\': true") || resp.includes("isDone: true")) {
                    countTrue++;
                    return `[Success] ${url}: isDone - True`;
                }
                countFalse++;
                return `[Success] ${url}: isDone - False`;
            }
        } catch(err) {
            // Handling Error
        }
    }
    return `[Fail] ${url}: The endpoint is unavailable`;
}

(async () => {
    for (let i = 0; i < fullURLs.length; i++) {
        console.log(await MakeRequest(fullURLs[i]))
    }
    console.log(`\nFount True values: ${countTrue},\nFound False values: ${countFalse}`);
})();