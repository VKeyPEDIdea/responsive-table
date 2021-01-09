const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

const filename = ext => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`;

const jsLoaders = () => {
	const loaders = [
		{
			loader: 'babel-loader',
			options: {
				presets: ['@babel/preset-env']
			}
		},
	];

	return loaders;
};

module.exports = {
	entry: ['@babel/polyfill', './index.js'],
	context: path.resolve(__dirname, 'src'),
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: filename('js'),
	},
	module: {
		rules: [
			{
				test: /\.(png|jpe?g|gif)$/,
				use: [{
					loader: 'file-loader',
					options: {
						name: '[path][name].[ext]',
					},
				}, ],
			},
			{
				test: /\.(ttf|eot|woff2|woff|svg|png|jpg|gif|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'file-loader'
			},
      {
        test: /\.s[ac]ss$/i,
        use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							hmr: isDev,
							reloadAll: true,
						}
					},
          'css-loader',
          'sass-loader',
        ],
			},
			{
        test: /\.m?js$/,
        exclude: '/node_modules/',
				use: jsLoaders()
      }
    ],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HTMLWebpackPlugin({
			template: './index.html',
			minify: {
				removeComments: isProd,
				collapseWhitespace: isProd,
			}
		}),
		new CopyPlugin({
			patterns: [
				{ from: path.resolve(__dirname, 'src/favicon.ico'), to: path.resolve(__dirname, 'dist') },
			],
		}),
		new MiniCssExtractPlugin({
			filename: filename('css')
		}),
	],
	resolve: {
		extensions: ['.js'],
		alias: {
			'@': path.resolve(__dirname, 'src'),
			'@core': path.resolve(__dirname, 'src/core'),
		}
	},
	devServer: {
		publicPath: '/',
		port: 2094,
    contentBase: path.join(__dirname, 'src'),
    compress: true,
		hot: isDev,
		host: 'localhost',
		overlay: true,
		watchContentBase: true,
    historyApiFallback: true,
    noInfo: false,
    stats: 'minimal',
  },
	devtool: isDev ? 'source-map' : false,
};