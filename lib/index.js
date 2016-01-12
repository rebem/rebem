import React from 'react';
import isPlainObject from 'lodash.isplainobject';

import buildClassName from './buildClassName';

const defaultTag = 'div';

export default function convert(arg, context) {
    // already ReactElement
    if (React.isValidElement(arg)) {
        return arg;
    }

    // array
    if (Array.isArray(arg)) {
        return arg.map(item => convert(item, context));
    }

    // not bemjson
    if (!isPlainObject(arg)) {
        return arg;
    }

    // do not mutate `bemjson` and `props.className`
    const bemjson = {
        ...arg,
        props: {
            ...arg.props
        }
    };

    // inherited block context
    if (!('block' in bemjson) && typeof context !== 'undefined') {
        bemjson.block = context;
    }

    // tag
    if (!('tag' in bemjson)) {
        bemjson.tag = defaultTag;
    }

    // className
    bemjson.props.className = buildClassName(bemjson);

    // content
    if ('content' in bemjson) {
        bemjson.content = convert(bemjson.content, bemjson.block);
    }

    return React.createElement(bemjson.tag, bemjson.props, bemjson.content);
}
