import isPlainObject from 'lodash.isplainobject';

const modDelim = '_';
const elemDelim = '__';

function throwError(msg, bemjson) {
    throw new Error(msg + ': ' + JSON.stringify(bemjson));
}

/**
 * Build a className string from BEMbemjson-object.
 */
export default function buildClassName(bemjson) {
    let out = '';
    let entity = '';

    if (typeof bemjson === 'undefined' || bemjson === null) {
        return out;
    }

    // block
    if ('block' in bemjson) {
        if (process.env.NODE_ENV !== 'production') {
            if (typeof bemjson.block !== 'string') {
                throwError('block should be string', bemjson);
            }
        }

        entity = bemjson.block;
    }

    // elem
    if ('elem' in bemjson) {
        if (process.env.NODE_ENV !== 'production') {
            if (!('block' in bemjson)) {
                throwError('you should provide block along with elem', bemjson);
            }

            if (typeof bemjson.elem !== 'string') {
                throwError('elem should be string', bemjson);
            }
        }

        entity += elemDelim + bemjson.elem;
    }

    // get current "state"
    out = entity;

    // mods
    if ('mods' in bemjson) {
        if (process.env.NODE_ENV !== 'production') {
            if (!('block' in bemjson)) {
                throwError('you should provide block/elem along with mods', bemjson);
            }
        }

        if (isPlainObject(bemjson.mods)) {
            Object.keys(bemjson.mods).forEach(modName => {
                const modValue = bemjson.mods[modName];
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
    }

    // mix
    if ('mix' in bemjson) {
        if (isPlainObject(bemjson.mix) || Array.isArray(bemjson.mix)) {
            // convert object or array into array
            bemjson.mix = [].concat(bemjson.mix);

            bemjson.mix.forEach(mixed => {
                let classDelimiter = '';

                if (out.length > 0) {
                    classDelimiter = ' ';
                }

                out += classDelimiter + buildClassName(mixed);
            });
        }
    }

    return out;
}
