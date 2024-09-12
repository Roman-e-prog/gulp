const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode:"production",
    entry: './frontend/src/index.jsx',
    output: {
        path: path.resolve(__dirname, 'frontend/build'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.s[ac]ss$/i,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ]
    },
    resolve: {
        extensions: ['.jsx', '.js', '.scss']
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: 'frontend/public/index.html'
        }),
    ],
};
