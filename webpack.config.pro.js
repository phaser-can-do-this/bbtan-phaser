var webpack = require('webpack');
var path = require("path")

module.exports = {

  devtool: 'source-map',

  entry: path.resolve(__dirname, "src/index.js"),

  output: {
    path: path.resolve(__dirname, "build/scripts"),
    publicPath: "/scripts/",
    filename: "game.js"
  },
  module: {
    loaders: [{
      test: /\.jsx*$/,
      exclude: [/node_modules/],
      loaders: ['babel']
    }]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ]
}
