import Yummies from './';

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

/**
 * Check if argument is ES6 ReactClass.
 */
export default function(arg) {
    if (typeof arg !== 'function') {
        return false;
    }

    if (typeof arg.prototype.render === 'function') {
        return descendsFromYummiesComponent(arg);
    }

    return false;
}
