import React from 'react';
import { expect } from 'chai';

import convertToReact from '../../lib/';

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
});
