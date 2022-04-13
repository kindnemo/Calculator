// MATH OPERATOR FUNCTIONS
function addition(arr){
    let total = arr.reduce(function (prev, curr){
        return prev + curr;
    });
    return total;
}

function subtract(arr){
    let total = arr.reduce(function (prev, curr){
        return prev - curr;
    });

    return total;
}
function multiply(arr){
    let total = arr.reduce(function (prev, curr){
        return prev*curr;
    });

    return total;
}
function divide(arr){
    let total = arr.reduce(function (prev, curr){
        return prev/curr;
    });

    return total;
}
// MATH OPERATOR FUNCTIONS

// Main Operator Function that calls every other operator
function operate(opr, arr){
    switch(opr){
        case '+':
            return addition(arr);
        case "-":
            return subtract(arr);
        case "*":
            return multiply(arr);
        case "/":
            return divide(arr);
        default:
            return "Sorry no cases found";
    }
}