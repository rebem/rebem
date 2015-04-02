import karmaCommon from './karma.common';

export default function(config) {
    config.set({
        ...karmaCommon,
        singleRun: true,
        logLevel: config.LOG_INFO,
        reporters: [ 'dots', 'coverage' ],
        customLaunchers: {
            ChromeTravis: {
                base: 'Chrome',
                flags: [ '--no-sandbox' ]
            }
        },
        browsers: [ 'ChromeTravis', 'Firefox' ]
    });
}
