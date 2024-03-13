const getInputs = () => {
    return {
        search: eval(searchValueElem.value),
        array: arrayElem.value.split(",").map(eval)
    }
}

let currState = stateHalt
let search = null
let array = null
let numMatches = 0
let foridx = 0

const initialise = () => {
    let inputs = getInputs()
    
    resetColour()
    currState = stateForInit
    colourRed(currState)

    search = inputs.search
    array = inputs.array
    numMatches = 0
    foridx = 0
    
    setSearch(search)
    setArr(array)
    setI("N/A")
    setArrI("N/A")
    setSearchCond("N/A")
    setMatches(numMatches)
    setLength(array.length)
    setForCond("N/A")

    clearConsole()
}

const updateI = () => {
    setI(foridx)
    setArrI(array[foridx])
    setSearchCond(array[foridx] == search)
    setForCond(foridx < array.length)
}

const next = state => {
    switch (state) {
        case stateForInit:
            updateI()
            return stateForCond

        case stateForCond:
            if (foridx < array.length)
                return stateSearchCheck
            else
                return stateCheckMatches

        case stateForIter:
            foridx++
            updateI()
            return stateForCond

        case stateSearchCheck:
            if (array[foridx] == search)
                return stateSearchFound
            else
                return stateForIter

        case stateSearchFound:
            consolePrintFound(array[foridx])
            numMatches++
            setMatches(numMatches)
            return stateForIter

        case stateCheckMatches:
            if (numMatches == 0)
                return stateNotFound
            else
                return stateHalt

        case stateNotFound:
            consolePrintNotFound()
            return stateHalt
    }

    return stateHalt
}

const step = () => {
    let statePrev = currState

    currState = next(currState)

    resetColour()
    colourBlue(statePrev)
    colourRed(currState)
}