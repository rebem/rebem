'use strict';

import isPlainObject from 'lodash.isplainobject';

const excludedProps = [ 'tag', 'mods', 'mix' ];

/**
 * Merge BEMJSON-object with React props delivered
 * from component instance creation.
 *
 * @param {Object} json
 * @param {Object} props
 * @return {Object}
 */
export default function(json, props) {
    json.tag = props.tag || json.tag;
    json.props = json.props || {};

    json.mods = Object.assign({}, json.mods, props.mods);

    if (props.mix) {
        json.mix = json.mix || [];

        // `mix` as object
        if (isPlainObject(json.mix)) {
            json.mix = [ json.mix ];
        }

        json.mix.concat(props.mix);
    }

    // merge props excluding `excludedProps`
    Object.keys(props).forEach(prop => {
        if (excludedProps.indexOf(prop) === -1) {
            json.props[prop] = props[prop];
        }
    });

    return json;
};
