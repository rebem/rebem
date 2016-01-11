import karmaCommonConfig from './karma.common';

export default {
    ...karmaCommonConfig,
    singleRun: true,
    autoWatch: false,
    sauceLabs: {
        testName: 'travis',
        public: 'public',
        recordScreenshots: false
    },
    frameworks: [
        ...karmaCommonConfig.frameworks,
        'saucelabs-browsers'
    ],
    reporters: [ 'dots', 'saucelabs', 'coverage' ],
    coverageReporter: {
        dir: 'coverage/',
        reporters: [
            {
                type: 'lcovonly', subdir: '.'
            }
        ]
    },
    browsers: [
        'last 2 versions',
        'IE >= 9'
    ],
    concurrency: 5
};
