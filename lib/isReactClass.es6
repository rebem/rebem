import React from 'react';

// https://github.com/gaearon/react-hot-loader/blob/master/isReactClassish.js

function descendsFromReactComponent(arg) {
    let Base = Object.getPrototypeOf(arg);

    while (Base) {
        if (Base === React.Component) {
            return true;
        }

        Base = Object.getPrototypeOf(Base);
    }

    return false;
}

/*
    Check if argument is ES6 ReactClass.
*/
export default function(arg) {
    if (typeof arg !== 'function') {
        return false;
    }

    // react@<=0.12 class
    if (
        'type' in arg &&
        'prototype' in arg.type &&
        typeof arg.prototype.render === 'function'
    ) {
        return false;
    }

    if (typeof arg.prototype.render === 'function') {
        return true;
    }

    if (descendsFromReactComponent(arg)) {
        return true;
    }

    return false;
}
