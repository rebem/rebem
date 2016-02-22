import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { isElement } from 'react-addons-test-utils';
import assert from 'assert';

import {
    BEM,
    blockFactory
} from '../../lib/';

function test(props, result) {
    assert.strictEqual(
        renderToStaticMarkup(
            BEM(props)
        ),
        result
    );
}

describe('rebem', function() {
    describe('BEM', function() {
        it('is function', function() {
            assert(typeof BEM === 'function');
        });

        describe('bemjson', function() {
            it('ReactElement is returned', function() {
                assert.ok(
                    isElement(
                        BEM({})
                    )
                );
            });

            it('default tag', function() {
                test(
                    {},
                    '<div></div>'
                );
            });

            it('tag', function() {
                test(
                    {
                        tag: 'span'
                    },
                    '<span></span>'
                );
            });

            it('buildClassName', function() {
                test(
                    {
                        block: 'block1',
                        elem: 'elem',
                        mods: {
                            mod: 'val'
                        },
                        mix: {
                            block: 'block2'
                        },
                        className: 'hello'
                    },
                    '<div class="block1__elem block1__elem_mod_val block2 hello"></div>'
                );
            });

            it('bemjson is not mutated', function() {
                const bemjson = {
                    block: 'block',
                    test: true
                };

                BEM(bemjson);

                assert(typeof bemjson.tag === 'undefined');
                assert(typeof bemjson.className === 'undefined');
            });
        });

        describe('children', function() {
            it('simple', function() {
                test(
                    {
                        tag: 'span',
                        children: createElement('i')
                    },
                    '<span><i></i></span>'
                );
            });

            it('multiple', function() {
                test(
                    {
                        tag: 'span',
                        children: [
                            createElement('i', { key: 'i' }),
                            createElement('b', { key: 'b' })
                        ]
                    },
                    '<span><i></i><b></b></span>'
                );
            });
        });
    });

    describe('blockFactory', function() {
        it('is function', function() {
            assert(typeof blockFactory === 'function');
        });

        it('isEqual BEM', function() {
            const block = blockFactory('block');
            const result = '<div class="block__elem"></div>';

            assert.strictEqual(
                renderToStaticMarkup(
                    block({ elem: 'elem' })
                ),
                result
            );
        });
    });
});
