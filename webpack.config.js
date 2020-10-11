const path = require('path');

module.exports = {
    entry: './src/index.ts',
    mode: 'development',
    resolve: {
        extensions: ['.ts'],
    },
    module: {
        rules: [
            {
                test: /\.ts/,
                include: path.resolve(__dirname, 'src'),
                use: 'ts-loader',
            },
        ],
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'public/js'),
    },
};
