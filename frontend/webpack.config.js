const path = require('path');
const webpack = require('webpack');
require('dotenv').config();

module.exports = {
	entry: path.resolve(__dirname, './src/ts/index.ts'),
	resolve: {
		extensions: ['.ts', '.js'],
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				loader: 'ts-loader',
				options: {
					configFile: path.resolve(__dirname, './tsconfig.json'),
				},
				include: path.resolve(__dirname, './src'),
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				include: path.resolve(__dirname, './src'),
				use: ['style-loader', 'css-loader', 'postcss-loader'],
			},
		],
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				PASSWORD_MIN_LENGTH: JSON.stringify(process.env.PASSWORD_MIN_LENGTH) || 6,
				PASSWORD_MAX_LENGTH: JSON.stringify(process.env.PASSWORD_MAX_LENGTH) || 128,
				PASSWORD_MIN_AMOUNT_LOWER: JSON.stringify(process.env.PASSWORD_MIN_AMOUNT_LOWER) || 1,
				PASSWORD_MIN_AMOUNT_UPPER: JSON.stringify(process.env.PASSWORD_MIN_AMOUNT_UPPER) || 1,
				PASSWORD_MIN_AMOUNT_DIGIT: JSON.stringify(process.env.PASSWORD_MIN_AMOUNT_DIGIT) || 1,
				PASSWORD_MIN_AMOUNT_SPECIAL: JSON.stringify(process.env.PASSWORD_MIN_AMOUNT_SPECIAL) || 1,
				PASSWORD_SPECIAL_CHARACTERS: JSON.stringify(process.env.PASSWORD_SPECIAL_CHARACTERS) || '_*-+!?,.;:',
			},
		}),
	],
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, './static'),
	},
	mode: 'development',
	watchOptions: {
		poll: 1000,
	},
};