export function coveralls() {
    const fs = require('fs');
    const path = require('path');
    const handleInput = require('coveralls/lib/handleInput');

    const lcovFilePath = path.resolve('coverage/lcov.info');

    return new Promise((resolve, reject) => {
        fs.readFile(lcovFilePath, 'utf-8', (fsError, data) => {
            if (fsError) {
                return reject(fsError);
            }

            handleInput(data, coverallsError => {
                if (coverallsError) {
                    return reject(coverallsError);
                }
            });
        });

        resolve();
    });
}
