import { expect } from 'chai';
import TestUtils from 'react/lib/ReactTestUtils';

import Yummies from '../../lib/';

const dummyBlock = { block: 'block' };

describe('yummies', () => {
    it('exist', () => {
        expect(Yummies).to.exist;
    });

    describe('Component', () => {
        expect(Yummies.Component.__yummified__).to.be.false;
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

    describe('cloneElement()', () => {
        it('BEMJSON', () => {
            const clonedElement = Yummies.cloneElement(dummyBlock);

            expect(TestUtils.isElement(clonedElement)).to.be.true;
            expect(clonedElement.props.className).to.be.equal(dummyBlock.block);
        });

        it('BEMJSON + props with mix', () => {
            const props = {
                test: 123,
                mix: {
                    block: 'block2'
                }
            };
            const clonedElement = Yummies.cloneElement(dummyBlock, props);

            expect(TestUtils.isElement(clonedElement)).to.be.true;
            expect(clonedElement.props.test).to.be.deep.equal(props.test);
            expect(clonedElement.props.className).to.be.equal('block block2');
        });

        it('BEMJSON + props + children', () => {
            const props = {
                test: 123
            };
            const children = {
                block: 'block2'
            };
            const clonedElement = Yummies.cloneElement(dummyBlock, props, children);
            const childrenElement = clonedElement.props.children;

            expect(TestUtils.isElement(clonedElement)).to.be.true;
            expect(TestUtils.isElement(childrenElement)).to.be.true;
            expect(childrenElement.props.className).to.be.equal('block2');
        });

        it('element', () => {
            const dummyElement = Yummies.createElement('div');
            const clonedElement = Yummies.cloneElement(dummyElement);

            expect(TestUtils.isElement(clonedElement)).to.be.true;
        });

        it('element + props with mix', () => {
            const props = {
                test: 123,
                mix: {
                    block: 'block2'
                }
            };
            const dummyElement = Yummies.createElement('div', { className: 'block' });
            const clonedElement = Yummies.cloneElement(dummyElement, props);

            expect(TestUtils.isElement(clonedElement)).to.be.true;
            expect(clonedElement.props.test).to.be.deep.equal(props.test);
            expect(clonedElement.props.className).to.be.equal('block block2');
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
