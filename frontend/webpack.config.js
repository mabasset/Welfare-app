const path = require('path');

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
	plugins: [],
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, './static'),
	},
	mode: 'development',
	watchOptions: {
		poll: 1000,
	},
};
