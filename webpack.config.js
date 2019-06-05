// TODO mini-css-extra-plugin to compile dist/index.css file separate from dist/bundle.js
const webpack = require('webpack');

const config = {
    entry:  __dirname + '/javascripts/index.jsx',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js',
        // filename: 'bundle.[contenthash].js',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.scss']
    },
    module: {
        rules: [
            {
                test: /\.jsx?/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.(s*)css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: 'file-loader'
            }
        ]
    },
    devServer: {
        contentBase: __dirname,
        publicPath: '/dist/'
    },
};

module.exports = config;