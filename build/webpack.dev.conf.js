//Модуль path предоставляет утилиты для работы с путями к файлам и директориям.
// const path = require('path')
const webpack = require('webpack')
const {merge} = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')

const devdWebpackConfig = merge(baseWebpackConfig, {
    mode: 'development',

  
    //обновление содержимого странички во время азроботки запускаеться командой из консоли npm run devS  что описана в файле package.json
    devServer: {
        contentBase: baseWebpackConfig.externals.paths.dist,      
        port: 8080
    },

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