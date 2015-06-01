import { expect } from 'chai';
import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import Yummies from '../../lib/yummies';

const dummyBlock = { block: 'block' };

describe('yummies', () => {
    it('exist', () => {
        expect(Yummies).to.exist;
    });

    it('render()', () => {
        expect(
            TestUtils.isCompositeComponent(
                Yummies.render(
                    { block: 'block' },
                    document.createElement('div')
                )
            )
        ).to.be.true;
    });

    it('renderToString()', () => {
        expect(
            Yummies.renderToString(dummyBlock)
        ).to.be.a('string');
    });

    it('renderToStaticMarkup()', () => {
        expect(
            Yummies.renderToStaticMarkup(dummyBlock)
        ).to.be.a('string');
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

    describe('Component', () => {
        expect(
            Object.getPrototypeOf(Yummies.Component)
        ).to.be.equal(React.Component);
    });

    describe('_prepareClass()', () => {
        it('json', () => {
            class DummyClass extends Yummies.Component {
                constructor(props) {
                    super(props);
                }

                render() {
                    return dummyBlock;
                }
            }

            const PreparedClass = Yummies._prepareClass(DummyClass);
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

            const PreparedClass = Yummies._prepareClass(DummyClass);
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

            const PreparedClass = Yummies._prepareClass(DummyClass);
            const preparedInstance = new PreparedClass();

            expect(
                Yummies.renderToString(
                    Yummies.createFactory(PreparedClass)()
                )
            ).to.be.a('string');

            expect(preparedInstance).to.be.an.instanceOf(DummyClass);
        });
    });

    it('_mixins()', () => {
        let MixinClass1;
        let MixinClass2;

        function Mixin1(Base) {
            MixinClass1 = class extends Base {
                test1() {}
            };

            return MixinClass1;
        }

        function Mixin2(Base) {
            MixinClass2 = class extends Base {
                test2() {}
            };

            return MixinClass2;
        }

        class DummyClass {
            static get mixins() {
                return [ Mixin1, Mixin2 ];
            }
        }

        const MixedClass = Yummies._mixins(DummyClass);
        const mixedInstance = new MixedClass();

        expect(mixedInstance).to.be.an.instanceOf(DummyClass);
        expect(mixedInstance).to.be.an.instanceOf(MixinClass1);
        expect(mixedInstance).to.be.an.instanceOf(MixinClass2);
        expect(mixedInstance).to.have.property('test1');
        expect(mixedInstance).to.have.property('test2');
    });

    it('_propTypes', () => {
        expect(Yummies._propTypes([
            {
                type: 'propTypes',
                module: {
                    a: 1,
                    b: 2
                }
            },
            {
                type: 'propTypes',
                module: {
                    b: 3
                }
            }
        ])).to.be.deep.equal({
            a: 1,
            b: 3
        });
    });

    it('yummify()', () => {
        let DummyClass1;
        let DummyClass2;

        const ResultFactory = Yummies.yummify([
            {
                type: 'main',
                module: function(Base) {
                    DummyClass1 = class extends Base {
                        test1() {}
                    };

                    return DummyClass1;
                }
            },
            {
                type: 'main',
                module: function(Base) {
                    DummyClass2 = class extends Base {
                        test2() {}
                    };

                    return DummyClass2;
                }
            },
            {
                type: 'styles',
                module: true
            },
            {
                type: 'propTypes',
                module: {
                    a: Yummies.PropTypes.number,
                    b: Yummies.PropTypes.number
                }
            }
        ]);
        const ResultClass = ResultFactory().type;
        const ResultInstance = new ResultClass();

        expect(ResultClass).to.have.property('propTypes');
        expect(ResultInstance).to.be.an.instanceOf(Yummies.Component);
        expect(ResultInstance).to.be.an.instanceOf(DummyClass1);
        expect(ResultInstance).to.be.an.instanceOf(DummyClass2);
        expect(ResultInstance).to.have.property('test1');
        expect(ResultInstance).to.have.property('test2');
    });

    it('yummifyRaw()', () => {
        let DummyClass1;
        let DummyClass2;

        const ResultClassFactory = Yummies.yummifyRaw([
            {
                type: 'main',
                module: function(Base) {
                    DummyClass1 = class extends Base {
                        test1() {}
                    };

                    return DummyClass1;
                }
            },
            {
                type: 'main',
                module: function(Base) {
                    DummyClass2 = class extends Base {
                        test2() {}
                    };

                    return DummyClass2;
                }
            },
            {
                type: 'styles',
                module: true
            }
        ]);
        const ResultClass = ResultClassFactory(Yummies.Component);
        const ResultInstance = new ResultClass();

        expect(ResultClass).to.not.have.property('propTypes');
        expect(ResultInstance).to.be.an.instanceOf(Yummies.Component);
        expect(ResultInstance).to.be.an.instanceOf(DummyClass1);
        expect(ResultInstance).to.be.an.instanceOf(DummyClass2);
        expect(ResultInstance).to.have.property('test1');
        expect(ResultInstance).to.have.property('test2');
    });
});
