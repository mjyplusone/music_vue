const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');

const config = webpackMerge(baseConfig, {
    mode: 'development',
    entry: path.join(__dirname, '../app/main.js'),
    output: {
        path: path.join(__dirname, '../dist'),
        filename: 'bundle.js'
    },
    devtool: '#eval-source-map',
    devServer: {
        port: 8080,
        overlay: {
            errors: true
        },
        inline: true,
        hot: true,
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.styl/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    'stylus-loader'
                ]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
});

module.exports = config;
