const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const miniCss = require('mini-css-extract-plugin');


module.exports = {
    context: path.resolve(__dirname, 'src'),

    mode: 'development',
    entry: {

        main: [
            './js/main.js',
            './scss/style.scss'
        ],

    },

    output: {
        filename: 'js/[name].bundel.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '../',
    },

    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 8080
    },

    module: {
        rules: [{
            test: /\.(s*)css$/,
            use: [
                miniCss.loader,
                'css-loader',
                'sass-loader',
            ]
        }]
    },

    plugins: [
        new CleanWebpackPlugin(),
        new miniCss({
            filename: './css/style.css',
        }),
    ],

};