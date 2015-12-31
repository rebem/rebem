import karmaCommonConfig from './karma.common';

function generateLaunchers(browsers) {
    return browsers.reduce((result, browser) => {
        result[JSON.stringify(browser)] = {
            base: 'SauceLabs',
            ...browser
        };

        return result;
    }, {});
}

const customLaunchers = generateLaunchers([
    { browserName: 'chrome' },
    { browserName: 'firefox' },
    { browserName: 'safari', version: '8' },
    { browserName: 'safari', version: '9' },
    { browserName: 'internet explorer', version: '9' },
    { browserName: 'internet explorer', version: '10' },
    { browserName: 'internet explorer', version: '11' },
    { browserName: 'iphone', version: '9.2' },
    { browserName: 'android', version: '4.4' },
    { browserName: 'android', version: '5.1' }
]);

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
