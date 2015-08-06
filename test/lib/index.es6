import { expect } from 'chai';
import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';

import Yummies from '../../lib/';

const dummyBlock = { block: 'block' };

describe('yummies', () => {
    it('exist', () => {
        expect(Yummies).to.exist;
    });

    describe('Component', () => {
        expect(
            Object.getPrototypeOf(Yummies.Component)
        ).to.be.equal(React.Component);
    });

    describe('createElement()', () => {
        it('class', () => {
            expect(
                TestUtils.isElement(
                    Yummies.createElement(
                        class extends Yummies.Component {
                            render() {
                                return dummyBlock;
                            }
                        }
                    )
                )
            ).to.be.true;
        });

        it('BEMJSON', () => {
            expect(
                TestUtils.isElement(
                    Yummies.createElement(dummyBlock)
                )
            ).to.be.true;
        });

        it('type + props', () => {
            expect(
                TestUtils.isElement(
                    Yummies.createElement('span', {})
                )
            ).to.be.true;
        });
    });

    describe('createFactory()', () => {
        it('tag', () => {
            expect(
                TestUtils.isElement(
                    Yummies.createFactory('div')()
                )
            ).to.be.true;
        });

        it('class', () => {
            expect(
                TestUtils.isElement(
                    Yummies.createFactory(
                        class extends Yummies.Component {
                            render() {
                                return dummyBlock;
                            }
                        }
                    )()
                )
            ).to.be.true;
        });
    });

    describe('yummify()', () => {
        it('json', () => {
            class DummyClass extends Yummies.Component {
                constructor(props) {
                    super(props);
                }

                render() {
                    return dummyBlock;
                }
            }

            const PreparedClass = Yummies.yummify(DummyClass);
            const preparedInstance = new PreparedClass();

            expect(
                Yummies.renderToString(
                    Yummies.createFactory(PreparedClass)()
                )
            ).to.be.a('string');

            expect(preparedInstance).to.be.an.instanceOf(DummyClass);
        });

        it('null', () => {
            class DummyClass extends Yummies.Component {
                constructor(props) {
                    super(props);
                }

                render() {
                    return null;
                }
            }

            const PreparedClass = Yummies.yummify(DummyClass);
            const preparedInstance = new PreparedClass();

            expect(
                Yummies.renderToString(
                    Yummies.createFactory(PreparedClass)()
                )
            ).to.be.a('string');

            expect(preparedInstance).to.be.an.instanceOf(DummyClass);
        });

        it('ReactElement', () => {
            class DummyClass extends Yummies.Component {
                constructor(props) {
                    super(props);
                }

                render() {
                    return Yummies.createElement(dummyBlock);
                }
            }

            const PreparedClass = Yummies.yummify(DummyClass);
            const preparedInstance = new PreparedClass();

            expect(
                Yummies.renderToString(
                    Yummies.createFactory(PreparedClass)()
                )
            ).to.be.a('string');

            expect(preparedInstance).to.be.an.instanceOf(DummyClass);
        });
    });
});
