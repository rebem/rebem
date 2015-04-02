import { expect } from 'chai';
import TestUtils from 'react/lib/ReactTestUtils';
import Yummies from '../../lib/yummies';

const dummyBlock = { block: 'block' };

describe('yummies', () => {
    it('exist', () => {
        expect(Yummies).to.exist;
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

    it('createElement()', () => {
        expect(
            TestUtils.isElement(
                Yummies.createElement(dummyBlock)
            )
        ).to.be.true;
    });

    describe('createClass()', () => {
        it('json', () => {
            expect(
                Yummies.renderToString(
                    Yummies.createFactory(Yummies.createClass({
                        render() {
                            return dummyBlock;
                        }
                    }))()
                )
            ).to.be.a('string');
        });

        it('null', () => {
            expect(
                Yummies.renderToString(
                    Yummies.createFactory(Yummies.createClass({
                        render() {
                            return null;
                        }
                    }))()
                )
            ).to.be.a('string');
        });

        it('ReactElement', () => {
            expect(
                Yummies.renderToString(
                    Yummies.createFactory(Yummies.createClass({
                        render() {
                            return Yummies.createElement(dummyBlock);
                        }
                    }))()
                )
            ).to.be.a('string');
        });
    });
});
