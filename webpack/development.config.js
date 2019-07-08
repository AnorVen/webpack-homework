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
        path: path.resolve(__dirname, "dist")
    },

    module: {
        rules: [
            {
                test: /\.(css|scss)$/,
                exclude: /node_modules/,
                use: [
                    {loader: 'style-loader', options: {sourceMap: true}},
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'postcss-loader', options: {
                            sourceMap: true,
                            ident: 'postcss',
                            plugins: [
                                require('postcss-import')(),
                                require('stylelint')(),
                            ]
                        }
                    },
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
                use: [
                    'url-loader?limit=2000&hash=sha512&digest=hex&name=[hash].[ext]'
                ]
            }

        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            loader: 'css-loader',
            filename: 'style.[hash].css'
        }),
        new webpack.DefinePlugin({
            // добавляем общую переменную, которая будет содержать значение в переменной isDev
            isDev: JSON.stringify(isDev)
        }),
        new HtmlWebpackPlugin({ // Добавляем новый плагин
            template: './src/index.html',
            filename: 'index.html'
        }),
        new webpack.HotModuleReplacementPlugin()
    ],

    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: false,
        port: 9000,
        clientLogLevel: 'silent',
        color: true,
        hot: true,
        headers: {
            'X-Custom-Foo': 'bar'
        }


    }

};
