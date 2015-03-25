import path from 'path';

const babelConfig = JSON.stringify({
    optional: 'runtime',
    experimental: true
});

export default function(config) {
    config.set({
        singleRun: true,
        autoWatch: false,
        colors: true,
        files: [
            'lib/*.es6'
        ],
        preprocessors: {
            'lib/*.es6': [ 'webpack' ]
        },
        frameworks: [ 'phantomjs-shim', 'mocha' ],
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
        reporters: [ 'mocha', 'coverage' ],
        coverageReporter: {
            dir: '../coverage',
            reporters: [
                { type: 'html' },
                { type: 'lcovonly', subdir: '.' }
            ]
        },
        logLevel: config.LOG_DISABLE,
        browsers: [ 'PhantomJS' ]
    });
};
