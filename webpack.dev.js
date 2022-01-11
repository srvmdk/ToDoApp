const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
	mode: "development",
	devtool: false, // removes eval in build file
	output: {
		filename: "[name].bundle.js",
		path: path.resolve(__dirname, "build"),
		assetModuleFilename: "./assets/[name][ext]", // replacement of file-loader in webpack 5
	},
	plugins: [
		new HtmlWebpackPlugin({
			// generates dynamic html file - to support content hash
			template: "./public/index.html", // to generate new html file in build based on the template provided
		}),
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					"style-loader", // 2. injects css-js to DOM using style tag
					"css-loader", // 1. turns css to valid js
				],
			},
			{
				test: /\.scss$/,
				use: [
					"style-loader", // 3. injects css-js to DOM using style tag
					"css-loader", // 2. turns css to valid js
					"sass-loader", // 1. turns scss to valid css
				],
			},
		],
	},
};

module.exports = merge(common, config);
