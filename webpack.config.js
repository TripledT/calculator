var webpack = require("webpack");
var path = require("path");

module.exports = {
	entry: "./src/index.js",
	output: {
		path: path.resolve(__dirname, 'build/public'),
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loader: 'babel-loader'
			},
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
		]
	}
};