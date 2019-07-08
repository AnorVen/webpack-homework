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
                use: [MiniCssExtractPlugin.loader, 'css-loader']
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
                use: [
                    {loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                        },
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            bypassOnDebug: true, //
                            disable: true, //
                        },
                    },
                ]
            }

        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: isDev ? 'style.[hash].css' : 'style.css'
        }),
        new webpack.DefinePlugin({
            // добавляем общую переменную, которая будет содержать значение в переменной isDev
            isDev: JSON.stringify(isDev)
        }),
        new HtmlWebpackPlugin({ // Добавляем новый плагин
            template: './src/index.html',
            filename: 'index.html'
        }),
        new webpack.DefinePlugin({
            isDev: JSON.stringify(isDev)
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
