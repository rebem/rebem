import React from 'react';
import isPlainObject from 'lodash.isplainobject';

import buildClassName from './buildClassName';

const defaultTag = 'div';

function convert(bemjson, context) {
    // already ReactElement
    if (React.isValidElement(bemjson)) {
        return bemjson;
    }

    // array
    if (Array.isArray(bemjson)) {
        return bemjson.map(item => convert(item, context));
    }

    // not bemjson
    if (!isPlainObject(bemjson)) {
        return bemjson;
    }

    const result = {};

    // inherited block
    if (!('block' in bemjson) && typeof context !== 'undefined') {
        result.block = context;
    }

    // tag
    if (!('tag' in bemjson)) {
        result.tag = defaultTag;
    }

    // props
    if ('props' in bemjson) {
        result.props = bemjson.props;
    } else {
        result.props = {};
    }

    // className
    result.props.className = buildClassName(bemjson);

    // content
    if ('content' in bemjson) {
        result.content = convert(bemjson.content, result.block);
    }

    return React.createElement(result.tag, result.props, result.content);
}

export default function(bemjson) {
    return convert(bemjson);
}
