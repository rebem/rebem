import React from 'react';

import buildClassName from './buildClassName';

function BEM(props, ...children) {
    const tag = props.tag || 'div';
    const className = buildClassName(props);
    const newProps = className ? { ...props, className } : props;

    return React.createElement(tag, newProps, ...children);
}

BEM.__rebem = true;

function blockFactory(block) {
    function Block(props, ...children) {
        return BEM({ ...props, block }, ...children);
    }

    Block.__rebem = true;

    return Block;
}

export { BEM, blockFactory, buildClassName };
