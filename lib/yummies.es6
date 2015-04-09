import React from 'react';
import ReactElement from 'react/lib/ReactElement';
import buildClassName from './buildClassName';
import convertToReact from './convertToReact';
import mergeWithProps from './mergeWithProps';
import autobindExluded from './autobindExcluded';

/**
 * 'inherit' from React
 */
const Yummies = Object.create(React);

Yummies.render = function(json, ...rest) {
    return React.render(convertToReact(json), ...rest);
};

Yummies.renderToString = function(json) {
    return React.renderToString(convertToReact(json));
};

Yummies.renderToStaticMarkup = function(json) {
    return React.renderToStaticMarkup(convertToReact(json));
};

/**
 * Rewrite an original `.createElement()` method
 * to return `.convertToReact()`'ed result.
 *
 * @param {Object} json
 * @return {ReactElement}
 */
Yummies.createElement = function(json) {
    return convertToReact(json);
};

/**
 * Rewrite an original `.createClass()` method
 * to return `.convertToReact()`'ed result.
 *
 * @param {Object} spec
 * @return {ReactClass}
 */
Yummies.createClass = function(spec) {
    const origRender = spec.render;
    const newSpec = {
        ...spec,
        render() {
            let result = origRender.call(this);

            if (!result || result instanceof ReactElement) {
                return result;
            }

            mergeWithProps(result, this.props);

            return convertToReact(result);
        }
    };

    return React.createClass(newSpec);
};

/**
 * Autobind all the nested proto's methods
 * (excluding React internals) to the context.
 *
 * @param {Object} ctx
 */
Yummies._autoBind = function(ctx) {
    let collectedMethods = [];
    let proto = Object.getPrototypeOf(ctx);

    do {
        Object.getOwnPropertyNames(proto).forEach(k => {
            if (
                collectedMethods.indexOf(k) === -1 &&
                autobindExluded.indexOf(k) === -1 &&
                !proto[k].__reactDontBind &&
                typeof proto[k] === 'function'
            ) {
                collectedMethods.push(k);
            }
        });

        proto = Object.getPrototypeOf(proto);
    } while (proto instanceof Yummies.Component);

    collectedMethods.forEach(k => ctx[k] = ctx[k].bind(ctx));
};

/**
 * Prepare class before the factory.
 *
 * @param {Class} Base
 * @return {Class}
 */
Yummies._prepareClass = function(Base) {
    return class extends Base {
        constructor(props) {
            super(props);

            Yummies._autoBind(this);
        }

        render() {
            let result = super.render();

            if (!result || result instanceof ReactElement) {
                return result;
            }

            mergeWithProps(result, this.props);

            return convertToReact(result);
        }
    };
};

/**
 * Extends the Base class within `mixins` static property.
 *
 * @param {Class} Base
 * return {Class}
 */
Yummies._mixins = function(Base) {
    let Result = Base;

    if (Result.hasOwnProperty('mixins')) {
        Result.mixins.forEach(mixinClassFabric => {
            Result = mixinClassFabric(Result);
        });
    }

    return Result;
};

/**
 * Merge collected propTypes.
 *
 * @param {chain} array
 * @return {Object|undefined}
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
 * Yummify! Collect all the inherited classes chain
 * and return a react element factory.
 *
 * ```
 * Yummies.yummify([
 *     { type: 'main', module: require('...') },
 *     { type: 'styles', module: require('...') },
 *     { type: 'main', module: require('...') }
 * ]);
 * ```
 *
 * @param {Array} chain
 * @return {ReactElement}
 */
Yummies.yummify = function(chain) {
    let out = Yummies.yummifyRaw(chain)(React.Component);

    out = Yummies._prepareClass(out);

    return React.createFactory(out);
};

/**
 * Yummify Raw! Collect all the inherited classes
 * chain and return a resulted class factory.
 *
 * @param {Array} chain
 * @return {Function}
 */
Yummies.yummifyRaw = function(chain) {
    return function(Base) {
        let out = Base;

        chain.forEach(item => {
            if (item.type === 'main') {
                out = Yummies._mixins(item.module(out));
            }
        });

        const propTypes = Yummies._propTypes(chain);

        if (propTypes) {
            out.propTypes = propTypes;
        }

        return out;
    };
};

Yummies.buildClassName = buildClassName;

export default Yummies;
