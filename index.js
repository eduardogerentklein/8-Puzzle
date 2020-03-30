const matrixjs = require('matrix-js')
const manhattan = require('manhattan')
const { table, getBorderCharacters } = require('table')

const consoleColor = {
    cyan: '\x1b[36m%s\x1b[0m',
    yellow: '\x1b[33m%s\x1b[0m'
}

const initialState = [ [1, 2, 3], [0, 4, 6], [7, 5, 8] ];
//const initialState = [ [0, 1, 3], [4, 2, 5], [7, 8, 6] ];
//const initialState = [ [1, 2, 0], [4, 5, 3], [7, 8, 6] ];
const finalState = [[1, 2, 3], [4, 5, 6], [7, 8, 0]]

let generation = 0
let movements = []
let possibleMoves = []

let previousIndex = 0
let previousGeneration = []

let data = matrixjs(initialState)

function findBlankPosition(matrix) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (matrix[i][j] == 0) {
                return [i, j];
            }
        }
    }
}

function findValuePosition(matrix, value) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (matrix[i][j] == value) {
                return [i, j];
            }
        }
    }
}

const moveToRight = (matrix) => {
    let result = matrixjs(matrix)
    const blankPosition = findBlankPosition(matrix)
    const blankPositionY = blankPosition[0];
    const blankPositionX = blankPosition[1];

    if (blankPositionX === 2) {
        return null;
    }
    else {
        const movePostionY = blankPositionY;
        const movePostionX = blankPositionX + 1;
        const moveValue = result(movePostionY, movePostionX)
        result = matrixjs(result.set(blankPositionY, blankPositionX + 1).to(0))
        result = matrixjs(result.set(blankPositionY, blankPositionX).to(moveValue))
        return result()
    }
}

const moveToLeft = (matrix) => {
    let result = matrixjs(matrix)
    const blankPosition = findBlankPosition(matrix)
    const blankPositionY = blankPosition[0];
    const blankPositionX = blankPosition[1];

    if (blankPositionX === 0) {
        return null;
    }
    else {
        const movePostionY = blankPositionY;
        const movePostionX = blankPositionX - 1;
        const moveValue = result(movePostionY, movePostionX)
        result = matrixjs(result.set(blankPositionY, blankPositionX - 1).to(0))
        result = matrixjs(result.set(blankPositionY, blankPositionX).to(moveValue))
        return result()
    }
}

const moveToUp = (matrix) => {
    let result = matrixjs(matrix)
    const blankPosition = findBlankPosition(matrix)
    const blankPositionY = blankPosition[0];
    const blankPositionX = blankPosition[1];

    if (blankPositionY === 0) {
        return null;
    }
    else {
        const movePostionY = blankPositionY - 1;
        const movePostionX = blankPositionX;
        const moveValue = result(movePostionY, movePostionX)
        result = matrixjs(result.set(movePostionY, movePostionX).to(0))
        result = matrixjs(result.set(blankPositionY, blankPositionX).to(moveValue))
        return result()
    }
}

const moveToDown = (matrix) => {
    let result = matrixjs(matrix)
    const blankPosition = findBlankPosition(matrix)
    const blankPositionY = blankPosition[0];
    const blankPositionX = blankPosition[1];

    if (blankPositionY === 2) {
        return null;
    }
    else {
        const movePostionY = blankPositionY + 1;
        const movePostionX = blankPositionX;
        const moveValue = result(movePostionY, movePostionX)
        result = matrixjs(result.set(movePostionY, movePostionX).to(0))
        result = matrixjs(result.set(blankPositionY, blankPositionX).to(moveValue))
        return result()
    }
}

function addMoves(moves) {
    if (movements.length === 0) {
        for (let i = 0; i < moves.length; i++) {
            movements.push(moves[i])
        }
    } else {
        for (let i = 0; i < moves.length; i++) {
            if (!existMovement(moves[i])) {
                movements.push(moves[i])
            }
        }
    }
}

function existMovement(move) {
    for (let i = 0; i < movements.length; i++) {
        let equal = true; 
        for (let j = 0; j < 3; j++) {
            for (let l = 0; l < 3; l++) {
                if (move[j][l] !== movements[i][j][l]) {
                    equal = false;
                }
            }
        }
        if (equal === true) {
            return true;
        }
    }

    return false;
}

const compare = (a, b) => a.f > b.f ? 1 : -1;

function bestOfGeneration(possibleMoves) {
    const finalPositions = [[[0, 0], [0, 1], [0, 2]], [[1, 0], [1, 1], [1, 2]], [[2, 0], [2, 1], [2, 2]]];

    let g = generation + 1;
    let nodes = [];

    for (let i = 0; i < possibleMoves.length; i++) {
        let value = 1;
        let h = 0;
        
        for (let j = 0; j < 3; j++) {
            const targetRow = finalPositions[j];
            for (let l = 0; l < 3; l++) {
                const targetColumn = targetRow[l];
                if (value === 9) {
                    value = 0;
                }
                h = manhattan(findValuePosition(possibleMoves[i], value), targetColumn) + h;
                value++;
            }
        }
        nodes.push({ f: g + h, g: g, h: h, matrix: possibleMoves[i] })
    }

    generation++;

    const ordenedNodes = nodes.sort(compare)

    for (let i = 0; i < ordenedNodes.length; i++) {
        if (!existMovement(ordenedNodes[i].matrix)) {
            previousIndex = i;
            previousGeneration = ordenedNodes;
            return ordenedNodes[i];
        }
        
    }

    let child = [];

    for (let i = previousIndex + 1; i < previousGeneration.length; i++) {
        if (!existMovement(previousGeneration[i].matrix)) {
            moveToRight(previousGeneration[i].matrix) != null && child.push(moveToRight(previousGeneration[i].matrix))
            moveToLeft(previousGeneration[i].matrix) != null && child.push(moveToLeft(previousGeneration[i].matrix))
            moveToUp(previousGeneration[i].matrix) != null && child.push(moveToUp(previousGeneration[i].matrix))
            moveToDown(previousGeneration[i].matrix) != null && child.push(moveToDown(previousGeneration[i].matrix))
            bestOfGeneration(child)
        }
    }
}

function showResult(initial, result) {
    let config = { border: getBorderCharacters('norc') }
    console.log('-=[  8  P U Z Z L E  ]=-')
    console.log()
    console.log('Estado Inicial')
    console.log(consoleColor.yellow, table(initial, config))
    console.log()
    console.log('Passos:')
    for (let i = 0; i < result.length; i++) {
        console.log(consoleColor.cyan, table(result[i], config))
    }
}

let hEsperado = null;
let paths = []
while (hEsperado !== 0) {

    if (initialState === finalState) {
        console.log('O estado inicial é igual ao estado final.')
    }

    moveToRight(data()) != null && possibleMoves.push(moveToRight(data()))
    moveToLeft(data()) != null && possibleMoves.push(moveToLeft(data()))
    moveToUp(data()) != null && possibleMoves.push(moveToUp(data()))
    moveToDown(data()) != null && possibleMoves.push(moveToDown(data()))

    const result = bestOfGeneration(possibleMoves)

    data = matrixjs(result.matrix)
    paths.push(data())

    hEsperado = result.h;

    addMoves([result.matrix])
    possibleMoves = [];
}

showResult(initialState, paths)