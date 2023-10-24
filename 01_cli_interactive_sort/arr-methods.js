class Arr {
    static GetArrStrings = (arr) => {
        var newArr = new Array();
    
        arr.forEach(element => {
            if (isNaN(element)) {
                newArr.push(element);
            }
        });
    
        return newArr;
    }
    
    static GetArrNumbers = (arr) => {
        var newArr = new Array();
    
        arr.forEach(element => {
            if (!isNaN(element)) {
                newArr.push(Number(element));
            }
        });
    
        return newArr;
    }

    static SortAlphabetic = (arr) => arr.sort((a,b) => a.localeCompare(b));

    static SortLetterCountAscending = (arr) => arr.sort((a,b) => a.length - b.length);

    static GetUniqueValues = (arr) => [... new Set(arr)];

    static SortNumbersAscending = (arr) => arr.sort((a,b) => a-b);

    static SortNumbersDescending = (arr) => arr.sort((a,b) => b-a);
}

module.exports = Arr