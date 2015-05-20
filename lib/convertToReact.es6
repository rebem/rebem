import React from 'react';
import isPlainObject from 'lodash.isplainobject';
import buildClassName from './buildClassName';
import throwError from './throwError';

const defaultTag = 'div';

/*
    Convert BEMJSON-object into ReactElement.
*/
export default function convertToReact(json, context) {
    // array
    if (Array.isArray(json)) {
        return json.map(item => convertToReact(item, context));
    }

    // not BEMJSON
    if (!isPlainObject(json)) {
        return json;
    }

    // block
    if ('block' in json) {
        if (typeof json.block !== 'string') {
            throwError('block should be string', json);
        }
    } else if (typeof context === 'string') {
        json.block = context;
    }

    // elem
    if ('elem' in json) {
        if (!('block' in json)) {
            throwError('you should provide block along with elem', json);
        }

        if (typeof json.elem !== 'string') {
            throwError('elem should be string', json);
        }
    }

    // mods
    if ('mods' in json) {
        if (!('block' in json)) {
            throwError('you should provide block along with mods', json);
        }

        if (!isPlainObject(json.mods)) {
            throwError('mods should be a plain object', json);
        }
    }

    // mix
    if ('mix' in json) {
        if (!isPlainObject(json.mix) && !Array.isArray(json.mix)) {
            throwError('mix should be a plain object or array', json);
        }
    }

    // tag
    if ('tag' in json) {
        if (typeof json.tag !== 'string') {
            throwError('tag should be string', json);
        }
    } else {
        json.tag = defaultTag;
    }

    // props
    if ('props' in json) {
        if (!isPlainObject(json.props)) {
            throwError('props should be a plain object', json);
        }

        json.props = { ...json.props };
    } else {
        json.props = {};
    }

    // props.className
    if ('block' in json) {
        json.props.className = buildClassName(json);
    }

    // content
    if ('content' in json) {
        json.content = convertToReact(json.content, json.block);
    }

    return React.createElement(json.tag, json.props, json.content);
}
