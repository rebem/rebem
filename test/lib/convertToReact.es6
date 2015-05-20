import React from 'react';
import { expect } from 'chai';
import convertToReact from '../../lib/convertToReact';

describe('convertToReact', () => {
    it('exist', () => {
        expect(convertToReact).to.exist;
    });

    it('be a function', () => {
        expect(convertToReact).to.be.a('function');
    });

    it('pass non-BEMJSON through', () => {
        expect(convertToReact(
            React.createElement('span')
        )).to.have.property('type', 'span').and
          .to.not.have.deep.property('props.className');
    });

    it('no block + invalid tag', () => {
        expect(convertToReact.bind(convertToReact, {
            tag: 123
        })).to.throw(
            'tag should be string'
        );
    });

    it('no block + default tag', () => {
        expect(convertToReact(
            {}
        )).to.have.property('type', 'div').and
          .to.not.have.deep.property('props.className');
    });

    it('no block + custom tag', () => {
        expect(convertToReact({
            tag: 'span'
        })).to.have.property('type', 'span').and
           .to.not.have.deep.property('props.className');
    });

    it('invalid block', () => {
        expect(convertToReact.bind(convertToReact, {
            block: 123
        })).to.throw(
            'block should be string'
        );
    });

    it('block', () => {
        expect(convertToReact({
            block: 'block'
        })).to.have.deep.property('props.className');
    });

    it('no block + elem', () => {
        expect(convertToReact.bind(convertToReact, {
            elem: 'elem'
        })).to.throw(
            'you should provide block along with elem'
        );
    });

    it('block + invalid elem', () => {
        expect(convertToReact.bind(convertToReact, {
            block: 'block',
            elem: 123
        })).to.throw(
            'elem should be string'
        );
    });

    it('no block + mods', () => {
        expect(convertToReact.bind(convertToReact, {
            mods: {
                mod: 'val'
            }
        })).to.throw(
            'you should provide block/elem along with mods'
        );
    });

    it('block + invalid mods', () => {
        expect(convertToReact.bind(convertToReact, {
            block: 'block',
            mods: 'mod'
        })).to.throw(
            'mods should be a plain object'
        );
    });

    it('block + mods', () => {
        expect(convertToReact({
            block: 'block',
            mods: {
                mod: 'val'
            }
        })).to.have.deep.property('props.className');
    });

    it('block + mix', () => {
        expect(convertToReact({
            block: 'block',
            mix: {
                block: 'block2'
            }
        })).to.have.deep.property('props.className');
    });

    it('block + invalid mix', () => {
        expect(convertToReact.bind(convertToReact, {
            block: 'block',
            mix: 'mix'
        })).to.throw(
            'mix should be a plain object or array'
        );
    });

    it('no block + invalid props', () => {
        expect(convertToReact.bind(convertToReact, {
            props: 'props'
        })).to.throw(
            'props should be a plain object'
        );
    });

    it('block + simple content', () => {
        expect(convertToReact({
            block: 'block',
            content: 123
        })).to.have.deep.property('props.children', 123);
    });

    it('block + multiple simple content', () => {
        expect(convertToReact({
            block: 'block',
            content: [
                123,
                456
            ]
        })).to.have.deep.property('props.children')
           .that.is.an('array')
           .which.have.members([ 123, 456 ]);
    });

    it('block + content with elem with context', () => {
        expect(convertToReact({
            block: 'block',
            content: {
                elem: 'elem'
            }
        })).to.have.deep.property('props.children.props.className', 'block__elem');
    });

    it('block + raw content + elem with context', () => {
        const children = convertToReact({
            block: 'block',
            content: {
                tag: 'span',
                content: {
                    elem: 'elem'
                }
            }
        }).props.children;

        expect(children).to.have.property('type', 'span');
        expect(children.props.children.props).to.have.property('className', 'block__elem');
    });

    it('block + complex content', () => {
        const children = convertToReact({
            block: 'block',
            content: [
                {
                    elem: 'elem',
                    props: {
                        key: 'elem1'
                    }
                },
                React.createElement('span', { key: 'elem2' })
            ]
        }).props.children;

        expect(children).to.have.deep.property('[0].props.className', 'block__elem');
        expect(children).to.have.deep.property('[1].type', 'span');
    });
});
