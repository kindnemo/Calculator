const nums = document.querySelectorAll(".num");
const allClear = document.querySelector("#all-clear");
const processing = document.querySelector("#processing");
const answer = document.querySelector("#answer");
const delBtn = document.querySelector("#delete");



let numArr = [];  //numArr for using it later in processing the strings
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


// Display populator
function populate(){
    numArr.push(this.textContent);
    processing.textContent = numArr.join('');
}

// Clearing the display
function clear(){
    processing.textContent = "";
    answer.textContent = "";
    numArr = [];
}

// Delete button function 
function del(){
    numArr.pop();
    processing.textContent = numArr.join('');
}


nums.forEach(ele => ele.addEventListener("click", populate));
allClear.addEventListener("click", clear);
delBtn.addEventListener("click", del);