import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { isElement } from 'react-addons-test-utils';
import assert from 'assert';

import {
    BEM,
    blockFactory,
    buildClassName
} from '../../lib/';

import {
    BEM as BEMJSX,
    blockFactory as blockFactoryJSX,
    buildClassName as buildClassNameJSX
} from '../../lib/jsx';

function test(props, result) {
    assert.strictEqual(
        renderToStaticMarkup(
            BEM(props)
        ),
        result
    );

    assert.strictEqual(
        renderToStaticMarkup(
            createElement(BEMJSX, props)
        ),
        result
    );
}

describe('rebem', function() {
    describe('buildClassName', function() {
        it('is function', function() {
            assert(typeof buildClassName === 'function');
            assert(typeof buildClassNameJSX === 'function');
        });
    });

    describe('BEM', function() {
        it('is function', function() {
            assert(typeof BEM === 'function');
            assert(typeof BEMJSX === 'function');
        });

        describe('bemjson', function() {
            it('ReactElement is returned', function() {
                assert.ok(
                    isElement(
                        BEM({})
                    )
                );

                assert.ok(
                    isElement(
                        createElement(BEMJSX)
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

            it('props', function() {
                test(
                    {
                        className: 'test'
                    },
                    '<div class="test"></div>'
                );
            });

            describe('block', function() {
                it('simple', function() {
                    test(
                        {
                            block: 'block'
                        },
                        '<div class="block"></div>'
                    );
                });

                it('props.className + block', function() {
                    test(
                        {
                            block: 'block2',
                            className: 'block1'
                        },
                        '<div class="block1 block2"></div>'
                    );
                });
            });

            describe('mods', function() {
                describe('block', function() {
                    it('block + mod', function() {
                        test(
                            {
                                block: 'block',
                                mods: {
                                    mod: 'val'
                                }
                            },
                            '<div class="block block_mod_val"></div>'
                        );
                    });

                    it('block + few mods', function() {
                        test(
                            {
                                block: 'block',
                                mods: {
                                    mod1: 'val1',
                                    mod2: 'val2'
                                }
                            },
                            '<div class="block block_mod1_val1 block_mod2_val2"></div>'
                        );
                    });

                    it('block + shorthand mod = true', function() {
                        test(
                            {
                                block: 'block',
                                mods: {
                                    mod: true
                                }
                            },
                            '<div class="block block_mod"></div>'
                        );
                    });

                    it('block + shorthand mod = false', function() {
                        test(
                            {
                                block: 'block',
                                mods: {
                                    mod: false
                                }
                            },
                            '<div class="block"></div>'
                        );
                    });
                });

                describe('elem', function() {
                    it('block + elem + mod', function() {
                        test(
                            {
                                block: 'block',
                                elem: 'elem',
                                mods: {
                                    mod: 'val'
                                }
                            },
                            '<div class="block__elem block__elem_mod_val"></div>'
                        );
                    });

                    it('block + elem + few mods', function() {
                        test(
                            {
                                block: 'block',
                                elem: 'elem',
                                mods: {
                                    mod1: 'val1',
                                    mod2: 'val2'
                                }
                            },
                            '<div class="block__elem block__elem_mod1_val1 block__elem_mod2_val2"></div>'
                        );
                    });

                    it('block + shorthand mod = true', function() {
                        test(
                            {
                                block: 'block',
                                elem: 'elem',
                                mods: {
                                    mod: true
                                }
                            },
                            '<div class="block__elem block__elem_mod"></div>'
                        );
                    });

                    it('block + shorthand mod = false', function() {
                        test(
                            {
                                block: 'block',
                                elem: 'elem',
                                mods: {
                                    mod: false
                                }
                            },
                            '<div class="block__elem"></div>'
                        );
                    });
                });
            });

            describe('mix', function() {
                it('mix without block', function() {
                    test(
                        {
                            mix: {
                                block: 'block'
                            }
                        },
                        '<div class="block"></div>'
                    );
                });

                it('block + mix', function() {
                    test(
                        {
                            block: 'block1',
                            mix: {
                                block: 'block2'
                            }
                        },
                        '<div class="block1 block2"></div>'
                    );
                });

                it('block + mods + mix', function() {
                    test(
                        {
                            block: 'block1',
                            mods: {
                                mod: 'val'
                            },
                            mix: {
                                block: 'block2'
                            }
                        },
                        '<div class="block1 block1_mod_val block2"></div>'
                    );
                });

                it('block + elem + mix', function() {
                    test(
                        {
                            block: 'block1',
                            elem: 'elem',
                            mix: {
                                block: 'block2'
                            }
                        },
                        '<div class="block1__elem block2"></div>'
                    );
                });

                it('block + elem + mods + mix', function() {
                    test(
                        {
                            block: 'block1',
                            elem: 'elem',
                            mods: {
                                mod: 'val'
                            },
                            mix: {
                                block: 'block2'
                            }
                        },
                        '<div class="block1__elem block1__elem_mod_val block2"></div>'
                    );
                });

                it('complex mix', function() {
                    test(
                        {
                            block: 'block1',
                            mix: {
                                block: 'block2',
                                elem: 'elem',
                                mods: {
                                    mod1: 'val1',
                                    mod2: 'val2'
                                }
                            }
                        },
                        '<div class="block1 block2__elem block2__elem_mod1_val1 block2__elem_mod2_val2"></div>'
                    );
                });

                it('multiple mixes', function() {
                    test(
                        {
                            block: 'block1',
                            mix: [
                                {
                                    block: 'block2'
                                },
                                {
                                    block: 'block3'
                                }
                            ]
                        },
                        '<div class="block1 block2 block3"></div>'
                    );
                });

                it('multiple mixes with holes', function() {
                    test(
                        {
                            block: 'block1',
                            mix: [
                                undefined,
                                {
                                    block: 'block2'
                                },
                                null
                            ]
                        },
                        '<div class="block1 block2"></div>'
                    );
                });

                it('recursive mixes', function() {
                    test(
                        {
                            block: 'block1',
                            mix: {
                                block: 'block2',
                                mix: {
                                    block: 'block3'
                                }
                            }
                        },
                        '<div class="block1 block2 block3"></div>'
                    );
                });
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
            assert(typeof blockFactoryJSX === 'function');
        });

        it('isEqual BEM', function() {
            const block = blockFactory('block');
            const blockJSX = blockFactoryJSX('block');
            const result = '<div class="block__elem"></div>';

            assert.strictEqual(
                renderToStaticMarkup(
                    block({ elem: 'elem' })
                ),
                result
            );

            assert.strictEqual(
                renderToStaticMarkup(
                    createElement(blockJSX, { elem: 'elem' })
                ),
                result
            );
        });
    });
});
