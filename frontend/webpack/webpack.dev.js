const webpack = require('webpack');
const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
module.exports = {
    mode:"development",
    devtool:"cheap-module-source-map",
    devServer:{
        hot:true,
        open:true,
        static:
        path.join(__dirname, 'public'),
        compress:true,
        port:3000
    },
    plugins:[
        new webpack.DefinePlugin({
            "process.env.name": JSON.stringify('Something')
        }),
        new ReactRefreshWebpackPlugin()
    ]
}