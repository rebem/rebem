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

class BEMClass extends React.Component {
    getChildContext() {
        return { block: this.props.block || this.context.block };
    }

    render() {
        const tag = this.props.tag || 'div';
        const block = this.props.block || this.context.block;
        const className = buildClassName({ ...this.props, block });
        const newProps = className ? { ...this.props, className } : this.props;

        return React.createElement(tag, newProps, this.props.children);
    }
}

BEMClass.contextTypes = {
    block: React.PropTypes.string
};

BEMClass.childContextTypes = {
    block: React.PropTypes.string
};

export function BEM(props, ...children) {
    return React.createElement(BEMClass, props, ...children);
}
