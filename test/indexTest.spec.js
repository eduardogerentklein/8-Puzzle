const chai = require('chai')
const puzzle = require('../index.js')
const expect = chai.expect

describe('findValuePosition', () => {
    it('Deve retornar um Array com posição (y, x) do número informado.', (done) => {
        expect(puzzle.findValuePosition([[1,2,3],[4,5,6],[7,8,0]], 0)).to.members([ 2, 2 ])
        done()
    })
})

describe('moveToRight', () => {
    it('Deve retornar uma matriz onde o valor 0, desloca-se se possível para x positivo.', (done) => {
        expect(puzzle.moveToRight([ [1, 2, 3], [0, 4, 6], [7, 5, 8] ])).to.deep.equal([ [1, 2, 3], [4, 0, 6], [7, 5, 8] ])
        done()
    })
    
    it('Deve retornar null, pois não foi possível deslocar o valor 0 para x positivo.', (done) => {
        expect(puzzle.moveToRight([ [1, 2, 0], [4, 5, 3], [7, 8, 6] ])).to.equal(null)
        done()
    })
})

describe('moveToLeft', () => {
    it('Deve retornar uma matriz onde o valor 0, desloca-se se possível para x negativo.', (done) => {
        expect(puzzle.moveToLeft([ [1, 2, 0], [4, 5, 3], [7, 8, 6] ])).to.deep.equal([ [1, 0, 2], [4, 5, 3], [7, 8, 6] ])
        done()
    })

    it('Deve retornar null, pois não foi possível deslocar o valor 0 para x negativo.', (done) => {
        expect(puzzle.moveToLeft([ [1, 2, 3], [0, 4, 6], [7, 5, 8] ])).to.equal(null)
        done()
    })
})

describe('moveToUp', () => {
    it('Deve retornar uma matriz onde o valor 0, desloca-se se possível para y positivo.', (done) => {
        expect(puzzle.moveToUp([ [1, 2, 3], [0, 4, 6], [7, 5, 8] ])).to.deep.equal([ [0, 2, 3], [1, 4, 6], [7, 5, 8] ])
        done()
    })

    it('Deve retornar null, pois não foi possível deslocar o valor 0 para y positivo.', (done) => {
        expect(puzzle.moveToUp([ [1, 2, 0], [4, 5, 3], [7, 8, 6] ])).to.equal(null)
        done()
    })
})

describe('moveToDown', () => {
    it('Deve retornar uma matriz onde o valor 0, desloca-se se possível para y negativo.', (done) => {
        expect(puzzle.moveToDown([ [1, 2, 0], [4, 5, 3], [7, 8, 6] ])).to.deep.equal([ [1, 2, 3], [4, 5, 0], [7, 8, 6] ])
        done()
    })

    it('Deve retornar null, pois não foi possível deslocar o valor 0 para y negativo.', (done) => {
        expect(puzzle.moveToDown([ [1, 2, 3], [4, 5, 6], [7, 8, 0] ])).to.equal(null)
        done()
    })
})

