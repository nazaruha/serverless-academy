const fs = require('fs').promises;
const fullURLs = require("./objects");

async function MakeRequest(url) {
    let count = 3;
    for (let i = 0; i < count; i++) {
        try {
            const resp = await fetch(url);
            if (resp.ok) {
                if (resp.includes("\"isDone\": true") || resp.includes("\'isDone\': true") || resp.includes("isDone: true")) {
                    return `[Success] ${url}: isDone - True`;
                }
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
})();