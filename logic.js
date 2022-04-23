const nums = document.querySelectorAll(".num");
const allClear = document.querySelector("#all-clear");
const processing = document.querySelector("#processing");
const answerDisplay = document.querySelector("#answer");
const answerKey = document.querySelector("#answerKey");
const delBtn = document.querySelector("#delete");
const functKeys = document.querySelectorAll(".funct");


const specialChar = /[`!@#$%^&*()_+−×÷\-=\[\]{};':"\\|,<>\/?~]/;  //Regex used to seperate numbers and store them in list;


let numArr = [];  //numArr for using it later in processing the strings
let oprArr = []; //oprArr for using the operation to be performed on the numbers
let operTorf = false; //Used to prevent insertion of operators more than one times in a row


// MATH OPERATOR FUNCTIONS
function addition(arr){
    let total = arr.reduce(function (prev, curr){
        return parseFloat(prev) + parseFloat(curr);
    });
    return total;
}

function subtract(arr){
    let total = arr.reduce(function (prev, curr){
        return parseFloat(prev) - parseFloat(curr);
    });

    return total;
}
function multiply(arr){
    let total = arr.reduce(function (prev, curr){
        return parseFloat(prev) * parseFloat(curr);
    });

    return total;
}
function divide(arr){
    let total = arr.reduce(function (prev, curr){
        return parseFloat(prev) / parseFloat(curr);
    });

    return total;
}
// MATH OPERATOR FUNCTIONS

// Main Operator Function that calls every other operator
function operate(opr, arr){
    switch(opr){
        case "divide":
            return divide(arr);
        case "multiply":
            return multiply(arr);
        case 'add':
            return addition(arr);
        case "sub":
            return subtract(arr);
        default:
            return "Sorry no cases found";
    }
}


// Display populator
function populate(){
    if(!operTorf){
        operTorf = true;
    }
    numArr.push(this.textContent);
    processing.textContent = numArr.join('');
}

// Clearing the display
function clear(){
    processing.textContent = "";
    answerDisplay.textContent = "";
    numArr = [];
    oprArr = [];
}

// Delete button function 
function del(){
    numArr.pop();
    processing.textContent = numArr.join('');
}

// Add Symbols to display
function symbAdd(){
    if(!operTorf){
        return;
    }
    let symbol = this.getAttribute("data-function")
    let toAdd;
    switch(symbol){
        case "mod":
            toAdd = "%";
            break;
        case "add":
            toAdd =  "+";
            break;
        case "sub":
            toAdd = "−";
            break;
        case "multiply":
            toAdd = "×";
            break;
        case "divide":
            toAdd = "÷";
            break;

    }
    numArr.push(toAdd);
    oprArr.push(symbol);
    processing.textContent = numArr.join('');
    operTorf = false;
}


// Answering Function
function answer(){
    finalArr = numArr.join("").split(specialChar);
    // oprArr.map(ele => {
    //     answerDisplay.textContent =  operate(ele, finalArr);   //BUG FOUND
    // })
    let finalAnswer;
    
    finalAnswer = operate(oprArr[0], finalArr);
    
    finalArr.splice(0,2);
    finalArr.unshift(finalAnswer);
    
}


nums.forEach(ele => ele.addEventListener("click", populate));
allClear.addEventListener("click", clear);
delBtn.addEventListener("click", del);
functKeys.forEach(ele=>ele.addEventListener("click", symbAdd));
answerKey.addEventListener("click", answer);