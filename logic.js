const nums = document.querySelectorAll(".num");
const allClear = document.querySelector("#all-clear");
const processing = document.querySelector("#processing");
const answerDisplay = document.querySelector("#answer");
const answerKey = document.querySelector("#answerKey");
const delBtn = document.querySelector("#delete");
const functKeys = document.querySelectorAll(".funct");


const specialChar = /[`!@#$%^&*()_+−×÷\-=\[\]{};':"\\|,<>\/?~]/;  //Regex used to seperate numbers and store them in list;


let numArr = [];  //numArr for using it later in processing the strings
let secArr = [];
let oprArr = []; //oprArr for using the operation to be performed on the numbers
let operTorf = false; //Used to prevent insertion of operators more than one times in a row
let trigAns = false; //Using this to trigger the answer function only when 
let oprArrIndex = 0; //Using this to increment the oprArr 


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

    if(trigAns){
        answer();
    }

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
    trigAns = true;
}


// Answering Function
function answer(){
    let finalArr = [];
    finalArr = numArr.join("").split(specialChar);
    console.log(finalArr);
    if(secArr.length <= 0){
        secArr.unshift(finalArr[0]);
    }
    let answerArr = [secArr[0], finalArr[finalArr.length-1]]
    let finalAnswer;
    
    finalAnswer = operate(oprArr[oprArr.length - 1], answerArr);
    if(!operTorf){
        secArr = [finalAnswer];
    }
    
    // finalArr.splice(0,2);
    finalArr.unshift(finalAnswer);
    // console.log(oprArr);
    answerDisplay.textContent = finalArr[0];
}


nums.forEach(ele => ele.addEventListener("click", populate));
allClear.addEventListener("click", clear);
delBtn.addEventListener("click", del);
functKeys.forEach(ele=>ele.addEventListener("click", symbAdd));
answerKey.addEventListener("click", answer);