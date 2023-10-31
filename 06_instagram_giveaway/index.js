const fs = require('fs').promises;

async function processFile(path, wordCounts) {
    try {
        const data = await fs.readFile(path, 'utf-8');
        const fileWords = data.split('\n');
        const uniqueFileWords = [...new Set(fileWords)];
        uniqueFileWords.forEach(item => {
            if (wordCounts[item] === undefined) {
                wordCounts[item] = 1;
            } else {
                wordCounts[item]++;
            }
        });
    } catch (err) {
        console.log(`Error reading file "${path}": ${err.message}`);
        return [];
    }
}
async function uniqueValues() {
    let wordCounts = {};
    let wordsArr = [];

    for (let i = 0; i < 20; i++) {
        const path = `./words/out${i}.txt`;
        await processFile(path, wordCounts);
        wordsArr = Object.keys(wordCounts).map(name => ({ name, count: wordCounts[name] }));
    }
    return wordsArr;
}

async function existInAllFiles(arr) {
    return arr.filter(x => x.count === 20).length;
}

async function existInAtLeastTen(arr) {
    return arr.filter(x => x.count >= 10).length;
}

(async () => {
    const startTime = new Date();
    const arr = await uniqueValues();
    console.log(`Unique values: ${arr.length}`);
    console.log(`Exists in all files: ${await existInAllFiles(arr)}`);
    console.log(`Exist in at least ten: ${await existInAtLeastTen(arr)}`);
    const endTime = new Date();
    console.log(`Час виконання: ${endTime - startTime} мс`);
})();











