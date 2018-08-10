var path = require('path')

const sourcepath = path.join(__dirname, 'src/act1');
const outputpath = path.join(__dirname, 'public/act1');

const devMode = process.env.NODE_ENV !== 'production';
console.log(devMode);

const CleanWebpackPlugin = require("clean-webpack-plugin");					//hash后，清理残余
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');					//打包的资源自动添加到html
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');		//按需打包lodash, 小体积

module.exports = {
  devtool: 'eval-source-map',
//  entry:  __dirname + "/app/js/main.js",//已多次提及的唯一入口文件
  entry:{
	  main: sourcepath + "/main.js"
  },
  output: {
    //publicPath: "http://cdn.example.com/webpacktest/",	这个好东西，所有css、js、html里处理过的资源，在生成的html里都会加上这个前缀，
															//好处是前缀填写你的cdn路径，然后把生成的资源全部放到这个路径即可。
    path: outputpath,					//打包后的文件存放的地方
	filename: '[name].bundle-[contenthash:8].js',	//'[name].bundle-[contenthash:8].js' ，可以加hash, [name]是上面entry的key，用于支持多个entry时，生成对应的多个文件。
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
					loader:'url-loader', options:{limit:8192}		//url-loader 功能类似于 file-loader，但是在文件大小（单位 byte）低于指定的限制时，可以返回一个 DataURL。
				}
			]
		},
        {
			test: /\.(woff|woff2|eot|ttf|otf)$/,						//css文件里的字体文件
			use: [
				'file-loader'
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
  },
  plugins: [
    new MiniCssExtractPlugin({
	  filename: "[name]-[contenthash:8].css",
    }),
    new CleanWebpackPlugin([path.join(__dirname, 'public')], {		
      root: __dirname,
	  //exclude:['index.html'],		//不加exclude会把html也给清了！！！
      verbose: true,
      dry: false
	}),
    new HtmlWebpackPlugin({
      title: 'Output Management',
	  template: sourcepath + '/srcindex.html',
	  filename: 'index.html',
    })
  ],
  
  devServer: {
	host: '0.0.0.0',			//can be accessible externally
    contentBase: outputpath, 	//本地服务器所加载的页面所在的目录
    historyApiFallback: true,	//不跳转
    inline: true				//实时刷新
  } 
  
}