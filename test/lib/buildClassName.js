import assert from 'assert';

import buildClassName from '../../lib/buildClassName';

describe('buildClassName', function() {
    it('exist', function() {
        assert(typeof buildClassName !== 'undefined');
    });

    it('function', function() {
        assert(typeof buildClassName === 'function');
    });

    it('no arguments', function() {
        assert(buildClassName() === '');
    });

    it('invalid argument', function() {
        assert(buildClassName(true) === '');
    });
});
