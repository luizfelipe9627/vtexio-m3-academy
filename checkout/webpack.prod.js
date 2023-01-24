const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(common, {
    externals: {
        jquery: "jQuery",
        vtexjs: "vtexjs",
    },
    mode: "production",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules\/(?!(@agenciam3\/pkg)\/).*/,
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
    optimization: {
        usedExports: true,
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: true,
                terserOptions: {
                    keep_classnames: true,
                    keep_fnames: true,
                    compress: {
                        pure_funcs: [
                            "console.table",
                            "console.debug",
                            "console.log",
                        ],
                    },
                },
            }),
        ],
    },
});
