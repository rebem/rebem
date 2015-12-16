import karmaCommonConfig from './karma.common';

export default {
    ...karmaCommonConfig,
    singleRun: true,
    autoWatch: false,
    browsers: [ 'Chrome' ]
};
