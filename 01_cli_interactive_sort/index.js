const readLine = require("./readline");

const menu = () => {
    readLine.question('Hello. Enter 10 words or digits dividing them in spaces: ', (userInput) => {
        var choice = "";
        const arr = userInput.split(' ');
        console.log(arr);
    
        console.log("How would you like to sort values:");
        console.log("1. Words by name (form A to Z).");
        console.log("2. Show digits from the smallest.");
        console.log("3. Show digits from the bigest.");
        console.log("4. Words by quantity of leters.");
        console.log("5. Only unique words.");
        readLine.question("Select (1 - 5) and press ENTER: ", (choiceInput) => {
            choice = choiceInput.toLowerCase().trim();
            if (choice === 'exit') {
                readLine.close();
                console.log("Thank's! Bye 🫡");
            } else {
                switch(choice) {
                    case '1': {
                        console.log(`Choice #${choice}`);
                        break;
                    }
                    case '2': {
                        console.log(`Choice #${choice}`);
                        break;
                    }
                    case '3': {
                        console.log(`Choice #${choice}`);
                        break;
                    }
                    case '4': {
                        console.log(`Choice #${choice}`);
                        break;
                    }
                    case '5': {
                        console.log(`Choice #${choice}`);
                        break;
                    }
                    default: {
                        console.log("Unknown command. Please, try again.\n");
                        break;
                    }
                }
                menu();
            }
        });
    });
}

menu();