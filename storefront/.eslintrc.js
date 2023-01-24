module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es6: false,
        jquery: true,
    },
    globals: {
        Modulo: true,
    },
    extends: ["eslint:recommended", "plugin:prettier/recommended"],
    plugins: ["prettier"],
    parserOptions: {
        ecmaVersion: 10,
        sourceType: "module",
    },
    rules: {
        "prettier/prettier": "error",
        "linebreak-style": ["warn", "unix"],
    },
};
