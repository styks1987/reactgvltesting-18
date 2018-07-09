/** @format */

const path = require('path');

const APP_DIR = path.resolve(__dirname, 'src');
const BUILD_DIR = path.resolve(__dirname, 'dist');

module.exports = {
    context: APP_DIR,
    entry: {
        public: './main'
    },
    output: {
        path: BUILD_DIR,
        filename: '[name].bundle.js',
        chunkFilename: '[id].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        query: {
                            mimetype: 'application/font-woff',
                            limit: 10000,
                            publicPath: '/assets/dist/'
                        }
                    }
                }
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: {
                    options: {
                        query: {
                            publicPath: '/assets/dist/'
                        }
                    },
                    loader: 'file-loader'
                }
            },
            {
                test: /\.css$/,
                use: [{loader: 'style-loader'}, {loader: 'css-loader'}, {loader: 'sass-loader'}]
            },
            {
                test: /\.scss$/,
                use: [{loader: 'style-loader'}, {loader: 'css-loader'}, {loader: 'sass-loader'}]
            },
            {
                test: /\.sass$/,
                use: [{loader: 'style-loader'}, {loader: 'css-loader'}, {loader: 'sass-loader'}]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        // To hide radium
        alias: {
            radium: 'lodash/identity'
        }
    },
    mode: 'development',
    watch: true
};
