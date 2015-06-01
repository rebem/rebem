// import React from 'react';
import Yummies from './yummies';

// https://github.com/gaearon/react-hot-loader/blob/master/isReactClassish.js

function descendsFromYummiesComponent(arg) {
    let Base = Object.getPrototypeOf(arg);

    while (Base) {
        if (Base === Yummies.Component) {
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

    if (typeof arg.prototype.render === 'function') {
        // react@<=0.12 class
        if ('type' in arg) {
            return false;
        }

        return descendsFromYummiesComponent(arg);
    }

    return false;
}
