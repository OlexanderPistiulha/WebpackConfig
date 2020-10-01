const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');

module.exports = {

    // Базовый каталог, абсолютный путь, для разрешения точек входа и загрузчиков из конфигурации.
    context: path.resolve(__dirname, 'src'),

    // Параметр режима в конфигурации, по умолчанию development но также модуль указуется в файле packae.json  для dev (--mode development) or build (--mode production)
    // mode: 'development',

    // Точка или точки, с которых следует начать процесс объединения приложений. Если передан массив, то будут обработаны все элементы.   
    entry: {
        // точка входа в приложение
        // если нужен отдельный файл js то задаем еще одну точку и  в приложение подключаем не один а два файла
        // название точки [name] будет передаваться как название в точку выхода
        // стили и другие файлы которые прописаны в module(rules) можно подключать в этом файле с помощью import '../css/style.css';
        // например в  main.js можно подключить несколь файлов стилей и они будут связани в один, стили будут в том порядке в котором подключали файлы
        main: './js/main.js',
    },

    // Минимальное требование для свойства output в конфигурации  веб-пакета - установить его значение для объекта и предоставить output.filename для использования в выходных файлах:
    output: {
        //путь по которому сохраняется файл
        //значение [name] берем с точки входа
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '../',
    },
    module: {
        rules: [{
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: '/node_modules'
            },

            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        },
                    },
                    {
                        loader: "postcss-loader"
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        },
                    },
                    {
                        loader: "postcss-loader"
                    },


                    {
                        loader: 'sass-loader'
                    }

                ],
            },
        ]
    },

    // условие на development or prodaction
    // обеспеевает  стиль сопоставления источников, чтобы улучшить процесс отладки. 
    // devtool: 'source-map',



    // Поскольку плагины могут принимать аргументы / параметры, вы должны передать новый экземпляр свойству plugins в конфигурации вашего веб-пакета
    plugins: [
        new CleanWebpackPlugin(),

        //  плагин для оброботки css
        // передаем путь куда будут собираться файлы css
        new MiniCssExtractPlugin({
            filename: 'css/style.css',
        }),
    ],
}