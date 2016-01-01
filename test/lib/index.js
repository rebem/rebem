import { expect } from 'chai';
import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';

import Yummies from '../../lib/';

const dummyBlock = { block: 'block' };

describe('yummies', () => {
    it('exist', () => {
        expect(Yummies).to.exist;
    });

    // TODO: somehow check for prototype in old browsers
    describe('Component', () => {
        expect(Yummies.Component.__yummies__).to.be.true;
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

        it('type + props + children', () => {
            const testElement = Yummies.createElement('span', { foo: 'bar' }, null);

            expect(TestUtils.isElement(testElement)).to.be.true;
            expect(testElement.props.foo).to.be.equal('bar');
            expect(testElement.props.children).to.be.null;
        });
    });

    describe('createFactory()', () => {
        it('type + props + children', () => {
            const testFactory = Yummies.createFactory('div');
            const testElement = testFactory({ foo: 'bar' }, null);

            expect(TestUtils.isElement(testElement)).to.be.true;
            expect(testElement.props.foo).to.be.equal('bar');
            expect(testElement.props.children).to.be.null;
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
            const preparedInstance = TestUtils.renderIntoDocument(
                Yummies.createElement(PreparedClass)
            );

            expect(TestUtils.isCompositeComponent(preparedInstance)).to.be.true;
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

            expect(preparedInstance).to.be.an.instanceOf(DummyClass);
        });
    });
});
