var path = require('path')
var glob = require('glob');

const contextpath = path.resolve(__dirname, 'src');
const outputpath = path.resolve(__dirname, 'public');

const webpack = require('webpack');
const CleanWebpackPlugin = require("clean-webpack-plugin");					//hash后，清理残余
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');					//打包的资源自动添加到html
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');		//按需打包lodash, 小体积
 
var mode = 'development';	//or production

module.exports = function(env, argv){
	if(argv && argv.mode){
		mode = argv.mode;
	}

	//自动搜索src所有页面入口
	function getEntry() {
		var entries = {};//entry, dirname, basename, pathname, extname;
		//第三方库
		//var libfiles = glob.sync(path.resolve(contextpath, 'library/*.js'));
		//libfiles.forEach(function(f){
		//	var entryname = /(library\/.*?)\.js/.exec(f)[1];//得到 app/question/index这样的文件名
		//	entries[entryname] = f;
		//});
		//业务app，入口必须是index.js和index.html
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
	/*  entry 格式如下：
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
			filename: mode==='development' ? '[name].js' : '[name].[chunkhash:8].js',	//hash会耗费打包时间
			path: outputpath,
			publicPath: mode==='development'?'/':'http://cdn.example.com/webpacktest/',	//这个 publicPath 是用于拼接在 entry的前面
		},
		resolve: {
			// https://doc.webpack-china.org/configuration/resolve/#resolve-alias
			alias: {
				comm: 	 path.resolve(contextpath, 'app/comm'),		//这样业务代码引用时，只需要 require('comm/login.js')即可，不用../../
				library: path.resolve(contextpath, 'library'),		//这样业务代码引用时，只需要 require('library/qrcode.js')即可，不用../../../
			}
		},
		externals:{
			jquery: 'jQuery',			//不会打进包里，业务直接 const $ = require("jquery") 即可，页面需要自己引入cdn的jquery.js
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
				//minSize: 3000,						//至少30k才拆分出来
				sc_library: {
					test: /[\\/]library[\\/]/,		// library 目录的所有都生成 sc_library chunk，每个页面加载	
					name: 'app/comm/sc_library',
					chunks: 'all',
				},
				sc_comm: {
					test: /[\\/]comm[\\/]/,			// comm 目录的所有都生成 sc_library chunk，每个页面加载	
					name: 'app/comm/sc_comm',				//注意，小于30k的，webpack不会splitChunk
					chunks: 'all',
				}
			  }
			}
		},
		devServer: {
			//host: '0.0.0.0',			//can be accessible externally
			contentBase: outputpath, 	//本地服务器所加载的页面所在的目录
			historyApiFallback: true,	//不跳转
			inline: true				//实时刷新
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
							loader:'url-loader', options:{	//url-loader 功能类似于 file-loader，但是在文件大小（单位 byte）低于指定的限制时，可以返回一个 DataURL。
								limit:8192,
								name: '[path][name].[ext]',		//输出时，保留目录结构 [name].[ext]
							}
						}
					]
				},
				{
					test: /\.(woff|woff2|eot|ttf|otf)$/,						//css文件里的字体文件
					use: [
						{
							loader:'file-loader',options:{
								name: '[path][name].[ext]',		//输出时，保留目录结构 [name].[ext]
							}
						}
					]
				},
				{
					test: /\.css$/,
					use: ['style-loader',MiniCssExtractPlugin.loader, 'css-loader?minimize'],	//建议将 style-loader 与 css-loader 结合使用
				},	
															// ‘style-loader’ might not be necessary anymore since MiniCssExtractPlugin.loader does the same. 
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



	//查各个子页面 用htmlwebpackplugin处理
	var pages = glob.sync(path.resolve(contextpath, 'app/**/*.html'));
	pages.forEach(function(f){
		var htmlpath = /(app\/.*?)\.html/.exec(f)[1];	//格式如：  'app/act1/index'
		console.log(htmlpath);
		
		var options = {
			template: htmlpath + '.html',
			filename: htmlpath + '.html',		//生成的html存放路径
			chunks  : [htmlpath, 'app/comm/sc_library','app/comm/sc_comm'],				//'manifest', 'vendor', 'app',
		}
		
		webpackConfig.plugins.push(new HtmlWebpackPlugin(options))
	});
	

	
	return webpackConfig;
}
