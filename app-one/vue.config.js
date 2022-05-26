module.exports = {
  configureWebpack: {
    output: {
      libraryTarget: "system",
      filename: "js/app.js"
    }
  },
  // chainWebpack: (config) => {
  //   config.devServer.headers({
  //     "Access-Control-Allow-Origin": "*",
  //   });
  // }
}