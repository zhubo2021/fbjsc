const path = require("path")

function resolvePath(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  devServer: {
    port: 2000,
    // open: true,
    // proxy: 'http://localhost:8081'
  },
  publicPath: "/fbjsc",
  outputDir: "fbjsc",
  chainWebpack: config => {
    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap(options => {
        options.compilerOptions.whitespace = "preserve"
        return options
      })
      .end()
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@": resolvePath("src"),
      },
      extensions: [".js"],
    },
    devtool: process.env.NODE_ENV == "production" ? "" : "source-map",
  },

  css: {
    sourceMap: true,
  },
}
