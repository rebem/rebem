import React from 'react';
import isPlainObject from 'lodash.isplainobject';
import { convertToReact, buildClassName } from '@yummies/core';

import mergeWithProps from './mergeWithProps';
import convertToReactType from './convertToReactType';

/**
 * 'inherit' from React
 */
const Yummies = Object.create(React);

Yummies.Component = class extends React.Component {
    static __yummified__ = false;
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
Yummies.createFactory = function(type) {
    const patchedType = convertToReactType(type);

    return function(props, ...children) {
        const patchedChildren = convertToReact(children);

        return React.createFactory(patchedType)(props, ...patchedChildren);
    };
};

/**
 * .cloneElement(React.createElement())
 * .cloneElement({ block: 'test' })
 */
Yummies.cloneElement = function(element, props, ...children) {
    const patchedElement = convertToReact(element);
    const patchedChildren = convertToReact(children);
    const mixedClassName = buildClassName(props);
    let classNameDelimiter = '';

    if (!patchedElement.props.className && !mixedClassName) {
        return React.cloneElement(patchedElement, props, ...patchedChildren);
    }

    if (patchedElement.props.className && mixedClassName) {
        classNameDelimiter = ' ';
    }

    return React.cloneElement(
        patchedElement,
        {
            ...props,
            className: patchedElement.props.className + classNameDelimiter + mixedClassName
        },
        ...patchedChildren
    );
};

/**
 * Prepare class before the factory.
 */
Yummies.yummify = function(Base) {
    if (Base.__yummified__ === false) {
        const originalRender = Base.prototype.render;

        Base.prototype.render = function() {
            const result = originalRender.call(this);

            if (!isPlainObject(result) || React.isValidElement(result)) {
                return result;
            }

            mergeWithProps(result, this.props);

            return convertToReact(result);
        };

        Base.__yummified__ = true;
    }

    return Base;
};

export default Yummies;
