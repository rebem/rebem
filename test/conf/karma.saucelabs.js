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
    SL_Safari: {
        base: 'SauceLabs',
        browserName: 'safari',
        version: '9'
    },
    SL_IE: {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        version: '11'
    },
    SL_iOS: {
        base: 'SauceLabs',
        browserName: 'iphone',
        version: '9.2'
    },
    SL_Android: {
        base: 'SauceLabs',
        browserName: 'android',
        version: '5.1'
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
