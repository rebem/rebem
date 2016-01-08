class CustomCache {
    constructor() {
        this.cache = [];
        this.keys = {};
    }

    set(key, value) {
        const cachedIndex = this.cache.length + 1;

        this.cache[cachedIndex] = key;
        this.keys[cachedIndex] = value;
    }

    get(key) {
        return this.keys[this.cache.indexOf(key)];
    }

    has(key) {
        return this.cache.indexOf(key) !== -1;
    }
}

export default function() {
    if (typeof WeakMap === 'function') {
        return new WeakMap();
    }

    return new CustomCache();
}
