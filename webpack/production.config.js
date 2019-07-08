const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const env = process.env.NODE_ENV;
const isDev = env !== 'production';
module.exports = {
    mode: "production",
    entry: "./src/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["es2015"],
                    }
                }
            },
            {
                test: /\.css$/,
                use: [

                    {loader: 'style-loader', options: {sourceMap: true}},
                    [MiniCssExtractPlugin.loader, {
                        loader: 'css-loader',
                        options: {importLoaders: 1, sourceMap: true}
                    },],
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
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style.[hash].css'
        }),
        new webpack.DefinePlugin({
            // добавляем общую переменную, которая будет содержать значение в переменной isDev
            isDev: JSON.stringify(isDev)
        }),
        new HtmlWebpackPlugin({ // Добавляем новый плагин
            template: './index.html',
            filename: 'index.html'
        }),
    ],
    devtool: !isDev && 'source-map',
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
