'use strict';

const elemDelim = '__';
const modDelim = '_';

/**
 * Build a className string from BEMJSON-object.
 *
 * @param {Object} json
 * @return {String}
 */
export default function buildClassName(json) {
    let out;

    // block
    let entity = json.block;

    // elem
    if (json.elem) {
        entity += elemDelim + json.elem;
    }

    out = entity;

    // mods
    if (json.mods) {
        Object.keys(json.mods).forEach(modName => {
            const modValue = json.mods[modName];
            let modValueString = '';

            if (modValue !== false) {
                // 'short' boolean mods
                if (modValue !== true) {
                    modValueString += modDelim + modValue;
                }

                out += ' ' + entity + modDelim + modName + modValueString;
            }
        });
    }

    // mix
    if (json.mix) {
        json.mix = [].concat(json.mix);

        json.mix.forEach(mixed => {
            out += ' ' + buildClassName(mixed);
        });
    }

    return out;
};
