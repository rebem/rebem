export function coverage() {
    const path = require('path');
    const codecov = require('codecov').handleInput;

    const lcovFilePath = path.resolve('coverage/lcov.info');

    return new Promise(function(resolve, reject) {
        codecov.upload(
            {
                options: {
                    file: lcovFilePath,
                    disable: 'search,gcov'
                }
            },
            function() {
                resolve();
            },
            function(errorCode, errorBody) {
                reject(errorBody);
            }
        );
    });
}
