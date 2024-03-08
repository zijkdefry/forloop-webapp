const forExec = document.getElementById("for-exec") // textarea element before for loop
const forInit = document.getElementById("for-init") // input element of for loop initialisation
const forCond = document.getElementById("for-cond") // input element of for loop condition
const forIter = document.getElementById("for-iter") // input element of for loop iteration
const forBody = document.getElementById("for-body") // textarea element of for loop body

// Program running states are defined at the top of Runtime.js
// Indexing this array with a runtime state
// Returns the HTML element corresponding to that runtime state
const htmlElemByState = [forBody, forInit, forCond, forIter]

const consoleElem = document.getElementById("console") // Console div
const variableDump = document.getElementById("var-dump") // Variable Dump div
const condCheck = document.getElementById("cond-check") // Condition check div

// Takes a value x and prints it to the console
// This function should append a line containing only the value of x
// To the console element everytime it is called
const printToConsole = x => {
    consoleElem.innerHTML += x + "<br>"
}

// clears the console
// This function should clear all contents of the console element 
// and set a generic title in the console element
const clearConsole = () => {
    consoleElem.innerHTML = "Console: <br>"
}

// Reset border highlight of the for loop elements
// This function should set the styles of all elements in the array htmlElemByState
// To an unhighlighted style
const resetHighlight = () => {
    for (let elem of htmlElemByState) {
        elem.style.border = "2px solid grey"
    }
}
resetHighlight()

// Highlight the for loop part (s) that WILL BE executed when "Step" button is clicked
// This function should first do nothing (return) when paramter s == stateHalt == -1
// Then it should set the style of the element returned by htmlElemByState[s]
// To a primary highlighted style
const highlightNext = s => {
    if (s == stateHalt) { return }

    htmlElemByState[s].style.border = "2px solid red"
}

// Highlight the for loop part (s) that HAS executed when "Step" button is clicked
// This function should first do nothing (return) when paramter s == stateHalt == -1
// Then it should set the style of the element returned by htmlElemByState[s]
// To a secondary highlighted style
const highlightExecuted = s => {
    if (s == stateHalt) { return }

    htmlElemByState[s].style.border = "2px solid blue"
}

// clear the variable list
// This function should clear all the contents of the variableDump element 
// and set a generic title in the variableDump element
const clearVariableDump = () => {
    variableDump.innerHTML = "Program State: <br>"
}

// the runtime calls this function once for every variable declared everytime the "Step" button is clicked
// This function should append a line that displays the variables' names and values
// varName is the name of the variable that appended
// value is the value of the variable
const appendVariableToDump = (varName, value) => {
    
    // Wrap strings only with quotes
    if (typeof(value) == "string") {
        variableDump.innerHTML += `${varName} = "${value}" <br>`
    } else {
        variableDump.innerHTML += `${varName} = ${value} <br>`
    }
}

// This function is called once when the "Compiled" button is clicked
// Because of limitations of our approach,
// this function should set the contents of the condCheck element
// to a message signalling that the condition is N/A at the moment (refer code below)
const initialiseCondition = ex => {
    condCheck.innerHTML = "condition cannot be determined yet"
}

// This function is called everytime the "Step" button is clicked
// This function should update the contents of the condCheck element with
// text that represents the state of the for loop condition (see below code)
// val is the result of the condition which should be a boolean value, true or false
// compiled.cond contains the string of the condition that is inputted into the input element
const updateCondition = val => {
    condCheck.innerHTML = `condition ${compiled.cond} is ${val}`
}