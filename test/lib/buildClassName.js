import assert from 'assert';

import buildClassName from '../../lib/buildClassName';

describe('buildClassName', function() {
    it('is function', function() {
        assert(typeof buildClassName === 'function');
    });

    it('empty class if called without argument', function() {
        assert(buildClassName() === '');
    });
});
