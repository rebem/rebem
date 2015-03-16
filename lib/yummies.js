'use strict';

import React from 'react';
import ReactElement from 'react/lib/ReactElement';
import isPlainObject from 'lodash.isplainobject';
import isFunction from 'lodash.isfunction';
import buildClassName from './buildClassName';
import convertToReact from './convertToReact';
import mergeWithProps from './mergeWithProps';

const autobindExluded = [];
const dummyClass = React.createClass({ render: function() {} });

autobindExluded.push(...Object.getOwnPropertyNames(dummyClass.prototype));
autobindExluded.push(...Object.getOwnPropertyNames(React.Component.prototype));

/**
 * 'inherit' from React
 */
let Yummies = Object.create(React);

/**
 * Rewrite original `.render()`, `.renderToString()` and
 * `.renderToStaticMarkup()` methods to return
 * `.convertToReact()`'ed result.
 */
[ 'render', 'renderToString', 'renderToStaticMarkup' ].forEach(method => {
    Yummies[method] = function(...args) {
        args[0] = convertToReact(args[0]);

        return React[method](...args);
    };
});

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
 * Autobind all the nested proto's methods
 * (excluding React internals) to the context.
 *
 * @param {Object} ctx
 */
Yummies.autoBind = function(ctx) {
    let collectedMethods = [];
    let proto = Object.getPrototypeOf(ctx);

    do {
        proto = Object.getPrototypeOf(proto);

        if (proto.constructor !== Yummies.Component) {
            Object.getOwnPropertyNames(proto).forEach(k => {
                if (
                    collectedMethods.indexOf(k) === -1 &&
                    autobindExluded.indexOf(k) === -1 &&
                    !proto[k].__reactDontBind &&
                    isFunction(proto[k])
                ) {
                    collectedMethods.push(k);
                }
            });
        }
    } while (proto instanceof Yummies.Component);

    collectedMethods.forEach(k => ctx[k] = ctx[k].bind(ctx));
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
    const newSpec = Object.assign({}, spec, {
        render() {
            let result = origRender.call(this);

            if (result instanceof ReactElement) {
                return result;
            }

            mergeWithProps(result, this.props);

            return convertToReact(result);
        }
    });

    return React.createClass(newSpec);
};

/**
 * Prepare class before the factory.
 *
 * @param {Class} Base
 * @return {Class}
 */
Yummies.prepareClass = function(Base) {
    return class extends Base {
        constructor(props) {
            super(props);

            Yummies.autoBind(this);
        }

        /**
         * Return props excluding propNames.
         *
         * @param {Array} propNames
         * @return {Object}
         */
        propsExclude(propNames) {
            let out = {};

            Object.keys(this.props).forEach(p => {
                if (propNames.indexOf(p) === -1) {
                    out[p] = this.props[p];
                }
            });

            return out;
        }

        /**
         * Return only matched with propNames props.
         *
         * @param {Array} propNames
         * @return {Object}
         */
        propsFrom(propNames) {
            let out = {};

            Object.keys(this.props).forEach(p => {
                if (propNames.indexOf(p) >= 0) {
                    out[p] = this.props[p];
                }
            });

            return out;
        }

        render() {
            let result = super.render();

            if (result instanceof ReactElement) {
                return result;
            }

            mergeWithProps(result, this.props);

            return convertToReact(result);
        }
    };
};

/**
 * `.createFactory()` wrapper to deal both with
 * `v0.12` `.createClass()` and `v0.13` ES6 Classes.
 *
 * @param {Object|ReactClass} spec
 * @return {ReactElement}
 */
Yummies.createComponent = function(spec) {
    let specClass = spec;

    if (isPlainObject(spec)) {
        specClass = Yummies.createClass(spec);
    } else if (typeof spec === 'function') {
        specClass = Yummies.prepareClass(spec);
    }

    return React.createFactory(specClass);
};

/**
 * Extends the Base class within `mixins` static property.
 *
 * @param {Class} Base
 * return {Class}
 */
Yummies.mixins = function(Base) {
    let Result = Base;

    if (Result.hasOwnProperty('mixins')) {
        Result.mixins.forEach(mixinClassFabric => {
            Result = mixinClassFabric(Result);
        });
    }

    return Result;
};

Yummies.buildClassName = buildClassName;

export default Yummies;
