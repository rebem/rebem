import Yummies from './';
import isYummiesClass from './isYummiesClass';

/**
 * Yummify Raw! Collect all the inherited classes
 * chain and return a resulted class factory.
 */
export function yummifyChainRaw(chain) {
    return function(Base) {
        let out = Base;

        chain.forEach(item => {
            if (item.type === 'main') {
                out = item.module(out);
            }
        });

        return out;
    };
}

/**
 * Yummify! Collect all the inherited classes chain
 * and return a ReactElement Factory.
 *
 * Yummies._yummifyChain([
 *     { type: 'main', module: require('...') },
 *     { type: 'styles', module: require('...') },
 *     { type: 'main', module: require('...') }
 * ]);
 */
export function yummifyChain(chain) {
    let out = yummifyChainRaw(chain)(Yummies.Component);

    if (isYummiesClass(out)) {
        out = Yummies.yummify(out);
    }

    return Yummies.createFactory(out);
}
