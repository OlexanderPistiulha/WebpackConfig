const webpack = require('webpack')
const {merge} = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')

const devdWebpackConfig = merge(baseWebpackConfig, {
    mode: 'development',
    // devServer: {
    //     contentBase: path.join(__dirname),
    //     port: 8081
    // },
    devtool: 'cheap-module-eval-source-map',
    plugins: [
        new webpack.SourceMapDevToolPlugin({
           filename: '[file].map' 
        })
    ]
})

module.exports = new Promise((resolve, reject) => {
    resolve(devdWebpackConfig)
})