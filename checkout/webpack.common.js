const webpack = require("webpack");
const path = require("path");
var shopName = require("../package.json").name;
/**
 * Configuração do webpack
 */

module.exports = {
    entry: {
        checkout: "./src/arquivos/js/checkout.js",
    },
    output: {
        path: path.resolve(__dirname, "./dist/arquivos"),
        filename: shopName + "--[name]-bundle.js",
    },
    resolve: {
        alias: {
            Helpers: path.resolve(__dirname, "..", "src/arquivos/js/helpers"),
            Lib: path.resolve(__dirname, "..", "src/arquivos/js/lib"),
            Config: path.resolve(__dirname, "..", "src/arquivos/js/config"),
            App: path.resolve(__dirname, "..", "src/arquivos/js/app"),
        },
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
        }),
    ],
};
