import Yummies from './';
import isYummiesClass from './isYummiesClass';

const cache = {};

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

export function yummifyChainClass(chain, uniqueKey) {
    if (!(uniqueKey in cache)) {
        let out = yummifyChainRaw(chain)(Yummies.Component);

        if (isYummiesClass(out)) {
            out = Yummies.yummify(out);
        }

        if (typeof uniqueKey !== 'undefined') {
            cache[uniqueKey] = out;
        }

        return out;
    }

    return cache[uniqueKey];
}

/**
 * Yummify! Collect all the inherited classes chain
 * and return a ReactElement Factory.
 *
 * yummifyChain([
 *     { type: 'main', module: require('...') },
 *     { type: 'styles', module: require('...') },
 *     { type: 'main', module: require('...') }
 * ]);
 */
export function yummifyChain(chain, uniqueKey) {
    return Yummies.createFactory(
        yummifyChainClass(chain, uniqueKey)
    );
}
