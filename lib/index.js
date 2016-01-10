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

    // do not mutate `bemjson` and `props.className`
    bemjson = {
        ...bemjson,
        props: {
            ...bemjson.props
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

export default function(bemjson) {
    return convert(bemjson);
}
