import isPlainObject from 'lodash.isplainobject';

const elemDelim = '__';
const modDelim = '_';

/**
 * Build a className string from BEMJSON-object.
 *
 * @param {Object} json
 * @return {String}
 */
export default function buildClassName(json) {
    let out = '';
    let entity;

    if (!isPlainObject(json)) {
        throw new Error('Yummies.buildClassName accepts only plain objects');
    }

    // block
    if (json.block) {
        entity = json.block;
    }

    // elem
    if (json.elem) {
        if (!json.block) {
            throw new Error('Yummies.buildClassName: you should specify block along with elem');
        }

        entity += elemDelim + json.elem;
    }

    if (entity) {
        out = entity;
    }

    // mods
    if (json.mods) {
        if (!json.block) {
            throw new Error('Yummies.buildClassName: you should specify block or block + elem along with mods');
        }

        if (!isPlainObject(json.mods)) {
            throw new Error('Yummies.buildClassName: mods should be a plain object');
        }

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
        if (!json.block) {
            throw new Error('Yummies.buildClassName: you should specify block or block + elem along with mix');
        }

        if (!isPlainObject(json.mix) && !Array.isArray(json.mix)) {
            throw new Error('Yummies.buildClassName: mix should be plain object or array');
        }

        json.mix = [].concat(json.mix);

        json.mix.forEach(mixed => {
            out += ' ' + buildClassName(mixed);
        });
    }

    return out;
};
