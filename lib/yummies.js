'use strict';

import React from 'react';
import isPlainObject from 'lodash.isplainobject';
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
            let json = origRender.call(this);

            mergeWithProps(json, this.props);

            return convertToReact(json);
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
        let json = super.render();

        mergeWithProps(json, this.props);

        return convertToReact(json);
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
            render() {
                let json = super.render();

                mergeWithProps(json, this.props);

                return convertToReact(json);
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
