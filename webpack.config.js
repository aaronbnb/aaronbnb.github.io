var path = require('path');
const ASSET_PATH = 'https://aaronbnb.github.io';
module.exports = {
  entry: './lib/main.jsx',
  output: {
    path: path.resolve(__dirname),
    filename: 'bundle.js',
    publicPath: ASSET_PATH
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '*']
  }
};
