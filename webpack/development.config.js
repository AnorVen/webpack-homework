const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const env = process.env.NODE_ENV;
const isDev = env !== 'production';

module.exports = {
    mode: "development",
    devtool: 'source-map',
    entry: {
        start: "./src/index.js",
        add: './src/pages/add/index.js',
        albums: './src/pages/albums/index.js',
        tags: './src/pages/tags/index.js'
    },

    output: {
        filename: "main.js",
        chunkFilename: '[name].js',
        path: path.resolve(__dirname, "../dist")
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',


                ]
            },


            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },

            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                loader: 'svg-inline-loader'
            }

        ]
    },
    optimization: {
        splitChunks: {
            name: 'vendor',
            chunks: 'all'
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: isDev ? 'style.[hash].css' : 'style.css'
        }),
        new webpack.DefinePlugin({
            isDev: JSON.stringify(isDev)
        }),

        new webpack.HotModuleReplacementPlugin(),

        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            chunks: ['start'] // здесь указываем какие части (chunks) нужны странице
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            chunks: ['add']
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            chunks: ['albums']
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            chunks: ['tags']
        }),
        new BundleAnalyzerPlugin(),


    ],

    devServer: {
        contentBase: path.join(__dirname, '../dist'),
        compress: false,
        port: 9000,
        hot: true,
    }

};
