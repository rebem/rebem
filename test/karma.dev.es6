import karmaCommon from './karma.common';

export default function(config) {
    config.set({
        ...karmaCommon,
        logLevel: config.LOG_INFO,
        reporters: [ 'clear-screen', 'mocha', 'coverage' ],
        coverageReporter: {
            ...karmaCommon.coverageReporter,
            reporters: [
                ...karmaCommon.coverageReporter.reporters,
                { type: 'html' }
            ]
        },
        browsers: [ 'Chrome', 'Firefox' ]
    });
}
