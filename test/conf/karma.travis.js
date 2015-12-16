import karmaCommonConfig from './karma.common';

export default {
    ...karmaCommonConfig,
    singleRun: true,
    autoWatch: false,
    customLaunchers: {
        ChromeTravis: {
            base: 'Chrome',
            flags: [ '--no-sandbox' ]
        }
    },
    browsers: [ 'ChromeTravis', 'Firefox' ]
};
