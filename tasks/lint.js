export function eslint() {
    process.env.NODE_ENV = 'test';

    const { CLIEngine } = require('eslint');

    return new Promise((resolve, reject) => {
        const cli = new CLIEngine();

        const report = cli.executeOnFiles([ '.' ]);
        const formatter = cli.getFormatter();

        if (report.errorCount > 0 || report.warningCount > 0) {
            console.log(formatter(report.results));
        }

        if (report.errorCount === 0 && report.warningCount === 0) {
            return resolve('¯\\_(ツ)_/¯');
        }

        if (report.errorCount > 0) {
            return reject('(╯°□°)╯︵┻━┻');
        }

        resolve();
    });
}
