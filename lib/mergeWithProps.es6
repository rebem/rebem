/**
 * Merge BEMJSON-object with tag/mods/mix props
 * delivered from component instance creation.
 *
 * @param {Object} json
 * @param {Object} props
 * @return {Object}
 */
export default function(json, props = {}) {
    json.block = props.block || json.block;
    json.elem = props.elem || json.elem;
    json.tag = props.tag || json.tag;

    if (props.mods) {
        json.mods = { ...json.mods, ...props.mods };
    }

    if (props.mix) {
        json.mix = [].concat(json.mix || [], props.mix);
    }

    return json;
};
