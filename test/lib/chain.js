import { expect } from 'chai';

import React from 'react';
import Yummies from '../../lib/';
import {
    yummifyChain,
    yummifyChainClass,
    yummifyChainRaw
} from '../../lib/chain';

describe('chain', () => {
    it('exist', () => {
        expect(yummifyChain).to.exist;
        expect(yummifyChainRaw).to.exist;
    });

    it('yummifyChain()', () => {
        let DummyClass1 = null;
        let DummyClass2 = null;

        const ResultFactory = yummifyChain([
            {
                type: 'main',
                module(Base) {
                    DummyClass1 = class extends Base {
                        test1() {}
                        render() {}
                    };

                    return DummyClass1;
                }
            },
            {
                type: 'main',
                module(Base) {
                    DummyClass2 = class extends Base {
                        test2() {}
                        render() {}
                    };

                    return DummyClass2;
                }
            },
            {
                type: 'styles',
                module: true
            }
        ]);
        const ResultClass = ResultFactory().type;
        const ResultInstance = new ResultClass();

        expect(ResultInstance).to.be.an.instanceOf(Yummies.Component);
        expect(ResultInstance).to.be.an.instanceOf(DummyClass1);
        expect(ResultInstance).to.be.an.instanceOf(DummyClass2);
        expect(ResultInstance).to.have.property('test1');
        expect(ResultInstance).to.have.property('test2');
    });

    it('yummifyChainClass()', () => {
        let DummyClass1 = null;
        let DummyClass2 = null;

        const chain = [
            {
                type: 'main',
                module(Base) {
                    DummyClass1 = class extends Base {
                        test1() {}
                        render() {}
                    };

                    return DummyClass1;
                }
            },
            {
                type: 'main',
                module(Base) {
                    DummyClass2 = class extends Base {
                        test2() {}
                        render() {}
                    };

                    return DummyClass2;
                }
            },
            {
                type: 'styles',
                module: true
            }
        ];

        const ResultClass1 = yummifyChainClass(chain, 'test');
        const ResultClass2 = yummifyChainClass(chain, 'test');
        const ResultInstance = new ResultClass1();

        expect(ResultInstance).to.be.an.instanceOf(Yummies.Component);
        expect(ResultInstance).to.be.an.instanceOf(DummyClass1);
        expect(ResultInstance).to.be.an.instanceOf(DummyClass2);
        expect(ResultInstance).to.have.property('test1');
        expect(ResultInstance).to.have.property('test2');
        expect(ResultClass1).to.be.equal(ResultClass2);
    });

    it('yummifyChainRaw()', () => {
        let DummyClass1 = null;
        let DummyClass2 = null;

        const ResultClassFactory = yummifyChainRaw([
            {
                type: 'main',
                module(Base) {
                    DummyClass1 = class extends Base {
                        test1() {}
                    };

                    return DummyClass1;
                }
            },
            {
                type: 'main',
                module(Base) {
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

        expect(ResultInstance).to.be.an.instanceOf(Yummies.Component);
        expect(ResultInstance).to.be.an.instanceOf(DummyClass1);
        expect(ResultInstance).to.be.an.instanceOf(DummyClass2);
        expect(ResultInstance).to.have.property('test1');
        expect(ResultInstance).to.have.property('test2');
    });

    it('non-Yummies class', () => {
        let WrapperClass = null;

        const chain = [
            {
                type: 'main',
                module(Base) {
                    class DummyClass extends Base {
                        render() {}
                    }

                    WrapperClass = class extends React.Component {
                        render() {
                            return Yummies.createElement(
                                DummyClass,
                                this.props,
                                this.props.children
                            );
                        }
                    };

                    return WrapperClass;
                }
            }
        ];

        const ResultClass = yummifyChainClass(chain);
        const ResultInstance = new ResultClass();

        expect(ResultInstance).to.be.an.instanceOf(React.Component);
        expect(ResultInstance).to.be.an.instanceOf(WrapperClass);
    });
});
