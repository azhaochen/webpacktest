var path = require('path')

const sourcepath = path.join(__dirname, 'src/act1');
const outputpath = path.join(__dirname, 'public/act1');

const devMode = process.env.NODE_ENV !== 'production';
console.log(devMode);

const CleanWebpackPlugin = require("clean-webpack-plugin");					//hash���������
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');					//�������Դ�Զ���ӵ�html
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');		//������lodash, С���

module.exports = {
  devtool: 'eval-source-map',
//  entry:  __dirname + "/app/js/main.js",//�Ѷ���ἰ��Ψһ����ļ�
  entry:{
	  main: sourcepath + "/main.js"
  },
  output: {
    //publicPath: "http://cdn.example.com/webpacktest/",	����ö���������css��js��html�ﴦ�������Դ�������ɵ�html�ﶼ��������ǰ׺��
															//�ô���ǰ׺��д���cdn·����Ȼ������ɵ���Դȫ���ŵ����·�����ɡ�
    path: outputpath,					//�������ļ���ŵĵط�
	filename: '[name].bundle-[contenthash:8].js',	//'[name].bundle-[contenthash:8].js' �����Լ�hash, [name]������entry��key������֧�ֶ��entryʱ�����ɶ�Ӧ�Ķ���ļ���
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
					loader:'url-loader', options:{limit:8192}		//url-loader ���������� file-loader���������ļ���С����λ byte������ָ��������ʱ�����Է���һ�� DataURL��
				}
			]
		},
        {
			test: /\.(woff|woff2|eot|ttf|otf)$/,						//css�ļ���������ļ�
			use: [
				'file-loader'
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
  },
  plugins: [
    new MiniCssExtractPlugin({
	  filename: "[name]-[contenthash:8].css",
    }),
    new CleanWebpackPlugin([path.join(__dirname, 'public')], {		
      root: __dirname,
	  //exclude:['index.html'],		//����exclude���htmlҲ�����ˣ�����
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
    contentBase: outputpath, 	//���ط����������ص�ҳ�����ڵ�Ŀ¼
    historyApiFallback: true,	//����ת
    inline: true				//ʵʱˢ��
  } 
  
}