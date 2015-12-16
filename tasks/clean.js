export function cleanCoverage() {
    const del = require('del');

    return del([ 'coverage/' ]);
}
