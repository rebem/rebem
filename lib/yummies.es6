import React from 'react';
import isPlainObject from 'lodash.isplainobject';

import buildClassName from './buildClassName';
import isYummiesClass from './isYummiesClass';
import convertToReact from './convertToReact';
import convertToReactType from './convertToReactType';
import mergeWithProps from './mergeWithProps';

/**
 * 'inherit' from React
 */
const Yummies = Object.create(React);

/**
 * .render({ block: 'test' }, document.body, function() {})
 */
Yummies.render = function(json, ...rest) {
    return React.render(convertToReact(json), ...rest);
};

/**
 * .renderToString({ block: 'test' })
 */
Yummies.renderToString = function(json) {
    return React.renderToString(convertToReact(json));
};

/**
 * .renderToStaticMarkup({ block: 'test' })
 */
Yummies.renderToStaticMarkup = function(json) {
    return React.renderToStaticMarkup(convertToReact(json));
};

/**
 * .createElement({ block: 'test' })
 * .createElement(class extends Yummies.Component {})
 * .createElement('div', { foo: 'bar' }, [ … ])
 */
Yummies.createElement = function(type, props, ...children) {
    if (isPlainObject(type)) {
        return convertToReact(type);
    }

    const patchedChildren = convertToReact(children);
    const patchedType = convertToReactType(type);

    return React.createElement(patchedType, props, ...patchedChildren);
};

/**
 * .createFactory(class extends Yummies.Component {})
 * .createFactory('div')
 */
Yummies.createFactory = function(arg) {
    if (isYummiesClass(arg)) {
        return React.createFactory(
            Yummies.yummify(
                Yummies._extendWith(arg)
            )
        );
    }

    return React.createFactory(arg);
};

Yummies.Component = class extends React.Component {};

/**
 * Extends the Base class within `extendWith` static property.
 */
Yummies._extendWith = function(Base) {
    let Result = Base;

    if (Result.hasOwnProperty('extendWith')) {
        Result.extendWith.forEach(extendClassFabric => {
            Result = extendClassFabric(Result);
        });
    }

    return Result;
};

/**
 * Merge collected propTypes.
 */
Yummies._propTypes = function(chain) {
    let out;

    chain.forEach(item => {
        if (item.type === 'propTypes') {
            out = { ...out, ...item.module };
        }
    });

    return out;
};

/**
 * Prepare class before the factory.
 */
Yummies.yummify = function(Base) {
    return class extends Base {
        render() {
            const result = super.render();

            if (!isPlainObject(result)) {
                return result;
            }

            mergeWithProps(result, this.props);

            return convertToReact(result);
        }
    };
};

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
Yummies._yummifyChain = function(chain) {
    let out = Yummies._yummifyChainRaw(chain)(Yummies.Component);

    if (isYummiesClass(out)) {
        out = Yummies.yummify(out);
    }

    return Yummies.createFactory(out);
};

/**
 * Yummify Raw! Collect all the inherited classes
 * chain and return a resulted class factory.
 */
Yummies._yummifyChainRaw = function(chain) {
    return function(Base) {
        let out = Base;

        chain.forEach(item => {
            if (item.type === 'main') {
                out = Yummies._extendWith(item.module(out));
            }
        });

        const propTypes = Yummies._propTypes(chain);

        if (propTypes) {
            out.propTypes = propTypes;
        }

        return out;
    };
};

/**
 * Helper to build a className string from BEMJSON-object.
 */
Yummies.buildClassName = buildClassName;

export default Yummies;
