const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.jsx',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
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
                    loader:'css-loader',
                    options:{
                        modules:true
                    }
                },
                'sass-loader'
                ]
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'], // Add this rule to handle CSS files
            },
        ]
    },
    resolve: {
        extensions: ['.jsx', '.js', '.scss']
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './public/index.html'
        }),
    ],
};
