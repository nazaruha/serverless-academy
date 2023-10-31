const fs = require('fs').promises;

async function ReadJSON(path) {
    try {
        const data = await fs.readFile(path, 'utf-8');
        try {
            return JSON.parse(data);
        } catch(err) {
            console.log(`Err parse data into json : ${err}`);
            return [];
        }

    } catch(err) {
        console.log(`Err read file : ${err}`);
        return [];
    }
}

async function WriteJSON(path, data) {
    try {
        let dataJSON = JSON.stringify(data, null, 2);
        await fs.writeFile(path, dataJSON, 'utf-8');
        console.log("Data is written to the file \"" + path + "\"");
    } catch(err) {
        console.log(`Err write file : ${err}`);
    }
}

function OptimiseArr(arr) {
    const newArr = [];
    arr.forEach(item => {
        let user = newArr.find(x => x.userId === item.user._id);
        if (user === undefined) {
            let user = {
                userId: item.user._id,
                userName: item.user.name,
                vacations: [
                    {
                        startDate: item.startDate,
                        endDate: item.endDate
                    }
                ]
            }
            newArr.push(user);
        }
        else {
            const userIndex = newArr.indexOf(user);
            newArr[userIndex].vacations.push({
                startDate: item.startDate,
                endDate: item.endDate
            })
        }
    })
    return newArr;
}

(async () => {
    const arr = await ReadJSON('./files/data.json');
    const newArr = OptimiseArr(arr);
    await WriteJSON("./files/newData.json", newArr);
})();
