import assert from 'assert';

import { BEM } from '../../lib/';

function test(bemjson, message) {
    const origConsoleWarn = console.warn;

    console.warn = function(warning, obj) {
        assert.strictEqual(warning, message);
        assert.deepEqual(obj, bemjson);
    };

    BEM(bemjson);

    console.warn = origConsoleWarn;
}

describe('validate', function() {
    describe('block', function() {
        it('invalid block', function() {
            test(
                {
                    block: true
                },
                'block should be string'
            );
        });
    });

    describe('elem', function() {
        it('elem without block', function() {
            test(
                {
                    elem: 'elem'
                },
                'you should provide block along with elem'
            );
        });

        it('invalid elem', function() {
            test(
                {
                    block: 'block',
                    elem: true
                },
                'elem should be string'
            );
        });
    });

    describe('mods', function() {
        it('mods without block', function() {
            test(
                {
                    mods: {
                        mod: 'val'
                    }
                },
                'you should provide block along with mods'
            );
        });

        it('block + invalid mods', function() {
            test(
                {
                    block: 'block',
                    mods: true
                },
                'mods should be a plain object'
            );
        });
    });

    describe('mix', function() {
        it('invalid mix', function() {
            test(
                {
                    mix: false
                },
                'mix should be a plain object or array on plain objects'
            );
        });
    });
});
