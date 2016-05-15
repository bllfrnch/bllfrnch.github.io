module.exports = {
  entry: "./js/app.js",
  output: {
    path: __dirname,
    filename: "./js/bundle.js"
  },
  module: {
    loaders: [
      { test: /\.dot$/, loader: "dot-loader" }
    ]
  }
};
