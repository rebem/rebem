import { expect } from 'chai';

import buildClassName from '../../lib/buildClassName';

describe('buildClassName', () => {
    it('exist', () => {
        expect(buildClassName).to.exist;
    });

    it('be a function', () => {
        expect(buildClassName).to.be.a('function');
    });

    it('no arguments', () => {
        expect(buildClassName()).to.be.equal('');
    });

    it('invalid argument', () => {
        expect(buildClassName(
            true
        )).to.be.equal(
            ''
        );
    });

    it('invalid block', () => {
        expect(buildClassName({
            block: true
        })).to.be.equal(
            true
        );
    });

    it('block', () => {
        expect(buildClassName({
            block: 'block'
        })).to.be.equal(
            'block'
        );
    });

    it('block + invalid mods', () => {
        expect(buildClassName({
            block: 'block',
            mods: 'mod'
        })).to.be.equal(
            'block'
        );
    });

    it('block + 1 mod', () => {
        expect(buildClassName({
            block: 'block',
            mods: {
                mod: 'val'
            }
        })).to.be.equal(
            'block block_mod_val'
        );
    });

    it('block + false mod', () => {
        expect(buildClassName({
            block: 'block',
            mods: {
                mod: false
            }
        })).to.be.equal(
            'block'
        );
    });

    it('block + true mod', () => {
        expect(buildClassName({
            block: 'block',
            mods: {
                mod: true
            }
        })).to.be.equal(
            'block block_mod'
        );
    });

    it('block + few mods', () => {
        expect(buildClassName({
            block: 'block',
            mods: {
                mod1: 'val1',
                mod2: 'val2'
            }
        })).to.be.equal(
            'block block_mod1_val1 block_mod2_val2'
        );
    });

    it('block + invalid elem', () => {
        expect(buildClassName({
            block: 'block',
            elem: 123
        })).to.be.equal(
            'block__123'
        );
    });

    it('no block + elem', () => {
        expect(buildClassName({
            elem: 'elem'
        })).to.be.equal(
            '__elem'
        );
    });

    it('block + elem', () => {
        expect(buildClassName({
            block: 'block',
            elem: 'elem'
        })).to.be.equal(
            'block__elem'
        );
    });

    it('no block + mods', () => {
        expect(buildClassName({
            mods: {
                mod: 'val'
            }
        })).to.be.equal(
            ' _mod_val'
        );
    });

    it('block + elem + 1 mod', () => {
        expect(buildClassName({
            block: 'block',
            elem: 'elem',
            mods: {
                mod: 'val'
            }
        })).to.be.equal(
            'block__elem block__elem_mod_val'
        );
    });

    it('block + elem + few mods', () => {
        expect(buildClassName({
            block: 'block',
            elem: 'elem',
            mods: {
                mod1: 'val1',
                mod2: 'val2'
            }
        })).to.be.equal(
            'block__elem block__elem_mod1_val1 block__elem_mod2_val2'
        );
    });

    it('invalid mix', () => {
        expect(buildClassName({
            mix: 'mix'
        })).to.be.equal(
            ''
        );
    });

    it('mix as object', () => {
        expect(buildClassName({
            mix: {
                block: 'block2'
            }
        })).to.be.equal(
            'block2'
        );
    });

    it('mix as array', () => {
        expect(buildClassName({
            mix: [
                { block: 'block2' },
                { block: 'block3' }
            ]
        })).to.be.equal(
            'block2 block3'
        );
    });

    it('block + complex mix', () => {
        expect(buildClassName({
            mix: {
                block: 'block2',
                elem: 'elem',
                mods: {
                    mod: 'val'
                }
            }
        })).to.be.equal(
            'block2__elem block2__elem_mod_val'
        );
    });

    it('block + mix', () => {
        expect(buildClassName({
            block: 'block',
            mix: {
                block: 'block2'
            }
        })).to.be.equal(
            'block block2'
        );
    });
});
