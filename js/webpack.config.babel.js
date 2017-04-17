import { join } from 'path';

export default {
	entry: join(__dirname, 'src/app.js'),
	output: {
		path: join(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			}
		]
	}
};
