const path = require('path');

module.exports = {
	entry: './src/index.ts', // Adjust to your main entry point
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: 'ts-loader',
				include: [path.resolve(__dirname, 'src')]
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			}
		],
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'static/public'),
	},
	mode: 'development',
	watchOptions: {
		poll: 1000,
	}
};
