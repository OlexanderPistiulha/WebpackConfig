//Модуль path предоставляет утилиты для работы с путями к файлам и директориям.
const path = require('path');


// создание константы для путей
const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist'),
    assets: 'assets/'
}

//подключение плагинов и дальше создание нового плаига в масиве plugins
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {

    // Базовый каталог, абсолютный путь, для разрешения точек входа и загрузчиков из конфигурации.
    //context: path.resolve(__dirname, 'src'),

    // для получения доступа до константы PATHS из разных файлов
    externals: {
        paths: PATHS
    },

    // Параметр режима в конфигурации, по умолчанию development но также модуль указуется в файле packae.json  для dev (--mode development) or build (--mode production)
    // mode: 'development',

    // Точка или точки, с которых следует начать процесс объединения приложений. Если передан массив, то будут обработаны все элементы.   
    entry: {
        // точка входа в приложение
        // если нужен отдельный файл js то задаем еще одну точку и  в приложение подключаем не один а два файла
        // название точки [name] будет передаваться как название в точку выхода
        // стили и другие файлы которые прописаны в module(rules) можно подключать в этом файле с помощью import '../css/style.css';
        // например в  main.js можно подключить несколь файлов стилей и они будут связани в один, стили будут в том порядке в котором подключали файлы
        main: `${PATHS.src}/js/main.js`
    },

    // Минимальное требование для свойства output в конфигурации  веб-пакета - установить его значение для объекта и предоставить output.filename для использования в выходных файлах:
    output: {
        //путь по которому сохраняется файл
        //значение [name] берем с точки входа
        filename: `${PATHS.assets}js/[name].js`,
        path: PATHS.dist,
        publicPath: '',
    },



    // поддерживает модули, написанные на разных языках, и препроцессоры, через загрузчики.
    // Загрузчики описывают webpack, как обрабатывать модули, не относящиеся к JavaScript, и включать эти зависимости в ваши пакеты. 
    module: {
        rules: [{
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: '/node_modules'
            },
            {
                test: /\{png|jpg|gif|svg}$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader',
                options: {
                    name: `[name].[ext]`,
                },
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

    // Поскольку плагины могут принимать аргументы / параметры, вы должны передать новый экземпляр свойству plugins в конфигурации вашего веб-пакета
    plugins: [
        new CleanWebpackPlugin(),

        //  плагин для оброботки css
        // передаем путь куда будут собираться файлы css
        new MiniCssExtractPlugin({
            filename: `${PATHS.assets}css/style.css`
        }),
        new HtmlWebpackPlugin({
            hash: false,
            template: `${PATHS.src}/index.html`,
            filename: './index.html',
            minify: false
        }),
        new CopyWebpackPlugin({
            patterns: [{
                    from: `${PATHS.src}/img`,
                    to: `${PATHS.assets}img`
                },
                {
                    from: `${PATHS.src}/libs/fonts`,
                    to: `${PATHS.assets}/libs/fonts`

                }
            ]

        })
    ],

};