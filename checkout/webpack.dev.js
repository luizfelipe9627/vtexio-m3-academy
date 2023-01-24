const webpack = require("webpack");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");

module.exports = merge(common, {
    devtool: "inline-source-map",
    mode: "development",
    externals: {
        vtexjs: "vtexjs",
        jquery: "jQuery",
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                include: path.resolve(__dirname, "..", "src/arquivos/js"),
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [["@babel/preset-env"], "@babel/react"],
                        plugins: ["@babel/plugin-transform-async-to-generator"],
                        cacheDirectory: true,
                    },
                },
            },
        ],
    },
});
