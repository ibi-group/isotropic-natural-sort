import _chai from 'chai';
import _mocha from 'mocha';
import _naturalSort from '../js/natural-sort.js';

_mocha.describe('naturalSort', () => {
    _mocha.it('should be a function', () => {
        _chai.expect(_naturalSort).to.be.a('function');
    });

    _mocha.it('should return a function', () => {
        _chai.expect(_naturalSort()).to.be.a('function');
    });

    _mocha.it('should sort a homogeneous array of numbers in ascending direction', () => {
        _chai.expect([
            Infinity,
            -Infinity,
            456.789,
            -345.678,
            234.567,
            -123.456,
            1,
            2,
            3
        ].sort(_naturalSort({
            direction: 'asc'
        }))).to.have.ordered.members([
            -Infinity,
            -345.678,
            -123.456,
            1,
            2,
            3,
            234.567,
            456.789,
            Infinity
        ]);
    });

    _mocha.it('should sort a homogeneous array of numbers in descending direction', () => {
        _chai.expect([
            Infinity,
            -Infinity,
            456.789,
            -345.678,
            234.567,
            -123.456,
            1,
            2,
            3
        ].sort(_naturalSort({
            direction: 'desc'
        }))).to.have.ordered.members([
            Infinity,
            456.789,
            234.567,
            3,
            2,
            1,
            -123.456,
            -345.678,
            -Infinity
        ]);
    });

    _mocha.it('should sort a homogeneous array of strings in ascending direction', () => {
        _chai.expect([
            'x',
            'y',
            'z',
            'a',
            'b',
            'c'
        ].sort(_naturalSort({
            direction: 'asc'
        }))).to.have.ordered.members([
            'a',
            'b',
            'c',
            'x',
            'y',
            'z'
        ]);
    });

    _mocha.it('should sort a homogeneous array of strings in descending direction', () => {
        _chai.expect([
            'x',
            'y',
            'z',
            'a',
            'b',
            'c'
        ].sort(_naturalSort({
            direction: 'desc'
        }))).to.have.ordered.members([
            'z',
            'y',
            'x',
            'c',
            'b',
            'a'
        ]);
    });

    _mocha.it('should sort a heterogeneous array of numbers and strings in ascending direction', () => {
        _chai.expect([
            'x',
            'y',
            'z',
            1,
            -2,
            3,
            'a',
            'b',
            'c',
            '4',
            '-5',
            '6'
        ].sort(_naturalSort({
            direction: 'asc'
        }))).to.have.ordered.members([
            '-5',
            -2,
            1,
            3,
            '4',
            '6',
            'a',
            'b',
            'c',
            'x',
            'y',
            'z'
        ]);
    });

    _mocha.it('should sort a heterogeneous array of numbers and strings in descending direction', () => {
        _chai.expect([
            'x',
            'y',
            'z',
            1,
            -2,
            3,
            'a',
            'b',
            'c',
            '4',
            '-5',
            '6'
        ].sort(_naturalSort({
            direction: 'desc'
        }))).to.have.ordered.members([
            'z',
            'y',
            'x',
            'c',
            'b',
            'a',
            '6',
            '4',
            3,
            1,
            -2,
            '-5'
        ]);
    });

    _mocha.it('should sort in ascending direction by default', () => {
        _chai.expect([
            'a',
            'b',
            'c'
        ].sort(_naturalSort())).to.have.ordered.members([
            'a',
            'b',
            'c'
        ]);
    });

    _mocha.it('should throw for invalid direction', () => {
        _chai.expect(() => {
            [
                'a',
                'b',
                'c'
            ].sort(_naturalSort({
                direction: 'eastbound'
            }));
        }).to.throw();
    });

    _mocha.it('should not be case sensitive by default', () => {
        _chai.expect([
            'abc_a',
            'abc_A',
            'aBc_B',
            'aBc_b',
            'ABC_c',
            'ABC_C'
        ].sort(_naturalSort())).to.have.ordered.members([
            'abc_A',
            'abc_a',
            'aBc_B',
            'aBc_b',
            'ABC_C',
            'ABC_c'
        ]);
    });

    _mocha.it('should allow case sensitive sorting', () => {
        _chai.expect([
            'abc_a',
            'aBc_b',
            'ABC_c'
        ].sort(_naturalSort({
            caseSensitive: true
        }))).to.have.ordered.members([
            'ABC_c',
            'aBc_b',
            'abc_a'
        ]);
    });

    _mocha.it('should ignore special characters by default', () => {
        _chai.expect([
            'áeiou_a',
            'aęiou_b',
            'æiou_c',
            'aeioǜ_d',
            'aeiou_e'
        ].sort(_naturalSort())).to.have.ordered.members([
            'áeiou_a',
            'aęiou_b',
            'æiou_c',
            'aeioǜ_d',
            'aeiou_e'
        ]);
    });

    _mocha.it('should allow sorting by special characters', () => {
        _chai.expect([
            'áeiou_a',
            'aęiou_b',
            'æiou_c',
            'aeioǜ_d',
            'aeiou_e'
        ].sort(_naturalSort({
            ignoreSpecialCharacters: false
        }))).to.have.ordered.members([
            'aeiou_e',
            'aeioǜ_d',
            'aęiou_b',
            'áeiou_a',
            'æiou_c'
        ]);
    });

    _mocha.it('should allow case sensitive sorting by special characters', () => {
        _chai.expect([
            'áeiou_a',
            'aęiou_b',
            'æiou_c',
            'aEioǜ_d',
            'aeiou_e'
        ].sort(_naturalSort({
            caseSensitive: true,
            ignoreSpecialCharacters: false
        }))).to.have.ordered.members([
            'aEioǜ_d',
            'aeiou_e',
            'aęiou_b',
            'áeiou_a',
            'æiou_c'
        ]);
    });

    _mocha.it('should sort falsy values last', () => {
        // chai's order assertion fails when array contains NaN

        const array = [
            'a',
            null,
            'b',
            void null,
            'c',
            NaN
        ].sort(_naturalSort({
            falsyValuePosition: 'first'
        }));

        _chai.expect(array[0]).to.equal('a');
        _chai.expect(array[1]).to.equal('b');
        _chai.expect(array[2]).to.equal('c');
        _chai.expect(array[3]).to.equal(null);
        _chai.expect(Number.isNaN(array[4])).to.be.true;
        _chai.expect(array[5]).to.equal(void null);
    });

    _mocha.it('should allow sorting values that match custom prefixes first or last', () => {
        _chai.expect([
            'ax',
            'by',
            'cz',
            'xa',
            'yb',
            'zc'
        ].sort(_naturalSort({
            prefixPositions: {
                a: 'first',
                b: 'last',
                z: 'first'
            }
        }))).to.have.ordered.members([
            'ax',
            'zc',
            'cz',
            'xa',
            'yb',
            'by'
        ]);
    });

    _mocha.it('should throw for invalid prefix position', () => {
        _chai.expect(() => {
            [
                'a',
                'b',
                'c'
            ].sort(_naturalSort({
                prefixPositions: {
                    a: 'underneath'
                }
            }));
        }).to.throw();

        _chai.expect(() => {
            [
                'a',
                'b',
                'c'
            ].sort(_naturalSort({
                prefixPositions: {
                    c: 'overneath'
                }
            }));
        }).to.throw();
    });

    _mocha.it('should sort lexicographic orderings in ascending direction', () => {
        _chai.expect([
            '40.50.60.70',
            '40.50.60',
            '40.5.60',
            '4.50.60',
            '4.5.60',
            '40.50.6',
            '4.50.6',
            '40.5.6',
            '4.5.6',
            '4.5.6.7',
            '0.0.0',
            '-0.-0.-0',
            '+0.+0.+0'
        ].sort(_naturalSort({
            direction: 'asc'
        }))).to.have.ordered.members([
            '+0.+0.+0',
            '-0.-0.-0',
            '0.0.0',
            '4.5.6',
            '4.5.6.7',
            '4.5.60',
            '4.50.6',
            '4.50.60',
            '40.5.6',
            '40.5.60',
            '40.50.6',
            '40.50.60',
            '40.50.60.70'
        ]);
    });

    _mocha.it('should sort lexicographic orderings in descending direction', () => {
        _chai.expect([
            '40.50.60.70',
            '40.50.60',
            '40.5.60',
            '4.50.60',
            '4.5.60',
            '40.50.6',
            '4.50.6',
            '40.5.6',
            '4.5.6',
            '4.5.6.7',
            '0.0.0',
            '-0.-0.-0',
            '+0.+0.+0'
        ].sort(_naturalSort({
            direction: 'desc'
        }))).to.have.ordered.members([
            '40.50.60.70',
            '40.50.60',
            '40.50.6',
            '40.5.60',
            '40.5.6',
            '4.50.60',
            '4.50.6',
            '4.5.60',
            '4.5.6.7',
            '4.5.6',
            '0.0.0',
            '-0.-0.-0',
            '+0.+0.+0'
        ]);
    });

    _mocha.it('should sort strings containing numbers in ascending direction', () => {
        _chai.expect([
            'a00000.data',
            'a00001.data',
            'a00002.data',
            'a00003.data',
            'a00010.data',
            'a000000.data',
            'a0000003.data',
            'a00002.data.1',
            'a00002.data.2',
            'a00002.data.10',
            'x0y0z',
            'x',
            'x0',
            'x0y0',
            'x0y',
            'x-0y-0z',
            'x+0y+0z',
            'x'
        ].sort(_naturalSort({
            direction: 'asc'
        }))).to.have.ordered.members([
            'a00000.data',
            'a000000.data',
            'a00001.data',
            'a00002.data',
            'a00002.data.1',
            'a00002.data.2',
            'a00002.data.10',
            'a0000003.data',
            'a00003.data',
            'a00010.data',
            'x',
            'x',
            'x+0y+0z',
            'x-0y-0z',
            'x0',
            'x0y',
            'x0y0',
            'x0y0z'
        ]);
    });

    _mocha.it('should sort strings containing numbers in descending direction', () => {
        _chai.expect([
            'a00000.data',
            'a00001.data',
            'a00002.data',
            'a00003.data',
            'a00010.data',
            'a000000.data',
            'a0000003.data',
            'a00002.data.1',
            'a00002.data.2',
            'a00002.data.10',
            'x0y0z',
            'x',
            'x0',
            'x0y0',
            'x0y',
            'x-0y-0z',
            'x+0y+0z',
            'x'
        ].sort(_naturalSort({
            direction: 'desc'
        }))).to.have.ordered.members([
            'x0y0z',
            'x0y0',
            'x0y',
            'x0',
            'x-0y-0z',
            'x+0y+0z',
            'x',
            'x',
            'a00010.data',
            'a00003.data',
            'a0000003.data',
            'a00002.data.10',
            'a00002.data.2',
            'a00002.data.1',
            'a00002.data',
            'a00001.data',
            'a000000.data',
            'a00000.data'
        ]);
    });
});
