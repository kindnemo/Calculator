const nums = document.querySelectorAll(".num");
const allClear = document.querySelector("#all-clear");
const processing = document.querySelector("#processing");
const answerDisplay = document.querySelector("#answer");
const answerKey = document.querySelector("#answerKey");
const delBtn = document.querySelector("#delete");
const functKeys = document.querySelectorAll(".funct");


const specialChar = /[`!@#$%^&*()_+−×÷\-=\[\]{};':"\\|,<>\/?~]/;  //Regex used to seperate numbers and store them in list;


let numArr = [];  //numArr for using it later in processing the strings
let secArr = [];  //Stores the answer of two pairs of numbers
let totalArr = [];
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
    }
}


// Display populator
function populate(){
    if(numArr.length == 0 && this.textContent == "0"){
        return;
    }
    if(this.textContent =="." && !operTorf){
        numArr.push("0.")
    }else{
        numArr.push(this.textContent);
    }
    
    processing.textContent = numArr.join('');
    
    if(!operTorf){
        operTorf = true;
    }
    if(trigAns){
        answer();
    }

}

// Clearing the display
function clear(){
    processing.textContent = "0";
    numArr = [];
    oprArr = [];
    secArr = []; 
    totalArr = [];
    operTorf = false; 
    trigAns = false; 
    oprArrIndex = 0;
}

// Delete button function 
function del(){
    numArr.pop();
    answer();
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

    if(oprArr.length>1){
        secArr = [totalArr[totalArr.length -1]];
    }    //Sets the sec arr to whatever the answer of the first pair of number is when an operator is pressed again


    operTorf = false;
    trigAns = true;
}


// Answering Function
function answer(){
    let finalArr = [];
    finalArr = numArr.join("").split(specialChar);
    if(secArr.length <= 0){
        secArr.unshift(finalArr[0]);
    }
    let answerArr = [secArr[0], finalArr[finalArr.length-1]]
    let finalAnswer;
    
    finalAnswer = operate(oprArr[oprArr.length - 1], answerArr);
    totalArr.push(finalAnswer);
    if(!operTorf && finalArr.length > 1){
        secArr = [finalAnswer];
    }
    
    finalArr.unshift(finalAnswer);
    answerDisplay.textContent = finalArr[0];
}


// Equals function that displays the final result on pressing the equal button
function equally(){
    processing.textContent = answerDisplay.textContent;
    numArr = [answerDisplay.textContent];
    answerDisplay.textContent=""
}

nums.forEach(ele => ele.addEventListener("click", populate));
allClear.addEventListener("click", clear);
delBtn.addEventListener("click", del);
functKeys.forEach(ele=>ele.addEventListener("click", symbAdd));
answerKey.addEventListener("click", equally);
