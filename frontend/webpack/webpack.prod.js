const webpack = require('webpack')

module.exports = {
    mode:"production",
    devtool:"source-map",
    plugins:[
        new webpack.DefinePlugin({
            "process.env.name": JSON.stringify('Something') //here we define our own .env variable
        }),
    ]
}