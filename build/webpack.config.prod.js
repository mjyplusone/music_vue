const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const config = webpackMerge(baseConfig, {
    mode: 'production',
    entry: {
        app: path.join(__dirname, '../app/main.js')
    },
    output: {
        path: path.join(__dirname, '../dist'),
        filename: 'assets/js/[name].bundle.[chunkhash:8].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
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
                    MiniCssExtractPlugin.loader,
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
        new MiniCssExtractPlugin({
            filename: 'assets/css/[name].styles.[contenthash:8].css'
        }),
        new CompressionPlugin({
            asset: '[file].gz[query]',
            algorithm: 'gzip',
            test: new RegExp('\\.(js|css)$'),
            threshold: 10240,
            minRatio: 0.8
        }),
        new BundleAnalyzerPlugin()
    ],
    // 业务代码拆分
    optimization: {
        minimizer: [
            new OptimizeCssAssetsPlugin({}),
            new UglifyJsPlugin({
              uglifyOptions: {
                ecma: 6,
                cache: true,
                parallel: true
              }
            })
        ],
        runtimeChunk: true,
        moduleIds: 'hashed',
        splitChunks: {
            cacheGroups: { // 设置缓存的 chunks
                commons: {
                    chunks: 'initial', // 三选一： "initial" | "all" | "async"(默认就是异步)
                    minSize: 0, // 最小尺寸，默认0,
                    minChunks: 2, // 最小 chunk ，默认1
                    maxInitialRequests: 5 // 最大初始化请求书，默认1
                },
                vendor: {
                    test: /node_modules/, // 正则规则验证，如果符合就提取 chunk
                    chunks: 'initial', // 三选一： "initial" | "all" | "async"(默认就是异步)
                    name: 'vendor', // 要缓存的 分隔出来的 chunk 名称
                    priority: 10, // 缓存组优先级
                    enforce: true
                }
            }
        }
    }
});

module.exports = config;
