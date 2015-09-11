import React from 'react';
import { expect } from 'chai';
import convertToReactType from '../../lib/convertToReactType';

describe('convertToReactType', () => {
    it('exist', () => {
        expect(convertToReactType).to.exist;
    });

    it('be a function', () => {
        expect(convertToReactType).to.be.a('function');
    });

    // TODO more tests
});
