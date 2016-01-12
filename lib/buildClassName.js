import isPlainObject from 'lodash.isplainobject';

const modDelim = '_';
const elemDelim = '__';

/* istanbul ignore next  */
function throwError(msg, bemjson) {
    console.error(msg, bemjson);
}

export default function buildClassName(bemjson) {
    let out = '';

    if (!isPlainObject(bemjson)) {
        return out;
    }

    // block
    if (typeof bemjson.block === 'string') {
        out = bemjson.block;

        // elem
        if (typeof bemjson.elem === 'string') {
            out += elemDelim + bemjson.elem;
        }

        const entity = out;

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

    if (isPlainObject(bemjson.mix) || Array.isArray(bemjson.mix)) {
        // convert object or array into array
        const mixes = [].concat(bemjson.mix);

        mixes.forEach(mix => {
            let classDelimiter = '';

            if (out.length > 0) {
                classDelimiter = ' ';
            }

            out += classDelimiter + buildClassName(mix);
        });
    }

    // validation
    // istanbul ignore next
    if (process.env.NODE_ENV !== 'production') {
        if ('block' in bemjson) {
            if (typeof bemjson.block !== 'string') {
                throwError('block should be string', bemjson);
            }
        } else {
            if ('elem' in bemjson) {
                throwError('you should provide block along with elem', bemjson);

                if (typeof bemjson.elem !== 'string') {
                    throwError('elem should be string', bemjson);
                }
            }

            if ('mods' in bemjson) {
                throwError('you should provide block along with mods', bemjson);

                if (!isPlainObject(bemjson.mods)) {
                    throwError('mods should be a plain object', bemjson);
                }
            }
        }

        if ('mix' in bemjson) {
            if (!isPlainObject(bemjson.mix) && Array.isArray(bemjson.mix)) {
                throwError('mix should be a plain object or array on plain objects', bemjson);
            }
        }
    }

    return out;
}
