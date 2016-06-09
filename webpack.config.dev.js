var path = require("path")
var webpack = require('webpack')

module.exports = {

  entry: ['webpack-dev-server/client?http://127.0.0.1:4000',
    'webpack/hot/only-dev-server',
    path.join(__dirname, "src/index.js")
  ],

  output: {
    path: path.join(__dirname, "build/scripts"),
    publicPath: "http://127.0.0.1:4000/scripts/",
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
    new webpack.HotModuleReplacementPlugin()
  ]
};
