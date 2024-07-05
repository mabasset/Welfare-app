const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	entry: './src/index.ts',
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
		  filename: 'css/bootstrap.css',
		}),
	],
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'static/public'),
	},
	mode: 'development',
	watchOptions: {
		poll: 1000,
	}
};
