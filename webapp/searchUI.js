const searchValueElem = document.getElementById("val-search")
const arrayElem = document.getElementById("val-arr")

const intIEq0 = document.getElementById("int-i-eq-0")
const iLtArrLength = document.getElementById("i-lt-arr-length")
const incI = document.getElementById("inc-i")

const arrIEqSearch = document.getElementById("arr-i-eq-search")
const codeFoundElem = document.getElementById("code-found")

const matchesEq0 = document.getElementById("matches-eq-0")
const printNotFoundElem = document.getElementById("print-not-found")

const stateForInit = 0
const stateForCond = 1
const stateForIter = 2
const stateSearchCheck = 3
const stateSearchFound = 4
const stateCheckMatches = 5
const stateNotFound = 6
const stateHalt = -1

const elemByState = [intIEq0, iLtArrLength, incI, arrIEqSearch, codeFoundElem, matchesEq0, printNotFoundElem]

const colourState = (state, colour) => {
    if (state == stateHalt) { return }

    elemByState[state].style.color = colour
}

const colourRed = state => colourState(state, "red")
const colourBlue = state => colourState(state, "blue")

const resetColour = () => {
    for (let elem of elemByState) {
        elem.style.color = "black"
    }
}

const pstSearch = document.getElementById("pst-search")
const pstArr = document.getElementById("pst-arr")
const pstI = document.getElementById("pst-i")
const pstArrI = document.getElementById("pst-arr-i")
const pstSearchCond = document.getElementById("pst-search-cond")
const pstMatches = document.getElementById("pst-matches")
const pstLength = document.getElementById("pst-length")
const pstForCond = document.getElementById("pst-for-cond")

const getRepr = val =>
    typeof(val) == "string"
        ? `"${val}"`
        : `${val}`

const setSearch = val => pstSearch.innerHTML = getRepr(val)
const setArr = arr => {
    pstArr.innerHTML = "{ "

    for (let i = 0; i < arr.length; i++) {
        pstArr.innerHTML += getRepr(arr[i])

        if (i < arr.length - 1) {
            pstArr.innerHTML += ", "
        }
    }

    pstArr.innerHTML += " }"
}

const setI = i => pstI.innerHTML = i
const setArrI = val => pstArrI.innerHTML = val == "N/A" ? "N/A" : getRepr(val)
const setSearchCond = cond => pstSearchCond.innerHTML = cond
const setMatches = n => pstMatches.innerHTML = n
const setLength = len => pstLength.innerHTML = len
const setForCond = cond => pstForCond.innerHTML = cond

const consoleElem = document.getElementById("console")

const consolePrintFound = val => consoleElem.innerHTML += `Found! : ${val}<br>`

const consolePrintNotFound = () => consoleElem.innerHTML += "Nothing found...<br>"

const clearConsole = () => consoleElem.innerHTML = ""