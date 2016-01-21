import React from 'react';

const modDelim = '_';
const elemDelim = '__';

export function buildClassName(bemjson) {
    if (!bemjson) {
        return '';
    }

    // validation
    // istanbul ignore next
    if (process.env.NODE_ENV !== 'production') {
        require('./validate.js')(bemjson);
    }

    let out = bemjson.className || '';

    // block
    if (bemjson.block) {
        out += (out ? ' ' : '') + bemjson.block;

        // elem
        if (bemjson.elem) {
            out += elemDelim + bemjson.elem;
        }

        const entity = out;

        if (bemjson.mods) {
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

    if (bemjson.mix) {
        // convert object or array into array
        const mixes = [].concat(bemjson.mix);

        mixes.forEach(mix => {
            out += (out ? ' ' : '') + buildClassName(mix);
        });
    }

    return out;
}

export function BEM(props, ...children) {
    const tag = props.tag || 'div';
    const className = buildClassName(props);
    const newProps = className ? { ...props, className } : props;

    return React.createElement(tag, newProps, ...children);
}

export function blockFactory(block) {
    return function(props, ...children) {
        return BEM({ ...props, block }, ...children);
    };
}
