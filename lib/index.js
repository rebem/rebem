import React from 'react';
import { stringify, validate } from 'rebem-classname';

let buildClassName = stringify;

// validation
// istanbul ignore next
if (process.env.NODE_ENV !== 'production') {
    buildClassName = props => stringify(validate(props));
}

function BEM(props, ...children) {
    const { tag, block, elem, mods, mix, className, ...restProps } = props;
    const finalClassName = buildClassName({ block, elem, mods, mix, className });
    const finalProps = finalClassName ? { ...restProps, className: finalClassName } : restProps;

    return React.createElement(tag || 'div', finalProps, ...children);
}

function blockFactory(block) {
    return function (props, ...children) {
        return BEM({ ...props, block }, ...children);
    };
}

export { BEM, blockFactory };
