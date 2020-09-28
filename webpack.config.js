//Модуль path предоставляет утилиты для работы с путями к файлам и директориям.
const path = require('path');

//подключение плагинов и дальше создание нового плаига в масиве plugins
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

// условие на тип сборки development or prodaction
var isProdaction = (process.env.NODE_ENV === 'prodaction');

module.exports = {

    // Базовый каталог, абсолютный путь, для разрешения точек входа и загрузчиков из конфигурации.
    context: path.resolve(__dirname, 'src'),

    // Параметр режима в конфигурации, по умолчанию development но также модуль указуется в файле packae.json  для dev (--mode development) or build (--mode production)
    mode: 'development',

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

    //обновление содержимого странички во время азроботки запускаеться командой из консоли npm run devS  что описана в файле package.json
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 8080
    },

    // поддерживает модули, написанные на разных языках, и препроцессоры, через загрузчики.
    // Загрузчики описывают webpack, как обрабатывать модули, не относящиеся к JavaScript, и включать эти зависимости в ваши пакеты. 
    module: {
        rules: [{
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
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
                            sourceMap: true
                        }
                    },
                    // {
                    //     loader: 'postcss-loader',
                    //     options: {
                    //         sourceMap: true,
                    //         config: {
                    //             path: './js/postcss.config.js'
                    //         }
                    //     }
                    // },
                    {
                        loader: 'sass-loader'
                    }
                ],
            },
        ]
    },

    // условие на development or prodaction
    // обеспеевает  стиль сопоставления источников, чтобы улучшить процесс отладки. 
    devtool: (isProdaction) ? '' : 'source-map',


    // Поскольку плагины могут принимать аргументы / параметры, вы должны передать новый экземпляр свойству plugins в конфигурации вашего веб-пакета
    plugins: [
        new CleanWebpackPlugin(),

        //  плагин для оброботки css
        // передаем путь куда будут собираться файлы css
        new MiniCssExtractPlugin({
            filename: 'css/style.css',
        }),
    ],

};