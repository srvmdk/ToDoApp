const path = require("path");

module.exports = {
	entry: {
		main: "./src/index.js",
		vendor: "./src/vendor.js",
	},

	module: {
		rules: [
			{
				test: /\.html$/,
				use: ["html-loader"], // requires the img file marked with src in js
			},
			// {
			// 	// *** not required in webpack 5+, use assetModuleFilename under output instead ***
			// 	test: /\.(png|jpg|jpeg|gif)$/,
			// 	use: [
			// 		{
			// 			loader: "file-loader", // loads the image files as a part of bundle
			// 			options: {
			// 				name: "[name]-[hash].[ext]", // renames the image with hash, and
			// 				outputPath: "imgs", // copies images to build/imgs folder
			// 				esModule: false,
			// 			},
			// 		},
			// 	],
			// 	type: "javascript/auto",
			// },
		],
	},
};
