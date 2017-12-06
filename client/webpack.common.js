const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'app'),
  output: {
    path: path.resolve('../public'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader']}
    ]
  }
};
