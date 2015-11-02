import Yummies from './';
import isYummiesClass from './isYummiesClass';

/**
 * Merge collected propTypes.
 */
export function mergePropTypes(chain) {
    let out = null;

    chain.forEach(item => {
        if (item.type === 'propTypes') {
            out = { ...out, ...item.module };
        }
    });

    return out;
}

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

        const propTypes = mergePropTypes(chain);

        if (propTypes) {
            out.propTypes = propTypes;
        }

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
