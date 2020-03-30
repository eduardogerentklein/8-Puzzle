const chai = require('chai')
const puzzle = require('../index.js')
const expect = chai.expect

describe('findValuePosition', () => {
    it('Deve retornar um Array com posição (y, x) do número informado', (done) => {
        expect(puzzle.findValuePosition([[1,2,3],[4,5,6],[7,8,0]], 0)).to.members([ 2, 2 ])
        done()
    })
})

describe('moveToRight', () => {
    it('Deve retornar uma matriz onde o valor 0, desloca-se se possível para o valor x positivo.', (done) => {
        expect(puzzle.moveToRight([ [1, 2, 3], [0, 4, 6], [7, 5, 8] ])).to.deep.equal([ [1, 2, 3], [4, 0, 6], [7, 5, 8] ])
        done()
    })
})

describe('moveToLeft', () => {
    it('Deve retornar uma matriz onde o valor 0, desloca-se se possível para o valor x negativo.', (done) => {
        expect(puzzle.moveToLeft([ [1, 2, 3], [0, 4, 6], [7, 5, 8] ])).to.deep.equal([ [1, 2, 3], [4, 0, 6], [7, 5, 8] ])
        done()
    })
})


