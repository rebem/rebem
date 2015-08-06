import React from 'react';
import isPlainObject from 'lodash.isplainobject';
import { convertToReact } from '@yummies/core';

import isYummiesClass from './isYummiesClass';
import mergeWithProps from './mergeWithProps';

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
Yummies.createElement = function(arg, ...rest) {
    if (isPlainObject(arg)) {
        return convertToReact(arg);
    }

    if (isYummiesClass(arg)) {
        return React.createElement(
            Yummies.yummify(arg),
            ...rest
        );
    }

    return React.createElement(arg, ...rest);
};

/**
 * .createFactory(class extends Yummies.Component {})
 * .createFactory('div')
 */
Yummies.createFactory = function(arg) {
    if (isYummiesClass(arg)) {
        return React.createFactory(
            Yummies.yummify(arg)
        );
    }

    return React.createFactory(arg);
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
