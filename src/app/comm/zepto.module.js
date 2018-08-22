define(function(require, exports, module) {
	
	require('library/zepto.min.js');	//非CommonJS，require，直接引入，不做解析，不能用 var Zepto=require('library/zepto.min.js');
	var _ajax = Zepto.ajax;
	
	Zepto.ajax=function(opt){
		var _opt = opt;
		var jsonFlag = (_opt.dataType == 'json')? '&json=1' : '';  
		if(typeof _opt.url != 'undefined'){
			if(_opt.url.indexOf('?')!=-1){
				_opt.url += '&g_app_tk='+jsonFlag;		//opt.url += '&g_app_tk='+GlobalData.g_tk+jsonFlag;
			}else{
				_opt.url += '?g_app_tk='+jsonFlag;		//_opt.url += '?g_app_tk='+GlobalData.g_tk+jsonFlag;
			}
		}
		var _success = opt.success;
		_opt.success = function(data){
			_success(data);
		}
		_ajax(_opt);
	}
	
	Zepto.getScript = function(src, func) {
		var script = document.createElement('script');
		script.async = "async";
		script.src = src;
		if (func) {
		   script.onload = func;
		}
		document.getElementsByTagName("head")[0].appendChild( script );
	}
	
	module.exports = Zepto;
	
});