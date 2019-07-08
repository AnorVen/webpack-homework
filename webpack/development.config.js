const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const webpack = require('webpack');

const env = process.env.NODE_ENV;
const isDev = env !== 'production';

module.exports = {
    mode: "development",
    devtool: 'source-map',
    entry: "./src/index.js",
    output: {
        filename: "bundle.js",
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
    plugins: [
        new MiniCssExtractPlugin({
            filename: isDev ? 'style.css' : 'style.css'
        }),
        new webpack.DefinePlugin({
            isDev: JSON.stringify(isDev)
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        }),
        new webpack.HotModuleReplacementPlugin()
    ],

    devServer: {
        contentBase: path.join(__dirname, '../dist'),
        compress: false,
        port: 9000,
        hot: true,
    }

};
