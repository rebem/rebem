import { expect } from 'chai';
import TestUtils from 'react/lib/ReactTestUtils';
import Yummies from '../../lib/yummies';

describe('yummies', () => {
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
});
