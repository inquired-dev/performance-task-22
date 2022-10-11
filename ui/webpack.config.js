const path = require("path");
const webpack = require('webpack');
const APP_PATH = path.resolve(__dirname, 'src');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: APP_PATH,
    devtool: 'eval-source-map',
    devServer: {
        open: false,
        port: 2000,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: ["ts-loader"],
            },
            {
                test: /\.(css|scss)$/,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebPackPlugin({ 
            inject: true, 
            template: path.join(APP_PATH, '../public/index.html'),
            favicon: "./public/inquirEDlogo_Favicon.ico"
        }),
    ],
};
