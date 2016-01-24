import React from 'react';

import buildClassName from './buildClassName';

export function BEM(props, ...children) {
    const tag = props.tag || 'div';
    const className = buildClassName(props);
    const newProps = className ? { ...props, className } : props;

    return React.createElement(tag, newProps, ...children);
}

export function blockFactory(block) {
    return function(props, ...children) {
        return BEM({ ...props, block }, ...children);
    };
}

export { buildClassName };
