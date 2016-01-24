import React from 'react';
import { buildClassName } from '../';

export function BEM({ children, ...props }) {
    const tag = props.tag || 'div';
    const className = buildClassName(props);
    const newProps = className ? { ...props, className } : props;

    return React.createElement(tag, newProps, children);
}
