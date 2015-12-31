import karmaCommonConfig from './karma.common';

const customLaunchers = {
    SL_Chrome: {
        base: 'SauceLabs',
        browserName: 'chrome'
    },
    SL_Firefox: {
        base: 'SauceLabs',
        browserName: 'firefox'
    },
    SL_IE: {
        base: 'SauceLabs',
        browserName: 'internet explorer'
    }
};

export default {
    ...karmaCommonConfig,
    singleRun: true,
    autoWatch: false,
    sauceLabs: {
        testName: 'travis',
        public: 'public'
    },
    customLaunchers,
    reporters: [ 'mocha', 'saucelabs' ],
    browsers: Object.keys(customLaunchers)
};
