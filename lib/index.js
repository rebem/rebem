import React from 'react';

import { stringify } from 'rebem-classname';

function BEM(props, ...children) {
    const { tag, block, elem, mods, mix, className, ...restProps } = props;
    const finalClassName = stringify({ block, elem, mods, mix, className });
    const finalProps = finalClassName ? { ...restProps, className: finalClassName } : restProps;

    return React.createElement(tag || 'div', finalProps, ...children);
}

function blockFactory(block) {
    return function (props, ...children) {
        return BEM({ ...props, block }, ...children);
    };
}

export { BEM, blockFactory };
