function isPlainObject(target) {
    return Object.prototype.toString.call(target) === '[object Object]';
}

function validate(bemjson) {
    if (typeof bemjson.block === 'undefined') {
        if (typeof bemjson.elem !== 'undefined') {
            console.warn('you should provide block along with elem', bemjson);
        }

        if (typeof bemjson.mods !== 'undefined') {
            console.warn('you should provide block along with mods', bemjson);
        }
    } else {
        if (typeof bemjson.block !== 'string') {
            console.warn('block should be string', bemjson);
        }

        if (typeof bemjson.elem !== 'undefined') {
            if (typeof bemjson.elem !== 'string') {
                console.warn('elem should be string', bemjson);
            }
        }

        if (typeof bemjson.mods !== 'undefined') {
            if (!isPlainObject(bemjson.mods)) {
                console.warn('mods should be a plain object', bemjson);
            }
        }
    }

    if (typeof bemjson.mix !== 'undefined') {
        if (!isPlainObject(bemjson.mix) && !Array.isArray(bemjson.mix)) {
            console.warn('mix should be a plain object or array on plain objects', bemjson);
        }
    }
}

const modDelim = '_';
const elemDelim = '__';

export default function buildClassName(bemjson) {
    if (!bemjson) {
        return '';
    }

    // validation
    // istanbul ignore next
    if (process.env.NODE_ENV !== 'production') {
        validate(bemjson);
    }

    let out = bemjson.className || '';

    // block
    if (typeof bemjson.block !== 'undefined') {
        out += (out ? ' ' : '') + bemjson.block;

        // elem
        if (typeof bemjson.elem !== 'undefined') {
            out += elemDelim + bemjson.elem;
        }

        const entity = out;

        if (typeof bemjson.mods !== 'undefined') {
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

    if (typeof bemjson.mix !== 'undefined') {
        // convert object or array into array
        const mixes = [].concat(bemjson.mix);

        mixes
            // filter holes in array
            .filter(mix => mix)
            .forEach(mix => {
                out += (out ? ' ' : '') + buildClassName(mix);
            });
    }

    return out;
}
