import isPlainObject from 'lodash.isplainobject';

export default function(bemjson) {
    if ('block' in bemjson) {
        if (typeof bemjson.block !== 'string') {
            console.warn('block should be string', bemjson);
        }

        if (('elem' in bemjson) && typeof bemjson.elem !== 'string') {
            console.warn('elem should be string', bemjson);
        }

        if (('mods' in bemjson) && !isPlainObject(bemjson.mods)) {
            console.warn('mods should be a plain object', bemjson);
        }
    } else {
        if ('elem' in bemjson) {
            console.warn('you should provide block along with elem', bemjson);
        }

        if (('mods' in bemjson) && typeof bemjson.mods !== 'undefined') {
            console.warn('you should provide block along with mods', bemjson);
        }
    }

    if (('mix' in bemjson) && typeof bemjson.mix !== 'undefined') {
        if (!isPlainObject(bemjson.mix) && !Array.isArray(bemjson.mix)) {
            console.warn('mix should be a plain object or array on plain objects', bemjson);
        }
    }
}
