import path from 'path';

export default {
    cache: true,
    resolve: {
        root: path.resolve('./')
    },
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                exclude: [
                    path.resolve('lib/'),
                    path.resolve('node_modules/')
                ],
                loader: 'babel',
                query: {
                    cacheDirectory: true
                }
            },
            {
                test: /\.js$/,
                include: path.resolve('lib/'),
                loader: 'isparta'
            }
        ]
    }
};
