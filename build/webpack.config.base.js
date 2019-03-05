const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    resolve : {
        extensions: ['.js', '.vue', '.json'],
        alias : {
            components: path.join(__dirname, '../app/components'),
            common: path.join(__dirname, '../app/common'),
            base: path.join(__dirname, '../app/base'),
            api: path.join(__dirname, '../app/api')
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                include: [path.join(__dirname, '../app')]
            },
            {
                test: /\.(png|jpg|bmp|gif|svg|eot|ttf|woff|woff2)$/,
                loader: 'url-loader',
                options: {
                    publicPath: '/',
                    limit: 1024,
                    name: 'assets/img/[name].[hash:8].[ext]'
                }
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: 'index.html',
            favicon: 'dog.ico'
        })
    ]
};
