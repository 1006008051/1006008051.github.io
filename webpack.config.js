const path = require('path');
const pkg = require('./package.json'); //pkg信息
const { VueLoaderPlugin } = require('vue-loader-v16');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); //清除打包文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 分离css
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); //压缩css
const copyPlugin = require('copy-webpack-plugin');
const webpackBar = require('webpackbar');
const { entry } = require('./main.ts');// 获取所有的入口文件
console.log(entry)
// webpack配置
module.exports = {
    mode: 'production',
    entry,
    output: {
        path: path.resolve(__dirname, 'lib'),
        filename: (o) => {
            return o.chunk.name == 'index' ? 'index.js' : '[name]/index.js';
        },
        library: pkg.name,
        libraryTarget: 'umd'
    },
    resolve: {
        // 设置后缀省略
        extensions: ['.tsx', '.ts', '.js', '.vue', '.json'],
        // 设置别名
        alias: {
            '@style': path.resolve(__dirname, 'style'), // 这样配置后 @ 可以指向 src 目录
        }
    },
    plugins: [
        new webpackBar(),
        new CleanWebpackPlugin(),
        new OptimizeCSSAssetsPlugin(),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: (o) => {
                return o.chunk.name == 'index' ? 'index.css' : '[name]/index.css'
            }
        }),
        new copyPlugin([
            { from: 'style', to: 'style' },
            { from: 'types', to: 'types' }
        ])
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                },
                exclude: /node_modules/,
            },
            {
                test: /\.vue$/,
                use: {
                    loader: 'vue-loader-v16',
                    options: {
                        preserveWhitespace: false // 不要留空白
                    }
                }
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader']
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.(jep?g|png|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10240,
                        fallback: {
                            loader: 'file-loader',
                            options: {
                                name: 'img/[name].[hash:8].[ext]'
                            }
                        }
                    }
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10240,
                        fallback: {
                            loader: 'file-loader',
                            options: {
                                name: 'media/[name].[hash:8].[ext]'
                            }
                        }
                    }
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10240,
                        fallback: {
                            loader: 'file-loader',
                            options: {
                                name: 'media/[name].[hash:8].[ext]'
                            }
                        }
                    }
                }
            }
        ],
    }
};