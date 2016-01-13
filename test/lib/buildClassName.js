import assert from 'assert';

import buildClassName from '../../lib/buildClassName';

describe('buildClassName', () => {
    it('exist', () => {
        assert(typeof buildClassName !== 'undefined');
    });

    it('function', () => {
        assert(typeof buildClassName === 'function');
    });

    it('no arguments', () => {
        assert(buildClassName() === '');
    });

    it('invalid argument', () => {
        assert(buildClassName(true) === '');
    });
});
