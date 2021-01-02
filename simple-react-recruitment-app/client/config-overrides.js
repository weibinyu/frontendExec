const {
    override,
    fixBabelImports,
    addWebpackAlias
} = require("customize-cra");
const addLessLoader = require("customize-cra-less-loader");

const path = require('path')


module.exports = {
    webpack:override(
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
        addWebpackAlias({
            ["@"]: path.resolve(__dirname,'src')
        }),
    )
}



