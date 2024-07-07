const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	entry: './src/index.ts',
	resolve: {
		extensions: ['.ts', '.js'],
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: 'ts-loader',
				include: [path.resolve(__dirname, 'src')]
			},
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			}
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
		  filename: 'public/css/bootstrap.css',
		}),
	],
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'static'),
	},
	mode: 'development',
	watchOptions: {
		poll: 1000,
	},
};
