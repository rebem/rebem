import { expect } from 'chai';
import React from 'react';
import isReactClass from '../../lib/isReactClass';

describe('isReactClass', () => {
    it('exist', () => {
        expect(isReactClass).to.exist;
    });

    it('be a function', () => {
        expect(isReactClass).to.be.a('function');
    });

    it('not a function', () => {
        expect(isReactClass(
            'string'
        )).to.be.false;
    });

    it('function, but not a class', () => {
        expect(isReactClass(
            function() {}
        )).to.be.false;
    });

    it('function with .render()', () => {
        expect(isReactClass(
            class extends React.Component {}
        )).to.be.true;
    });

    it('inherited class', () => {
        class Foo extends React.Component {}

        expect(isReactClass(
            class extends Foo {}
        )).to.be.true;
    });
});
