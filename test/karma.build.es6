import karmaCommon from './karma.common';

export default function(config) {
    config.set({
        ...karmaCommon,
        singleRun: true,
        logLevel: config.LOG_DISABLE,
        reporters: [ 'dots' ],
        browsers: [ 'Chrome', 'Firefox' ]
    });
}
