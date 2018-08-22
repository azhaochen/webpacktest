var path = require('path')
var glob = require('glob');

const contextpath = path.resolve(__dirname, 'src');
const outputpath = path.resolve(__dirname, 'public');

const webpack = require('webpack');
const CleanWebpackPlugin = require("clean-webpack-plugin");					//hash���������
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');					//�������Դ�Զ���ӵ�html
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');		//������lodash, С���
 
var mode = 'development';	//or production

module.exports = function(env, argv){
	if(argv && argv.mode){
		mode = argv.mode;
	}

	//�Զ�����src����ҳ�����
	function getEntry() {
		var entries = {};//entry, dirname, basename, pathname, extname;
		//��������
		//var libfiles = glob.sync(path.resolve(contextpath, 'library/*.js'));
		//libfiles.forEach(function(f){
		//	var entryname = /(library\/.*?)\.js/.exec(f)[1];//�õ� app/question/index�������ļ���
		//	entries[entryname] = f;
		//});
		//ҵ��app����ڱ�����index.js��index.html
		var appfiles = glob.sync(path.resolve(contextpath, 'app/**/index.js'));
		appfiles.forEach(function(f){
			var entryname = /(app\/.*?)\.js/.exec(f)[1];
			entries[entryname] = f;
		});
		
		//for (var i = 0; i < files.length; i++) {
		//  entry = files[i];
		//  dirname = path.dirname(entry);
		//  extname = path.extname(entry);
		//  basename = path.basename(entry, extname);
		//  pathname = path.resolve(dirname, basename);
		//  pathname = pathDir ? pathname.replace(new RegExp('^' + pathDir), '') : pathname;
		//  entries[pathname] = ['./' + entry];
		//}
		
		console.log(entries);
		
		return entries;
	}
	/*  entry ��ʽ���£�
	{
		'library/jquery-1.9.1.min':'D:/nodejs/project/webpacktest/src/library/jquery-1.9.1.min.js',
		'library/jquery.cookie': 'D:/nodejs/project/webpacktest/src/library/jquery.cookie.js',
		'library/qrcode': 'D:/nodejs/project/webpacktest/src/library/qrcode.js',
		'app/act1/index': 'D:/nodejs/project/webpacktest/src/app/act1/index.js',
		'app/act2/index': 'D:/nodejs/project/webpacktest/src/app/act2/index.js'
	}
	*/


	var webpackConfig = {
		context: contextpath,
		entry: getEntry(),
		output: {
			filename: mode==='development' ? '[name].js' : '[name].[chunkhash:8].js',	//hash��ķѴ��ʱ��
			path: outputpath,
			publicPath: mode==='development'?'/':'http://cdn.example.com/webpacktest/',	//��� publicPath ������ƴ���� entry��ǰ��
		},
		resolve: {
			// https://doc.webpack-china.org/configuration/resolve/#resolve-alias
			alias: {
				comm: 	 path.resolve(contextpath, 'app/comm'),		//����ҵ���������ʱ��ֻ��Ҫ require('comm/login.js')���ɣ�����../../
				library: path.resolve(contextpath, 'library'),		//����ҵ���������ʱ��ֻ��Ҫ require('library/qrcode.js')���ɣ�����../../../
			}
		},
		externals:{
			jquery: 'jQuery',			//���������ҵ��ֱ�� const $ = require("jquery") ���ɣ�ҳ����Ҫ�Լ�����cdn��jquery.js
		},
		devtool: 'eval-source-map',
		plugins: [
			new webpack.DefinePlugin({
				'process.env.NODE_ENV':JSON.stringify(mode),
			}),
			new MiniCssExtractPlugin({
				filename: mode==='development' ? "[name].css" : "[name].[contenthash:8].css",
			}),
			new CleanWebpackPlugin([path.resolve(__dirname, 'public')], {
				root: __dirname,
				//exclude:['index.html'],
				verbose: true,
				dry: false
			}),
		],
		optimization: {
			splitChunks: {
				// include all types of chunks
			  cacheGroups: {
				//minSize: 3000,						//����30k�Ų�ֳ���
				sc_library: {
					test: /[\\/]library[\\/]/,		// library Ŀ¼�����ж����� sc_library chunk��ÿ��ҳ�����	
					name: 'app/comm/sc_library',
					chunks: 'all',
				},
				sc_comm: {
					test: /[\\/]comm[\\/]/,			// comm Ŀ¼�����ж����� sc_library chunk��ÿ��ҳ�����	
					name: 'app/comm/sc_comm',				//ע�⣬С��30k�ģ�webpack����splitChunk
					chunks: 'all',
				}
			  }
			}
		},
		devServer: {
			//host: '0.0.0.0',			//can be accessible externally
			contentBase: outputpath, 	//���ط����������ص�ҳ�����ڵ�Ŀ¼
			historyApiFallback: true,	//����ת
			inline: true				//ʵʱˢ��
		},
		module: {
			rules: [
				{
					test: /\.html$/,
					use: [
						{
						  loader: 'html-loader',
						  options: {minimize: false}
						}
					],
				},
				{
					test: /\.(png|jpg|gif)$/,
					use:[
						{
							loader:'url-loader', options:{	//url-loader ���������� file-loader���������ļ���С����λ byte������ָ��������ʱ�����Է���һ�� DataURL��
								limit:8192,
								name: '[path][name].[ext]',		//���ʱ������Ŀ¼�ṹ [name].[ext]
							}
						}
					]
				},
				{
					test: /\.(woff|woff2|eot|ttf|otf)$/,						//css�ļ���������ļ�
					use: [
						{
							loader:'file-loader',options:{
								name: '[path][name].[ext]',		//���ʱ������Ŀ¼�ṹ [name].[ext]
							}
						}
					]
				},
				{
					test: /\.css$/,
					use: ['style-loader',MiniCssExtractPlugin.loader, 'css-loader?minimize'],	//���齫 style-loader �� css-loader ���ʹ��
				},	
															// ��style-loader�� might not be necessary anymore since MiniCssExtractPlugin.loader does the same. 
				{
					test: /\.js$/,
					exclude: /node_modules/,	
					use:{
						loader: 'babel-loader',
						options:{
							plugins: ['lodash'],
							presets: ['env']					
						}
					}
				}
			]
		}
	}



	//�������ҳ�� ��htmlwebpackplugin����
	var pages = glob.sync(path.resolve(contextpath, 'app/**/*.html'));
	pages.forEach(function(f){
		var htmlpath = /(app\/.*?)\.html/.exec(f)[1];	//��ʽ�磺  'app/act1/index'
		console.log(htmlpath);
		
		var options = {
			template: htmlpath + '.html',
			filename: htmlpath + '.html',		//���ɵ�html���·��
			chunks  : [htmlpath, 'app/comm/sc_library','app/comm/sc_comm'],				//'manifest', 'vendor', 'app',
		}
		
		webpackConfig.plugins.push(new HtmlWebpackPlugin(options))
	});
	

	
	return webpackConfig;
}
