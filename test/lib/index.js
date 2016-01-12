import React from 'react';
import ReactDOMServer from 'react-dom/server';
import TestUtils from 'react-addons-test-utils';
import assert from 'assert';

import BEM from '../../lib/';

function test(bemjson, html) {
    assert.strictEqual(
        ReactDOMServer.renderToStaticMarkup(
            BEM(bemjson)
        ),
        html
    );
}

describe('convertToReact', function() {
    it('exist', function() {
        assert(typeof BEM !== 'undefined');
    });

    it('function', function() {
        assert(typeof BEM === 'function');
    });

    describe('convert', function() {
        it('ReactElement', function() {
            const arg = React.createElement('span');

            assert(BEM(arg) === arg);
        });

        it('Array', function() {
            const arg = [ 'beep', 'boop' ];
            const result = BEM(arg);

            assert(result[0] === arg[0]);
            assert(result[1] === arg[1]);
        });

        it('not plain object', function() {
            const arg = 'beep';

            assert(BEM(arg) === arg);
        });

        describe('bemjson', function() {
            it('ReactElement is returned', function() {
                const result = BEM({});

                assert(TestUtils.isElement(result));
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
                        props: {
                            className: 'test'
                        }
                    },
                    '<div class="test"></div>'
                );
            });

            describe('block', function() {
                it('invalid block', function() {
                    test(
                        {
                            block: true
                        },
                        '<div></div>'
                    );
                });

                it('valid block', function() {
                    test(
                        {
                            block: 'block'
                        },
                        '<div class="block"></div>'
                    );
                });
            });

            describe('elem', function() {
                it('elem without block', function() {
                    test(
                        {
                            elem: 'elem'
                        },
                        '<div></div>'
                    );
                });

                it('invalid elem', function() {
                    test(
                        {
                            elem: true
                        },
                        '<div></div>'
                    );
                });
            });

            describe('mods', function() {
                it('invalid mods', function() {
                    test(
                        {
                            mods: null
                        },
                        '<div></div>'
                    );
                });

                describe('block', function() {
                    it('mods without block', function() {
                        test(
                            {
                                mods: {
                                    mod: 'val'
                                }
                            },
                            '<div></div>'
                        );
                    });

                    it('block + invalid mods', function() {
                        test(
                            {
                                block: 'block',
                                mods: true
                            },
                            '<div class="block"></div>'
                        );
                    });

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
                    it('mods without block', function() {
                        test(
                            {
                                elem: 'elem',
                                mods: {
                                    mod: 'val'
                                }
                            },
                            '<div></div>'
                        );
                    });

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
                it('invalid mix without block', function() {
                    test(
                        {
                            mix: false
                        },
                        '<div></div>'
                    );
                });

                it('simple mix', function() {
                    test(
                        {
                            mix: {
                                block: 'block'
                            }
                        },
                        '<div class="block"></div>'
                    );
                });

                it('complex mix', function() {
                    test(
                        {
                            mix: {
                                block: 'block',
                                elem: 'elem',
                                mods: {
                                    mod1: 'val1',
                                    mod2: 'val2'
                                }
                            }
                        },
                        '<div class="block__elem block__elem_mod1_val1 block__elem_mod2_val2"></div>'
                    );
                });

                it('multiple mixes', function() {
                    test(
                        {
                            mix: [
                                {
                                    block: 'block1'
                                },
                                {
                                    block: 'block2'
                                }
                            ]
                        },
                        '<div class="block1 block2"></div>'
                    );
                });

                it('recursive mixes', function() {
                    test(
                        {
                            mix: {
                                block: 'block1',
                                mix: {
                                    block: 'block2'
                                }
                            }
                        },
                        '<div class="block1 block2"></div>'
                    );
                });
            });

            describe('content', function() {
                it('empty', function() {
                    test(
                        {
                            content: true
                        },
                        '<div></div>'
                    );

                    test(
                        {
                            content: null
                        },
                        '<div></div>'
                    );
                });

                it('text content', function() {
                    test(
                        {
                            content: 'abc'
                        },
                        '<div>abc</div>'
                    );

                    test(
                        {
                            content: 123
                        },
                        '<div>123</div>'
                    );
                });

                it('React Element', function() {
                    test(
                        {
                            content: React.createElement('span')
                        },
                        '<div><span></span></div>'
                    );
                });

                it('array', function() {
                    test(
                        {
                            content: [
                                1,
                                2
                            ]
                        },
                        '<div>12</div>'
                    );
                });

                it('simple bemjson', function() {
                    test(
                        {
                            content: {
                                block: 'block',
                                tag: 'span'
                            }
                        },
                        '<div><span class="block"></span></div>'
                    );
                });

                it('inherited block context', function() {
                    test(
                        {
                            block: 'block',
                            content: {
                                elem: 'elem1',
                                content: {
                                    elem: 'elem2'
                                }
                            }
                        },
                        '<div class="block"><div class="block__elem1"><div class="block__elem2"></div></div></div>'
                    );
                });
            });
        });
    });
});
