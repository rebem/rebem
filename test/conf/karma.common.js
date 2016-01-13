import { LOG_WARN } from 'karma/lib/constants';

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
    logLevel: LOG_WARN,
    browserNoActivityTimeout: 60 * 1000, // default 10 * 1000
    browserDisconnectTimeout: 10 * 1000, // default 2 * 1000
    browserDisconnectTolerance: 2, // default 0
    captureTimeout: 2 * 60 * 1000 // default 1 * 60 * 1000
};
