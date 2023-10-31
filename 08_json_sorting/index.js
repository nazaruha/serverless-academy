const fs = require('fs').promises;
const https = require('https');
const fullURLs = require("./objects");

var countTrue = 0;
var countFalse = 0;
async function MakeRequestWithFetch(url) {
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

async function MakeRequestWithHttps(url){
    let count = 3;
    for (let i = 0; i < count; i++) {
        try {
            const resp = await MakeHttpRequest(url);
            if (resp) {
                const data = JSON.parse(resp);
                if (data.hasOwnProperty('isDone') && data.isDone === true) {
                    countTrue++;
                    return `[Success] ${url}: isDone - True`;
                }
                countFalse++;
                return `[Success] ${url}: isDone - False`;
            }
        } catch (err) {
            // Handling Error
        }
    }
    return `[Fail] ${url}: The endpoint is unavailable`;
}

function MakeHttpRequest(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (resp) => {
            let data = '';
            resp.on('data', (chunk) => {
                data += chunk;
            });
            resp.on('end',() => {
                resolve(data);
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
}

(async () => {
    console.log('*********** USING FETCH ************');
    for (let i = 0; i < fullURLs.length; i++) {
        console.log(await MakeRequestWithFetch(fullURLs[i]))
    }
    console.log(`\nFount True values: ${countTrue},\nFound False values: ${countFalse}`);

    console.log('\n*********** USING HTTPS ************')
    countTrue = 0; countFalse = 0;
    for (let i = 0; i < fullURLs.length; i++) {
        console.log(await MakeRequestWithHttps(fullURLs[i]))
    }
    console.log(`\nFount True values: ${countTrue},\nFound False values: ${countFalse}`);
})();