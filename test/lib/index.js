import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';

import Yummies from '../../lib/';
import buildClassName from '../../lib/buildClassName';

describe('convertToReact', function() {
    it('exist', function() {
        expect(Yummies).to.exist;
    });

    it('be a function', function() {
        expect(Yummies).to.be.a('function');
    });

    describe('convert', function() {
        it('ReactElement', function() {
            const arg = React.createElement('span');

            expect(Yummies(arg)).to.be.equal(arg);
        });

        it('Array', function() {
            const arg = [ 'beep', 'boop' ];

            expect(Yummies(arg)).to.be.deep.equal(arg);
        });

        it('not plain object', function() {
            const arg = 'beep';

            expect(Yummies(arg)).to.be.equal(arg);
        });

        describe('bemjson', function() {
            describe('{}', function() {
                const result = Yummies({});

                it('isElement', function() {
                    expect(TestUtils.isElement(result)).to.be.true;
                });

                it('default tag', function() {
                    expect(result).to.have.property('type', 'div');
                });

                it('no className', function() {
                    expect(result).to.have.deep.property('props.className', '');
                });
            });

            describe('props', function() {
                const bemjson = {
                    props: {
                        beep: 1,
                        boop: 2
                    }
                };
                const result = Yummies(bemjson);

                it('isElement', function() {
                    expect(TestUtils.isElement(result)).to.be.true;
                });

                it('props are passed', function() {
                    expect(result).to.have.property('props');
                    expect(result.props.beep).to.be.equal(bemjson.props.beep);
                    expect(result.props.boop).to.be.equal(bemjson.props.boop);
                });
            });

            describe('tag', function() {
                const bemjson = {
                    tag: 'span'
                };
                const result = Yummies(bemjson);

                it('isElement', function() {
                    expect(TestUtils.isElement(result)).to.be.true;
                });

                it('tag is "span"', function() {
                    expect(result).to.have.property('type', 'span');
                });
            });

            describe('block', function() {
                const bemjson = {
                    block: 'beep'
                };
                const result = Yummies(bemjson);

                it('isElement', function() {
                    expect(TestUtils.isElement(result)).to.be.true;
                });

                it('className is "beep"', function() {
                    expect(result).to.have.deep.property('props.className', buildClassName(bemjson));
                });
            });

            describe('block + content with block', function() {
                const bemjson = {
                    block: 'beep',
                    content: {
                        block: 'boop'
                    }
                };
                const result = Yummies(bemjson);

                it('isElement', function() {
                    expect(TestUtils.isElement(result)).to.be.true;
                });

                it('has props.children', function() {
                    expect(result).to.have.deep.property('props.children');
                });

                describe('props.children', function() {
                    const children = result.props.children;

                    it('is an Object', function() {
                        expect(children).to.be.an('object');
                    });

                    it('isElement', function() {
                        expect(TestUtils.isElement(children)).to.be.true;
                    });
                });
            });

            describe('block + content with blocks', function() {
                const bemjson = {
                    block: 'beep',
                    content: [
                        {
                            block: 'foo',
                            props: {
                                key: 'foo'
                            }
                        },
                        {
                            block: 'bar',
                            props: {
                                key: 'bar'
                            }
                        }
                    ]
                };
                const result = Yummies(bemjson);

                it('isElement', function() {
                    expect(TestUtils.isElement(result)).to.be.true;
                });

                it('has props.children', function() {
                    expect(result).to.have.deep.property('props.children');
                });

                describe('props.children', function() {
                    const children = result.props.children;

                    it('is an Array', function() {
                        expect(children).to.be.an('array');
                    });

                    it('has length of 2', function() {
                        expect(children).to.have.length(2);
                    });

                    it('contains ReactElements', function() {
                        expect(TestUtils.isElement(children[0])).to.be.true;
                        expect(TestUtils.isElement(children[1])).to.be.true;
                    });
                });
            });

            describe('block + content with elem (inherited block context)', function() {
                const bemjson = {
                    block: 'beep',
                    content: {
                        elem: 'boop'
                    }
                };
                const result = Yummies(bemjson);
                const children = result.props.children;

                it('children.props.className is "boop"', function() {
                    expect(children).to.have.deep.property(
                        'props.className',
                        buildClassName({
                            block: 'beep',
                            elem: 'boop'
                        }
                    ));
                });
            });

            it('bemjson is not mutated', function() {
                const bemjson = {
                    block: 'beep',
                    props: {
                        test: true
                    },
                    content: {
                        elem: 'boop'
                    }
                };

                Yummies(bemjson);

                expect(bemjson).to.be.deep.equal({
                    block: 'beep',
                    props: {
                        test: true
                    },
                    content: {
                        elem: 'boop'
                    }
                });
            });
        });
    });
});
