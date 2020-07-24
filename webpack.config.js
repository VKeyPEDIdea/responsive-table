const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		app: './js/app.js',
		polyfill: 'babel-polyfill',
	},
	// Также webpack рекомендует явно указывать, в какой директории находятся исходные файлы проекта (ресурсы). Для этого следует использовать свойство context:
	context: path.resolve(__dirname, 'src'),
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: '[name].[hash].js',
	},
	module: {
		rules: [{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: '/node-modules'
			},
			{
				test: /\.css$/,
				use: [
					"style-loader",
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true,
							config: {
								path: 'src/js/postcss.config.js'
							}
						},
					},
				],
			},
			{
				test: /\.sass$/,
				use: [
					"style-loader",
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true,
							config: {
								path: 'src/js/postcss.config.js'
							}
						},
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
						},
					},
				]
			},
			{
				test: /\.(png|jpe?g|gif)$/,
				use: [{
					loader: 'file-loader',
					options: {
						name: '[path][name].[ext]',
					},
				}, ],
			},

		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// both options are optional
			filename: '[name].css',
		}),
		new HtmlWebpackPlugin({
			template: './index.html',
		}),
	],
  devServer: {
    publicPath: '/',
    port: 9000,
    contentBase: path.join(__dirname, 'src'),
		host: 'localhost',
		watchContentBase: true,
    historyApiFallback: true,
    noInfo: false,
    stats: 'minimal',
		hot: true,
		overlay: true,
  },
};