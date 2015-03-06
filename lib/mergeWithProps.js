'use strict';

import isPlainObject from 'lodash.isplainobject';

/**
 * Merge BEMJSON-object with tag/mods/mix props
 * delivered from component instance creation.
 *
 * @param {Object} json
 * @param {Object} props
 * @return {Object}
 */
export default function(json, props = {}) {
    json.block = props.block || json.block;
    json.elem = props.elem || json.elem;
    json.tag = props.tag || json.tag;

    json.mods = Object.assign({}, json.mods, props.mods);

    if (props.mix) {
        json.mix = json.mix || [];

        // `mix` as object
        if (isPlainObject(json.mix)) {
            json.mix = [ json.mix ];
        }

        json.mix = json.mix.concat(props.mix);
    }

    return json;
};
