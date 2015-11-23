// https://github.com/gaearon/react-hot-loader/blob/master/isReactClassish.js
function descendsFromYummiesComponent(arg) {
    return arg.__yummies__ === true;
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
