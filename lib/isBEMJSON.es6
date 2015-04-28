import isPlainObject from 'lodash.isplainobject';

/*
    Check if argument is a BEMJSON-like object.
*/
export default function(arg) {
    if (!isPlainObject(arg)) {
        return false;
    }

    if (
        'block' in arg ||
        'elem' in arg ||
        'mods' in arg ||
        'mix' in arg ||
        'tag' in arg ||
        'props' in arg ||
        'content' in arg
    ) {
        return true;
    }

    return false;
}
