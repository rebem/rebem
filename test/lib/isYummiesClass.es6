import { expect } from 'chai';
import React from 'react';
import Yummies from '../../lib/yummies';
import isYummiesClass from '../../lib/isYummiesClass';

describe('isYummiesClass', () => {
    it('exist', () => {
        expect(isYummiesClass).to.exist;
    });

    it('be a function', () => {
        expect(isYummiesClass).to.be.a('function');
    });

    it('not a function', () => {
        expect(isYummiesClass(
            'string'
        )).to.be.false;
    });

    it('function, but not a class', () => {
        expect(isYummiesClass(
            function() {}
        )).to.be.false;
    });

    it('inherited from Yummies.Component', () => {
        expect(isYummiesClass(
            class extends Yummies.Component { render() {} }
        )).to.be.true;
    });

    it('inherited from React.Component', () => {
        expect(isYummiesClass(
            class extends React.Component { render() {} }
        )).to.be.false;
    });

    it('react@<=0.12 class', () => {
        expect(isYummiesClass(
            React.createClass({ render() {} })
        )).to.be.false;
    });
});
