const inquirer = require("inquirer");
const FileWork = require("./file-work");
const UserValidator = require("./user");

/* MY CODE */

var users = [];

const questions = [
    {
        type: "input",
        name: "name",
        message: "Enter the user's name. To cancel press ENTER:",
    },
    {
        type: "list",
        name: "gender",
        message: "Choose your gender.",
        choices: [ "male", "female" ],
        when(answer) {
            return answer.name !== '';
        }
    },
    {
        type: "input",
        name: "age",
        message: "Enter your age:",
        default() {
            return 0;
        },
        validate: (age) => {
            if (!Number.isInteger(+age)) {
                return "Value must be an integer";
            }
            return true;
        },
        when(answer) {
            return answer.name !== '';
        }
    },
    {
        type: "confirm",
        name: "checked",
        message: "Would you like to search values in DB?",
        default: true,
        when(answer) {
            return answer.name === '';
        }
    }
];

const ask = (fs, path) => {
    inquirer.prompt(questions)
        .then(answers => {
            if (answers.name !== '') {
                const user = {
                    name: '',
                    gender: '',
                    age: 0
                };
                user.name = UserValidator.NameValidate(answers.name);
                user.gender = answers.gender;
                user.age = answers.age;
                users.push(user);
                const usersJSON = JSON.stringify(users, null, 2);
                fs.AddUser(path, usersJSON);
                ask(fs, path);
                // console.dir(answers, {color: true});
            }
            else if (answers.checked) {
                console.log(users);
                return inquirer.prompt([
                    {
                        type: "input",
                        name: "searchUser",
                        message: "Enter user's name you wanna find in DB:",
                    }
                ]).then(answer => {
                    const name = UserValidator.NameValidate(answer.searchUser);
                    const searchUsers = users.filter(x => x.name.toLowerCase() === name.toLowerCase());
                    if (searchUsers.length == 0) {
                        console.log(`User ${name} is not found`);
                    } else if (searchUsers.length == 1) {
                        console.log(`User ${name} is found`);
                        console.log(searchUsers[0]);
                    } else {
                        console.log(`Users by the name \'${name}\' are found`);
                        console.log(searchUsers);
                    }
                }).catch(err => console.log(err));
            }
            else if (!answers.checked) {
                console.log("Good-bye 🫡");
            }
        })
        .catch(error => {
            console.log("ERR: ", error);
        })
}

const main = () => {
    const dir = "docs", file = "user.txt", path = `./${dir}/${file}`;
    const fs = new FileWork(dir, file); // create file to store users

    fs.GetUsers(path)
        .then(data => {
            users = data;
            // console.log(users);
        })
        .catch(err => console.log(err));

    ask(fs, path);    
}

main();