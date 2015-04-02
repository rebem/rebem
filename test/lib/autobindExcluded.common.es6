import { expect } from 'chai';
import autobindExcluded from '../../lib/autobindExcluded';

describe('autobindExcluded', () => {
    it('exist', () => {
        expect(autobindExcluded).to.exist;
    });

    it('be a non-empty array', () => {
        expect(autobindExcluded).to.be.an('array').that.is.not.empty;
    });
});
