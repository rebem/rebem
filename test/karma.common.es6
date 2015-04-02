import path from 'path';

const babelConfig = JSON.stringify({
    optional: 'runtime',
    experimental: true
});

export default {
    colors: true,
    files: [
        'lib/*.common.es6',
        'lib/*.browser.es6'
    ],
    preprocessors: {
        'lib/*.common.es6': 'webpack',
        'lib/*.browser.es6': 'webpack'
    },
    frameworks: [ 'mocha' ],
    webpack: {
        cache: true,
        resolve: {
            extensions: [ '', '.js', '.es6', '.json' ]
        },
        module: {
            preLoaders: [
                {
                    test: /\.es6$/,
                    include: path.resolve('test/lib/'),
                    loader: 'babel?' + babelConfig
                },
                {
                    test: /\.es6$/,
                    include: path.resolve('lib/'),
                    loader: 'isparta?{ babel: ' + babelConfig + ' }'
                }
            ]
        }
    },
    webpackMiddleware: {
        noInfo: true,
        quiet: true
    },
    coverageReporter: {
        dir: '../coverage',
        reporters: [
            { type: 'lcovonly', subdir: '.' }
        ]
    },
    browserNoActivityTimeout: 30 * 1000, // default 10 * 1000
    browserDisconnectTimeout: 10 * 1000, // default 2 * 1000
    browserDisconnectTolerance: 1 // default 0
}
