import karmaCommonConfig from './karma.common';

export default {
    ...karmaCommonConfig,
    singleRun: false,
    autoWatch: true,
    reporters: [ 'clear-screen', 'progress', 'coverage' ],
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
    customLaunchers: {
        ChromeBackground: {
            base: 'Chrome',
            flags: [ '--disable-background-timer-throttling' ]
        }
    },
    browsers: [ 'Firefox' ]
};
