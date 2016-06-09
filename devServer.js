var WebpackDevServer = require("webpack-dev-server");
var webpack = require("webpack");
var serveStatic = require('serve-static')

var config = require('./webpack.config.dev')

var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {
  contentBase: "./static",
  historyApiFallback: true,
  quiet: true,
  noInfo: false,
  lazy: false,
  publicPath: "http://127.0.0.1:4000/scripts/",
  stats: {colors: true}
});

server.app.use('/scripts',
  serveStatic(__dirname+'/node_modules/phaser/build'))

server.listen(4000, function (e) {
  if (e) {
    console.log("devServer.js 19 ", e.stack);
    process.exit(1)
  }
  console.log('start working on 4000, go write a game')
});