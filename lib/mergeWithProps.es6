import isPlainObject from 'lodash.isplainobject';
import throwError from './throwError';

/**
 * Merge BEMJSON template with instance props.
 */
export default function(json, props) {
    if (typeof props === 'undefined') {
        return json;
    }

    // block
    if ('block' in props) {
        if (typeof props.block !== 'string') {
            throwError('block should be string', props);
        }

        json.block = props.block;
    }

    // elem
    if ('elem' in props) {
        if (typeof props.elem !== 'string') {
            throwError('elem should be string', props);
        }

        json.elem = props.elem;
    }

    // tag
    if ('tag' in props) {
        if (typeof props.tag !== 'string') {
            throwError('tag should be string', props);
        }

        json.tag = props.tag;
    }

    // mods
    if ('mods' in props) {
        if (!isPlainObject(props.mods)) {
            throwError('mods should be a plain object', props);
        }

        json.mods = { ...json.mods, ...props.mods };
    }

    // mix
    if ('mix' in props) {
        if (!isPlainObject(props.mix) && !Array.isArray(props.mix)) {
            throwError('mix should be a plain object or array', props);
        }

        json.mix = json.mix || [];
        // concat object or array to array
        json.mix = [].concat(json.mix, props.mix);
    }

    return json;
}
