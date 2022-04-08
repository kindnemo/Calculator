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