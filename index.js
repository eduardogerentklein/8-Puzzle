const matrixjs = require('matrix-js')
const manhattan = require('manhattan')
const fs = require('fs');
const { table, getBorderCharacters } = require('table')

const consoleColor = {
    cyan: '\x1b[36m%s\x1b[0m',
    yellow: '\x1b[33m%s\x1b[0m',
    red: '\x1b[31m'
}

const gameConfig = JSON.parse(fs.readFileSync('config/gameConfig.json', 'utf8'))
const initialState = JSON.parse(gameConfig.initialState)
let data = matrixjs(initialState)
//const initialState = [ [0, 1, 3], [4, 2, 5], [7, 8, 6] ];
//const initialState = [ [1, 2, 0], [4, 5, 3], [7, 8, 6] ];

let generation = 0
let movements = []
let possibleMoves = []
let previousIndex = 0
let previousGeneration = []

const findValuePosition = (matrix, value) => {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (matrix[i][j] == value) {
                return [i, j];
            }
        }
    }
}

const moveToRight = matrix => {
    let result = matrixjs(matrix)
    const blankPosition = findValuePosition(matrix, 0)
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

const moveToLeft = matrix => {
    let result = matrixjs(matrix)
    const blankPosition = findValuePosition(matrix, 0)
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

const moveToUp = matrix => {
    let result = matrixjs(matrix)
    const blankPosition = findValuePosition(matrix, 0)
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

const moveToDown = matrix => {
    let result = matrixjs(matrix)
    const blankPosition = findValuePosition(matrix, 0)
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

const addMoves = moves => {
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

const existMovement = move => {
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
 
const bestOfGeneration = possibleMoves => {
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

    const sortAsc = (a, b) => a.f > b.f ? 1 : -1
    const ordenedNodes = nodes.sort(sortAsc)

    for (let i = 0; i < ordenedNodes.length; i++) {
        if (!existMovement(ordenedNodes[i].matrix)) {
            previousIndex = i;
            previousGeneration = ordenedNodes;
            return ordenedNodes[i];
        }
        
    }

    let child = [];
    for (let i = previousIndex + 1; i < previousGeneration.length; i++) {
        const previousGen = previousGeneration[i]
        if (!existMovement(previousGen.matrix)) {
            moveToRight(previousGen.matrix) != null && child.push(moveToRight(previousGen.matrix))
            moveToLeft(previousGen.matrix) != null && child.push(moveToLeft(previousGen.matrix))
            moveToUp(previousGen.matrix) != null && child.push(moveToUp(previousGen.matrix))
            moveToDown(previousGen.matrix) != null && child.push(moveToDown(previousGen.matrix))
            bestOfGeneration(child)
        }
    }
}

const showResult = (initial, result) => {
    let config = { border: getBorderCharacters('norc') }
    console.log('-=[  8  P U Z Z L E  ]=-')
    console.log()
    console.log('Estado Inicial')
    console.log(consoleColor.yellow, table(initial, config))
    console.log()
    console.log('Passos:')
    console.log()

    result.map((move, index) => {
        const geracao = index+1
        console.log('Geração: ', geracao)
        console.log(consoleColor.cyan, table(move, config))
    })
}

const initialMovements = () => {
    moveToRight(data()) != null && possibleMoves.push(moveToRight(data()))
    moveToLeft(data()) != null && possibleMoves.push(moveToLeft(data()))
    moveToUp(data()) != null && possibleMoves.push(moveToUp(data()))
    moveToDown(data()) != null && possibleMoves.push(moveToDown(data()))
}

const exportTestFunctions = () => {
    exports.findValuePosition = findValuePosition
    exports.moveToRight = moveToRight
    exports.moveToLeft = moveToLeft
    exports.moveToUp = moveToUp
    exports.moveToDown = moveToDown
}

const init = () => {
    let hEsperado = null;
    let paths = []
    while (hEsperado !== 0) {
        initialMovements()
    
        const result = bestOfGeneration(possibleMoves)
    
        data = matrixjs(result.matrix)
        paths.push(data())
    
        hEsperado = result.h;
    
        addMoves([result.matrix])
        possibleMoves = [];
    }
    showResult(initialState, paths)
    exportTestFunctions()
}
init()
