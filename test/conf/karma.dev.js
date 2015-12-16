import karmaCommonConfig from './karma.common';

export default {
    ...karmaCommonConfig,
    singleRun: false,
    autoWatch: true,
    reporters: [
        'clear-screen',
        'progress',
        'coverage'
    ],
    customLaunchers: {
        ChromeBackground: {
            base: 'Chrome',
            flags: [ '--disable-background-timer-throttling' ]
        }
    },
    browsers: [ 'Chrome' ]
};
