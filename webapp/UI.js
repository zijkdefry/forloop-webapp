const forExec = document.getElementById("for-exec")
const forInit = document.getElementById("for-init")
const forCond = document.getElementById("for-cond")
const forIter = document.getElementById("for-iter")
const forBody = document.getElementById("for-body")

const htmlElemByState = [forBody, forInit, forCond, forIter]

const consoleElem = document.getElementById("console")
const variableDump = document.getElementById("var-dump")
const condCheck = document.getElementById("cond-check")
const condCheckTitle = document.getElementById("cond-check-title")

const printToConsole = x => {
    consoleElem.innerHTML += x + "<br>"
}

const clearConsole = () => {
    consoleElem.innerHTML = ""
}

const resetHighlight = () => {
    for (let elem of htmlElemByState) {
        elem.style.border = "2px solid grey"
    }
}
resetHighlight()

const highlightNext = s => {
    if (s == stateHalt) { return }

    htmlElemByState[s].style.border = "2px solid red"
}

const highlightExecuted = s => {
    if (s == stateHalt) { return }

    htmlElemByState[s].style.border = "2px solid blue"
}

const clearVariableDump = () => {
    variableDump.innerHTML = ""
}

const appendVariableToDump = (varName, value) => {
    if (typeof(value) == "string") {
        variableDump.innerHTML += `${varName} = "${value}" <br>`
    } else {
        variableDump.innerHTML += `${varName} = ${value} <br>`
    }
}

const initialiseCondition = ex => {
    condCheck.innerHTML = "condition cannot be determined yet"
    condCheckTitle.className = "card-header text-success"
}

const updateCondition = val => {
    condCheck.innerHTML = `condition ${compiled.cond} is ${val}`

    let newTextClass = val ? "success" : "danger"
    condCheckTitle.className = `card-header text-${newTextClass}`
}