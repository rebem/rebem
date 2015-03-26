import { expect } from 'chai';
import mergeWithProps from '../../lib/mergeWithProps';

describe('mergeWithProps', () => {
    it('exist', () => {
        expect(mergeWithProps).to.exist;
    });

    it('be a function', () => {
        expect(mergeWithProps).to.be.a('function');
    });

    it('no props', () => {
        expect(mergeWithProps({
            block: 'block'
        })).to.deep.equal({
            block: 'block'
        });
    });

    it('invalid block', () => {
        expect(mergeWithProps.bind(mergeWithProps,
            {
                block: 'block'
            }, {
                block: 123
            }
        )).to.throw(
            'block should be string'
        );
    });

    it('block', () => {
        expect(mergeWithProps(
            {
                block: 'block'
            }, {
                block: 'block2'
            }
        )).to.deep.equal({
            block: 'block2'
        });
    });

    it('invalid elem', () => {
        expect(mergeWithProps.bind(mergeWithProps,
            {
                elem: 'elem'
            }, {
                elem: 123
            }
        )).to.throw(
            'elem should be string'
        );
    });

    it('elem', () => {
        expect(mergeWithProps(
            {
                elem: 'elem'
            }, {
                elem: 'elem2'
            }
        )).to.deep.equal({
            elem: 'elem2'
        });
    });

    it('invalid tag', () => {
        expect(mergeWithProps.bind(mergeWithProps,
            {
                tag: 'div'
            }, {
                tag: 123
            }
        )).to.throw(
            'tag should be string'
        );
    });

    it('tag', () => {
        expect(mergeWithProps(
            {
                tag: 'div'
            }, {
                tag: 'span'
            }
        )).to.deep.equal({
            tag: 'span'
        });
    });

    it('invalid mods', () => {
        expect(mergeWithProps.bind(mergeWithProps,
            {
                mods: {
                    mod: 'val'
                }
            }, {
                mods: 'mod'
            }
        )).to.throw(
            'mods should be a plain object'
        );
    });

    it('mods', () => {
        expect(mergeWithProps(
            {
                mods: {
                    mod1: 'val1',
                    mod2: 'val2'
                }
            }, {
                mods: {
                    mod2: 'val2_',
                    mod3: 'val3'
                }
            }
        )).to.deep.equal({
            mods: {
                mod1: 'val1',
                mod2: 'val2_',
                mod3: 'val3'
            }
        });
    });

    it('invalid mix', () => {
        expect(mergeWithProps.bind(mergeWithProps,
            {
                mix: {
                    block: 'block'
                }
            }, {
                mix: 'mix'
            }
        )).to.throw(
            'mix should be a plain object or array'
        );
    });

    it('mix as object to undefined', () => {
        expect(mergeWithProps(
            {
            }, {
                mix: {
                    block: 'block2'
                }
            }
        )).to.deep.equal({
            mix: [
                {
                    block: 'block2'
                }
            ]
        });
    });

    it('mix as array to undefined', () => {
        expect(mergeWithProps(
            {
            }, {
                mix: [
                    {
                        block: 'block2'
                    }
                ]
            }
        )).to.deep.equal({
            mix: [
                {
                    block: 'block2'
                }
            ]
        });
    });

    it('mix as object to object', () => {
        expect(mergeWithProps(
            {
                mix: {
                    block: 'block'
                }
            }, {
                mix: {
                    block: 'block2'
                }
            }
        )).to.deep.equal({
            mix: [
                {
                    block: 'block'
                },
                {
                    block: 'block2'
                }
            ]
        });
    });

    it('mix as object to array', () => {
        expect(mergeWithProps(
            {
                mix: [
                    {
                        block: 'block'
                    }
                ]
            }, {
                mix: {
                    block: 'block2'
                }
            }
        )).to.deep.equal({
            mix: [
                {
                    block: 'block'
                },
                {
                    block: 'block2'
                }
            ]
        });
    });

    it('mix as array to object', () => {
        expect(mergeWithProps(
            {
                mix: {
                    block: 'block'
                }
            }, {
                mix: [
                    {
                        block: 'block2'
                    }
                ]
            }
        )).to.deep.equal({
            mix: [
                {
                    block: 'block'
                },
                {
                    block: 'block2'
                }
            ]
        });
    });

    it('mix as array to array', () => {
        expect(mergeWithProps(
            {
                mix: [
                    {
                        block: 'block'
                    }
                ]
            }, {
                mix: [
                    {
                        block: 'block2'
                    }
                ]
            }
        )).to.deep.equal({
            mix: [
                {
                    block: 'block'
                },
                {
                    block: 'block2'
                }
            ]
        });
    });
});
