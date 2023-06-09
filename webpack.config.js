const path = require("path");

const mode = process.env.NODE_ENV || "development";

const HtmlWebpackPlugin = require("html-webpack-plugin");

const devMode = mode === "development";

const target = devMode ? "web" : "browserslist";

const devtool = devMode ? "source-map" : undefined;

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	mode,
	target,
	devtool,
	devServer: {
		hot: true,
		historyApiFallback: true,
	},
	entry: ["@babel/polyfill", path.resolve(__dirname, "src", "index.js")],
	output: {
		path: path.resolve(__dirname, "dist"),
		clean: true,
		filename: "scripts.js",
		publicPath: "/",
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, "src", "index.html"),
		}),
		new MiniCssExtractPlugin({
			filename: "styles.css",
		}),
	],
	module: {
		rules: [
			{
				test: /\.html$/i,
				loader: "html-loader",
			},
			{
				test: /\.(c|le)ss$/i,
				use: [
					devMode ? "style-loader" : MiniCssExtractPlugin.loader,
					"css-loader",
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								plugins: [require("postcss-preset-env")],
							},
						},
					},
					"less-loader",
				],
			},
			{
				test: /\.m?(js|jsx)$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"],
					},
				},
			},
		],
	},
	resolve: {
		extensions: [".js", ".jsx", ".ts", ".tsx"],
	},
};
