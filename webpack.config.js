//webpack.config.js


import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: {
        bundle: "./src/assets/javascript/app.js",
        docs: "./src/assets/javascript/docs.js"
    },
    output: {
        filename: "[name].js"
    },
    plugins: [new UglifyJsPlugin({
        uglifyOptions: {
            output: {
                comments: false,
                beautify: false,
            }
        }
    })],
};

