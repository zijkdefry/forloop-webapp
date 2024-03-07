// 4 types of statement:
// print: starts with System.out.println(
// declare: two words only
// assign: '=' in the second word
// declare + assign: '=' in the third word

const getTypeOfStatement = stmt => {
    if (stmt.startsWith("System.out.println(")) { return stmtPrint }

    let words = stmt.split(" ");
    
    if (words.length == 2) { return stmtDeclare }
    if (words[1] == "=") { return stmtAssign }
    if (words[2] == "=") { return stmtDeclareAssign }

    return stmtUnknown
}

const parsePrint = stmt => {
    return {
        stmtType: stmtPrint,
        expr: stmt.substring(19, stmt.length - 1),
    }
}

const parseDeclare = stmt => {
    let words = stmt.split(" ")
    return {
        stmtType: stmtDeclare,
        typeName: words[0],
        varName: words[1]
    }
}

const parseAssign = stmt => {
    let words = stmt.split(" ")
    return {
        stmtType: stmtAssign,
        varName: words[0],
        expr: stmt.substring(words[0].length + 3),
    }
}

const parseDeclareAssign = stmt => {
    let words = stmt.split(" ")
    return {
        stmtType: stmtDeclareAssign,
        typeName: words[0],
        varName: words[1],
        expr: stmt.substring(words[0].length + words[1].length + 4)
    }
}

const parse = stmt => {
    switch (getTypeOfStatement(stmt)) {
        case stmtUnknown:
            return null
        case stmtPrint:
            return parsePrint(stmt)
        case stmtDeclare:
            return parseDeclare(stmt)
        case stmtAssign:
            return parseAssign(stmt)
        case stmtDeclareAssign:
            return parseDeclareAssign(stmt)
    }
}

const parseStmts = (raw, loc) => {
    let lines = raw.split("\n")

    let stmts = []

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i]

        if (!line.endsWith(";")) {
            alert(`Syntax error: missing semicolon at for loop ${loc} line ${i}`)
            return null
        }

        let stmt = line.substring(0, line.length - 1)
        stmts.push(parse(stmt))
    }

    return stmts
}

const compile = () => {
    let parsedForExec = parseStmts(forExec.value, "before")
    if (!parsedForExec) {
        return null
    }

    let parsedForInit = parse(forInit.value)
    if (!parsedForInit) {
        alert("Syntax error in initialiser statement")
        return null
    }

    let parsedForCond = forCond.value

    let parsedForIter = parse(forIter.value)
    if (!parsedForIter) {
        alert("Syntax error in iteration statement")
        return null
    }

    let parsedForBody = parseStmts(forBody.value, "before")
    if (!parsedForBody) {
        return null
    }

    return {
        exec: parsedForExec,
        init: parsedForInit,
        cond: parsedForCond,
        iter: parsedForIter,
        body: parsedForBody,
    }
}