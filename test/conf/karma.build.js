import karmaCommonConfig from './karma.common';

export default {
    ...karmaCommonConfig,
    singleRun: true,
    autoWatch: false,
    reporters: [ 'progress', 'coverage' ],
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
    browsers: [ 'Firefox' ]
};
