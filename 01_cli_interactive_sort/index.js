const readLine = require("./readline");
const Arr = require("./arr-methods");

const menu = () => {
    readLine.question('Hello. Enter 10 words or digits dividing them in spaces: ', (userInput) => {
        var choice = "";
        const arr = userInput.trim().split(' ');
        const arrStr = Arr.GetArrStrings(arr);
        const arrNum = Arr.GetArrNumbers(arr);
        // console.log(arr);
        // console.log(arrStr);
        // console.log(arrNum);
    
        console.log("How would you like to sort values:");
        console.log("1. Words by name (form A to Z).");
        console.log("2. Show digits from the smallest.");
        console.log("3. Show digits from the bigest.");
        console.log("4. Words by quantity of letters.");
        console.log("5. Only unique words.");
        console.log("6. Only unique words and numbers.");
        readLine.question("Select (1 - 5) and press ENTER: ", (choiceInput) => {
            choice = choiceInput.toLowerCase().trim();
            if (choice === 'exit') {
                readLine.close();
                console.log("Thank's! Bye 🫡");
            } else {
                switch(choice) {
                    case '1': {
                        console.log(Arr.SortAlphabetic(arrStr));
                        break;
                    }
                    case '2': {
                        console.log(Arr.SortNumbersAscending(arrNum));
                        break;
                    }
                    case '3': {
                        console.log(Arr.SortNumbersDescending(arrNum));
                        break;
                    }
                    case '4': {
                        console.log(Arr.SortLetterCountAscending(arrStr));
                        break;
                    }
                    case '5': {
                        console.log(Arr.GetUniqueValues(arrStr));
                        break;
                    }
                    case '6': {
                        console.log(Arr.GetUniqueValues(arr));
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