export { cleanCoverage } from './clean';
export { karmaBuild, karmaDev, karmaTravis, karmaSauceLabs } from './karma';
export { eslint } from './lint';
export { coveralls } from './coveralls';

export const test = [
    exports.eslint,
    exports.cleanCoverage,
    exports.karmaBuild
];

export const tdd = [
    exports.cleanCoverage,
    exports.karmaDev
];

export const travis = [
    exports.eslint,
    exports.cleanCoverage,
    exports.karmaSauceLabs,
    exports.coveralls
];
