const {
    override,
    fixBabelImports,
} = require("customize-cra");

const addLessLoader = require("customize-cra-less-loader");

module.exports = override(
    fixBabelImports("import", {
        libraryName: "antd-mobile", style:"css"
    }),
    addLessLoader({
        cssLoaderOptions: {
            sourceMap: true,
            modules: {
                localIdentName: "[hash:base64:8]",
            },
        },
        lessLoaderOptions: {
            lessOptions: {
                strictMath: true,
            },
        },
    }),
);