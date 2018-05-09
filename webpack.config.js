
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  context: __dirname,

  entry: ['./index.js'],

  output: {
    path: __dirname + '/dist',
    filename: 'bcgov-bootstrap.js'
  },
  module: {

    rules: [
      { // regular css files
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader?importLoaders=1',
        }),
      },
      { // sass / scss loader for webpack
        test: /\.(sass|scss)$/,
        use: ExtractTextPlugin.extract([{
          loader: 'css-loader',
          options: {
            minimize: true
          }}, 'sass-loader'])
      },
      // Pull out all fonts because not all should be packaged because some browsers prefer different types
      {
        test: /\.(ttf|eot|woff|woff2|svg|png)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              publicPath: '../'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({ // define where to save the file
      filename: 'bcgov-bootstrap.css',
      allChunks: true,
    }),
    new CleanWebpackPlugin(['dist'], {
      root: __dirname,
      verbose: true,
      dry: false
    }),
  ],
}
