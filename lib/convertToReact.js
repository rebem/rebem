'use strict';

import React from 'react';
import buildClassName from './buildClassName';

/**
 * Convert BEMJSON into ReactElement.
 *
 * @param {Object} json
 * @param {String} context
 * @return {ReactElement}
 */
export default function convertToReact(json, context) {
    if (json) {
        if (Array.isArray(json)) {
            return json.map(item => convertToReact(item, context));
        }

        if (json.block || json.elem) {
            json.block = json.block || context;
            json.tag = json.tag || 'div';
            json.props = json.props || {};
            json.props.className = buildClassName(json);
            json.content = convertToReact(json.content, json.block);

            return React.createElement(json.tag, json.props, json.content);
        }
    }

    return json;
}
