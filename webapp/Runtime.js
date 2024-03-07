const stateBody = 0
const stateInit = 1
const stateCond = 2
const stateIter = 3
const stateHalt = -1

let scn = {
    next: () => prompt()
}

const appendState = (cmd, state) => {
    let evalcmd = ""
    let vars = Object.keys(state)
    for (let name of vars) {
        let val = state[name]

        if (typeof(val) == "string") {
            evalcmd += `let ${name} = "${val}";`
        } else {
            evalcmd += `let ${name} = ${val};`
        }
    }

    return evalcmd + cmd
}

const evaluate = (expr, state) => eval(appendState(expr, state))

const runPrint = (expr, state) => {
    console.log(evaluate(expr, state))
}

const runDeclare = (stmt, state) => {
    state[stmt.varName] = null
}

const runAssign = (stmt, state) => {
    if (!state.hasOwnProperty(stmt.varName)) {
        console.log("Runtime error: using variable before declaring")
        return
    }

    state[stmt.varName] = evaluate(stmt.expr, state)
}

const runDeclareAssign = (stmt, state) => {
    state[stmt.varName] = evaluate(stmt.expr, state)
}

const runStmt = (stmt, state) => {
    switch (stmt.stmtType) {
        case stmtPrint:
            return runPrint(stmt.expr, state)
        case stmtDeclare:
            return runDeclare(stmt, state)
        case stmtAssign:
            return runAssign(stmt, state)
        case stmtDeclareAssign:
            return runDeclareAssign(stmt, state)
    }
}

let compiled = null
let runningState = stateHalt
let appState = null

const initialise = () => {
    compiled = compile()

    if (compiled == null) { return }

    appState = {}
    
    for (let stmt of compiled.exec) {
        runStmt(stmt, appState)
    }

    runningState = stateInit
}

const stepBody = () => {
    for (let stmt of compiled.body) {
        runStmt(stmt, appState)
    }

    runningState = stateIter
}

const stepInit = () => {
    runStmt(compiled.init, appState)

    runningState = stateCond
}

const stepCond = () => {
    var val = evaluate(compiled.cond, appState)

    runningState = val ? stateBody : stateHalt
}

const stepIter = () => {
    runStmt(compiled.iter, appState)

    runningState = stateCond
}

const stepState = () => {
    switch (runningState) {
        case stateBody: stepBody(); break;
        case stateInit: stepInit(); break;
        case stateCond: stepCond(); break;
        case stateIter: stepIter(); break;
    }
}