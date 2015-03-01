'use strict';

import React from 'react';
import ReactElement from 'react/lib/ReactElement';
import isPlainObject from 'lodash.isplainobject';
import isFunction from 'lodash.isfunction';
import buildClassName from './buildClassName';
import convertToReact from './convertToReact';
import mergeWithProps from './mergeWithProps';

/**
 * 'inherit' from React
 */
let Yummies = Object.create(React);

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
 * Extend `React.Component` class to return
 * `.convertToReact()`'ed result.
 */
Yummies.Component = class extends React.Component {
    render() {
        let result = super.render();

        if (result instanceof ReactElement) {
            return result;
        }

        mergeWithProps(result, this.props);

        return convertToReact(result);
    }
};

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
        specClass = class extends spec {
            constructor(props) {
                super(props);

                const proto = Object.getPrototypeOf(Object.getPrototypeOf(this));

                // autobind
                Object.getOwnPropertyNames(proto)
                    .filter(k => isFunction(proto[k]))
                    .forEach(k => proto[k] = proto[k].bind(this));
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
    }

    return Yummies.createFactory(specClass);
};

/**
 *
 */
Yummies.buildClassName = buildClassName;

export default Yummies;
