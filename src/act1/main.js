//main.js 
const greeter = require('./Greeter.js');
document.querySelector("#title").innerText=greeter();

import config from './cfg.json';	//webpack内置支持加载json文件，无需额外loader
import _ from 'lodash';				//这个体积巨大
console.log(_.add(1, 2));

require('./css/zhaomu.css');		//或者，import '../css/zhaomu.css';
require('./css/main.css');

var smallimg = require('./pic/ag.png');		//通过 url-loader 把小图变成base64
var bigimg   = require('./pic/hff.png');		//通过 url-loader 把本地图片路径，打包到output路径里。
document.querySelector("#imgbox").innerHTML = '<img src="'+bigimg+'" />'+'<img src="'+smallimg+'" />';
/*
当你 import MyImage from './my-image.png'，该图像将被处理并添加到 output 目录，_并且_ MyImage 变量将包含该图像在处理后的最终 url。
当使用 css-loader 时，如上所示，你的 CSS 中的 url('./my-image.png') 会使用类似的过程去处理。
loader 会识别这是一个本地文件，并将 './my-image.png' 路径，替换为输出目录中图像的最终路径。
html-loader 以相同的方式处理 <img src="./my-image.png" />。
*/