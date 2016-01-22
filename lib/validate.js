import isPlainObject from 'lodash.isplainobject';

export default function(bemjson) {
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
