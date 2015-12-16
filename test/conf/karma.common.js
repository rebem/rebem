import { LOG_DISABLE } from 'karma/lib/constants';

import webpackConfig from './webpack';

export default {
    port: 3001,
    webpackPort: 3002,
    colors: true,
    basePath: './',
    files: [
        'test/index.js'
    ],
    preprocessors: {
        'test/index.js': 'webpack'
    },
    frameworks: [ 'mocha' ],
    webpack: webpackConfig,
    webpackMiddleware: {
        noInfo: true,
        quiet: true
    },
    reporters: [ 'mocha', 'coverage' ],
    coverageReporter: {
        dir: 'coverage/',
        reporters: [
            {
                type: 'html'
            },
            {
                type: 'text-summary'
            },
            {
                type: 'lcovonly', subdir: '.'
            }
        ]
    },
    logLevel: LOG_DISABLE,
    browserNoActivityTimeout: 60 * 1000, // default 10 * 1000
    browserDisconnectTimeout: 10 * 1000, // default 2 * 1000
    browserDisconnectTolerance: 2, // default 0
    captureTimeout: 2 * 60 * 1000 // default 1 * 60 * 1000
};
