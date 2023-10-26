const fs = require('fs');

class FileWork {
    constructor(dir, file) {
        this.CreateDir(`./${dir}`);
        this.CreateFile(`./${dir}/${file}`)
    }

    CreateDir(dir) {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, (err) => {
                if (err) {
                    console.log(err);
                }
            });
        }
    }

    CreateFile(file) {
        if (!fs.existsSync(file)) {
            fs.writeFile(file, "", (err) => {
                if (err) {
                    console.log(err);
                }
            })
        }
    }

    AddUser(path, user) {
        if (fs.existsSync(path)) {
            fs.writeFile(path, user, "utf-8", (err) => {
                if (err) {
                    console.log(`ERR APPEDING USER: ${err}`);
                }
            });
        }
    }

    GetUsers(path) {
        return new Promise((resolve, reject) => {
            if (fs.existsSync(path)) {
                fs.readFile(path, "utf-8", (err, data) => {
                    if (err) {
                        reject("error read file", err);
                    } else {
                        try {
                            const users = JSON.parse(data);
                            resolve(users);
                        } catch(err) {
                            resolve([]);
                        }
                    }
                })
            } else {
                reject("file doesn't exist");
            }
        })
    }
}

module.exports = FileWork;