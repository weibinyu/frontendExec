const {
    override,
    fixBabelImports,
} = require("customize-cra");

const addLessLoader = require("customize-cra-less-loader");

module.exports = override(
    fixBabelImports("import", {
        libraryName: "antd-mobile", style: true
    }),
    addLessLoader({
        lessLoaderOptions: {
            lessOptions: {
                javascriptEnabled: true,
                modifyVars:{
                    "@brand-primary":"#1cae82",
                    "@brand-primary-tap":"#1DA57A",
                },
            },
        },
    }),
);