const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')

module.exports = {
    entry: './src/index.tsx',
    devtool: 'source-map',
    devServer: {
        hot: true,
        compress: true,
        open: true,
        historyApiFallback: true,
        port: 443,
        server: 'https'
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(html)$/,
                use: { loader: 'html-loader' }
            },
            {
                test: /\.(ts|tsx)$/,
                use: { loader: 'ts-loader' }
            },
            {
                test: /\.(js|jsx)$/,
                use: { loader: 'babel-loader' },
                exclude: /node_modules/
            },
            {
                test: /\.(svg|png|jpg)$/,
                use: { loader: 'url-loader' }
            },
            {
                test: /\.css$/,
                exclude: /\.module.css$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.s?css$/,
                exclude: /\.module\.s?css$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.module\.s?css$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            modules: {
                                localIdentName: '[local]__[hash:base64:8]'
                            }
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss'],
        alias: {
            '@': path.resolve(__dirname, 'src/')
        }
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: './public',
                    to: '.'
                }
            ]
        })
    ]
}
