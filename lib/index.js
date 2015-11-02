import React from 'react';
import isPlainObject from 'lodash.isplainobject';
import { convertToReact } from '@yummies/core';

import mergeWithProps from './mergeWithProps';
import convertToReactType from './convertToReactType';

/**
 * 'inherit' from React
 */
const Yummies = Object.create(React);

Yummies.Component = class extends React.Component {};

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

export default Yummies;
