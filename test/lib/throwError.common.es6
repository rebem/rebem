import { expect } from 'chai';
import throwError from '../../lib/throwError';

describe('throwError', () => {
    it('exist', () => {
        expect(throwError).to.exist;
    });

    it('throw', () => {
        expect(throwError.bind(throwError,
            'hello',
            {
                test1: 'val1',
                test2: [ 'val2', 'val3' ]
            }
        )).to.throw(
            'Yummies: hello @ {"test1":"val1","test2":["val2","val3"]}'
        );
    });
});
