const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
	mode: "production",
	output: {
		filename: "[name]-[contenthash].bundle.js", // contenthash - adds hash for cache bursting
		path: path.resolve(__dirname, "build"),
		assetModuleFilename: "./images/[name]-[hash][ext]", // replacement of file-loader
	},
	plugins: [
		new MiniCssExtractPlugin({
			// extracts css to respective file
			filename: "[name]-[contenthash].css",
		}),
		new CleanWebpackPlugin(), // cleans the old hashed files in build
	],
	optimization: {
		minimizer: [
			new CssMinimizerWebpackPlugin(), // minimizes the css
			new TerserWebpackPlugin(), // minimizes the js
			new HtmlWebpackPlugin({
				// generates dynamic html file - to support content hash
				template: "./public/index.html", // to generate new html file in build based on the template provided
				minify: {
					// minimizes the html
					removeAttributeQuotes: true,
					removeComments: true,
					collapseWhitespace: true,
				},
			}),
		],
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader, // 2. separates out the css in new file
					"css-loader", // 1. turns css to valid js
				],
			},
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader, // 2. separates out the css in new file
					"css-loader", // 2. turns css to valid js
					"sass-loader", // 1. turns scss to valid css
				],
			},
		],
	},
};

module.exports = merge(common, config);
