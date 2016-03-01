import React from 'react';

import { stringify } from 'rebem-classname';

function BEM(props, ...children) {
    const tag = props.tag || 'div';
    const className = stringify(props);
    const newProps = className ? { ...props, className } : props;

    return React.createElement(tag, newProps, ...children);
}

function blockFactory(block) {
    return function (props, ...children) {
        return BEM({ ...props, block }, ...children);
    };
}

export { BEM, blockFactory };
