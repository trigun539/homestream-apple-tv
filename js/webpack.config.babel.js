import { join } from 'path';

export default {
	entry: join(__dirname, 'src/app.js'),
	output: {
		path: join(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	resolve: {
		modules: ['node_modules', './src']
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.png$/,
				loader: 'file-loader?name=[name]__[hash:base64:5].[ext]'
			}
		]
	}
};
