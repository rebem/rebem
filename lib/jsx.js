import React from 'react';

import buildClassName from '../buildClassName';

export function BEM({ children, ...props }) {
    const tag = props.tag || 'div';
    const className = buildClassName(props);
    const newProps = className ? { ...props, className } : props;

    return React.createElement(tag, newProps, children);
}

export function blockFactory(block) {
    return function(props) {
        return BEM({ ...props, block });
    };
}

export { buildClassName };
