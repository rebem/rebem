import isPlainObject from 'lodash.isplainobject';

const modDelim = '_';
const elemDelim = '__';

function throwError(msg, json) {
    throw new Error('Yummies.buildClassName: ' + msg + ' @ ' + JSON.stringify(json));
}

/**
 * Build a className string from BEMJSON-object.
 *
 * @param {Object} json
 * @return {String}
 */
export default function buildClassName(json) {
    let out;
    let entity = '';

    if (!isPlainObject(json)) {
        throwError('only plain objects accepted', json);
    }

    // block
    if ('block' in json) {
        if (typeof json.block !== 'string') {
            throwError('block should be string', json);
        }

        entity = json.block;
    } else {
        throwError('you should specify block', json);
    }

    // elem
    if ('elem' in json) {
        if (typeof json.elem !== 'string') {
            throwError('elem should be string', json);
        }

        entity += elemDelim + json.elem;
    }

    // get current "state"
    out = entity;

    // mods
    if ('mods' in json) {
        if (!isPlainObject(json.mods)) {
            throwError('mods should be a plain object', json);
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
    if ('mix' in json) {
        if (!isPlainObject(json.mix) && !Array.isArray(json.mix)) {
            throwError('mix should be a plain object or array', json);
        }

        // convert object or array into array
        json.mix = [].concat(json.mix);

        json.mix.forEach(mixed => {
            out += ' ' + buildClassName(mixed);
        });
    }

    return out;
};
