/* eslint-disable prettier/prettier */
module.exports = {
  configureWebpack: {
    output: {
      libraryTarget: "umd",
      filename: "spa/js/app.js"
    },
    entry: '../single-spa-entry.js'
  },
}
