;define(function(require, exports,module){
	var ua = navigator.userAgent.toLowerCase();
	var isWeixin = ua.indexOf('micromessenger') != -1;
	var isAndroid = ua.indexOf('android') != -1;
	var isIos = (ua.indexOf('iphone') != -1) || (ua.indexOf('ipad') != -1);
	
	var g_sSchema = '';
	var g_sDownload = '';

	/**
     * 扩展 obj 对象
     * @param  {[type]} obj [description]
     * @param  {[type]} ext [description]
     * @return {[type]}     [description]
     */
    function extend(obj, ext, overwrite) {
        var i;
        for (i in ext) {
            if (ext.hasOwnProperty(i) && !(i in obj) || overwrite) {
                obj[i] = ext[i];
            }
        }
        return obj;
    }
	
	/*
	发送请求
	*/
	function openURL(method, params){
		var url = 'gamelife://jsapi/'+ method + '?p=' + encodeURIComponent(JSON.stringify(params) || '');
		var tmpIframe = document.createElement("iframe");
		tmpIframe.setAttribute("width", 0);
		tmpIframe.setAttribute("height", 0);
		tmpIframe.setAttribute("style", "display: none;");
		document.body.appendChild(tmpIframe);
		tmpIframe.src = url;//发请求
		setTimeout(function() {
			document.body.removeChild(tmpIframe);
		}, 0);
	}

	/*
	转发到app
	*/
	function invoke(method, params, callback){
		extend(params, {'callback':callback});
		var u = navigator.userAgent;
		if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) ////android终端或者uc浏览器
		{
			openURL(method, params);
		}
		else //ios也发送
		{
			openURL(method, params);
		}
	}
	
	/*
		微信6.5.6以上拉起第三方app
	 */
	function _wechatOpenApp(){
        WeixinJSBridge.invoke('launchApplication', {
            "schemeUrl":g_sSchema
        },function(res) {
            console.log(res);
            window.location.href = g_sDownload;   //否则跳下载
        });
    }

	/*
		拉起app
	*/
	function openApp(url,download_adtag,directdownload){
		var u = navigator.userAgent;
		if (typeof url == 'undefined' || url == ''){
			url = window.location.href;
		}
		if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) ////android终端或者uc浏览器
		{
			if (url.indexOf("http://") > -1 || url.indexOf("https://") > -1 ) {
				g_sSchema   = 'tencent://gamelife.app/open?url='+encodeURIComponent(url)+'&v='+(new Date()).getTime();   //拉起H5地址
			}else{
				g_sSchema   = 'tencent://gamelife.app/open?'+url+'&v='+(new Date()).getTime();   //拉起native地址
			}
		}
		else //ios也发送
		{
			if (url.indexOf("http://") > -1 || url.indexOf("https://") > -1 ) {
				g_sSchema   = 'GameLife://'+encodeURIComponent(url);
			}else{
				g_sSchema   = 'GameLife://?'+url;
			}
		}

	    //下载页改为APP官网首页
		g_sDownload = 'http://igame.qq.com/tip/download/index.php?_t=1';
		if(download_adtag){
			g_sDownload += '&adtag='+download_adtag;
		}
		directdownload = directdownload || false;
		if(directdownload){
			g_sDownload += '&view=download';
		}

		var wechatInfo = navigator.userAgent.match(/MicroMessenger\/([\d\.]+)/i);
		var version = wechatInfo && wechatInfo[1] &&parseInt(wechatInfo[1].replace(/\./g,'')) || 0;
		if( !wechatInfo || version < 656) {		//6.5.6 > 6.5.12
			//非微信环境直接scheme拉起
			//创建iframe，呼起app schema
			startTime = Date.now(); //标记呼起时间点
			div = document.createElement('div');
			div.style.visibility = 'hidden';
			div.innerHTML = "<iframe id=\"schema\" src=\"" + g_sSchema + "\" scrolling=\"no\" width=\"1\" height=\"1\"></iframe>";
			document.body.appendChild(div);
			//如果成功呼起，setTimeout不会立即执行
			tid = setTimeout(function(){
				//如果没有呼起，或者呼起后，用户主动返回，还是有可能走进这个逻辑
				var delta = Date.now() - startTime;  //然后判断回来的时间戳
				if(delta < 1000){  //如果不是我们规定的800ms，差太多，就认为是用户手动返回的, 不跳下载
					window.location.href = g_sDownload;   //否则跳下载
				}
			}, 800); 
			//注意：ios在safari进程挂起之后，js代码还会继续运行至少500ms，这里写800来保证起效。魔法数字，有待优化。
		} else if ( version > 656 ) {			//6.5.6
			//微信6.5.6版本以上用weixinjsbridge拉起
		    if (typeof WeixinJSBridge == "undefined") 
		    {
		        if (document.addEventListener) {
		            document.addEventListener('WeixinJSBridgeReady', _wechatOpenApp, false);
		        } else if (document.attachEvent) {
		            document.attachEvent('WeixinJSBridgeReady', _wechatOpenApp);
		            document.attachEvent('onWeixinJSBridgeReady', _wechatOpenApp);
		        }
		    } else {
		        _wechatOpenApp();
		    }
		}
	}


	/*
		拉起app打开h5页面，没有安装app就给h5页面带一个参数appinstalled=0
	*/
	function openAppNotDownload(url,download_adtag){
		var g_sSchema = '';
		var u = navigator.userAgent;
		if (typeof url == 'undefined' || url == ''){
			url = window.location.href;
		}
		if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) ////android终端或者uc浏览器
		{
			if (url.indexOf("http://") > -1 || url.indexOf("https://") > -1 ) {
				g_sSchema   = 'tencent://igame.app/open?url='+encodeURIComponent(url);   //拉起H5地址
			}else{
				g_sSchema   = 'tencent://igame.app/open?'+url;   //拉起native地址
			}
		}
		else //ios也发送
		{
			if (url.indexOf("http://") > -1 || url.indexOf("https://") > -1 ) {
				g_sSchema   = 'IGame1042198954://'+encodeURIComponent(url);
			}else{
				g_sSchema   = 'IGame1042198954://?'+url;
			}
		}

		//下载页改为APP官网首页
		var g_sDownload = '//igame.qq.com/tip/download/index.php';
		if(download_adtag){
			g_sDownload += '?adtag='+download_adtag;
		}
		//创建iframe，呼起app schema
		startTime = Date.now(); //标记呼起时间点
		checkTime = 1000;		//对于占用资源较大且呼起时需要跳转到具体APP内业务逻辑的情况，建议checkTime设置不小于2000ms，否则对于性能较差的Android机误判几率较高
		div = document.createElement('div');
		div.style.visibility = 'hidden';
		div.innerHTML = "<iframe id=\"schema\" src=\"" + g_sSchema + "\" scrolling=\"no\" width=\"1\" height=\"1\"></iframe>";
		document.body.appendChild(div);
		//如果成功呼起，setTimeout不会立即执行
		tid = setTimeout(function(){
			//如果没有呼起，或者呼起后，用户主动返回，还是有可能走进这个逻辑
			var delta = Date.now() - startTime;  //然后判断回来的时间戳
			if(delta < checkTime+100){  		 //如果不是我们规定的800ms，差太多，就认为是用户手动返回的, 不跳下载。"100"该值属于不稳定值，根据具体项目需要进行修改。
				//window.location.href = window.location.href;   //否则跳下载
				var oriurl = window.location.href;
				if(oriurl.indexOf('?')!=-1){
					oriurl = oriurl + '&appinstalled=0';
				}else{
					oriurl = oriurl + '?appinstalled=0';
				}
				window.location.href = oriurl;
			}
		}, checkTime); 
	}





	/*
	斗地主侧拉起app
	*/
	function ddzopenApp(url){
		var g_sSchema = '';
		var u = navigator.userAgent;
		if (typeof url == 'undefined' || url == ''){
			url = window.location.href;
		}
		if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) ////android终端或者uc浏览器
		{
			if (url.indexOf("http://") > -1 || url.indexOf("https://") > -1 ) {
				g_sSchema   = 'scheme://tencent://igame.app/open?url='+encodeURIComponent(url);   //拉起H5地址
			}else{
				//g_sSchema   = 'scheme://tencent://igame.app/open?'+url;   //拉起native地址（这个会引起选择app打开和浏览器打开的形式）
				//g_sSchema   = 'pkg://com.tencent.igame?'+url;				//这个会导致崩溃（已确认不支持带参数）
				g_sSchema   = 'pkg://com.tencent.igame';					//正确
				//g_sSchema   = 'scheme://igame.app/open?'+url;   			//无效
			}
		}
		else //ios也发送
		{
			if (url.indexOf("http://") > -1 || url.indexOf("https://") > -1 ) {
				g_sSchema   = 'IGame1042198954://'+encodeURIComponent(url);
			}else{
				g_sSchema   = 'IGame1042198954://?'+url;
			}
		}
		//创建iframe，呼起app schema
		startTime = Date.now(); //标记呼起时间点
		if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) ////android终端或者uc浏览器
		{
			confirm(g_sSchema);
		}
		else
		{
			div = document.createElement('div');
			div.style.visibility = 'hidden';
			div.innerHTML = "<iframe id=\"schema\" src=\"" + g_sSchema + "\" scrolling=\"no\" width=\"1\" height=\"1\"></iframe>";
			document.body.appendChild(div);
		}
	}
	
	/*
	调用方式
	igameapp.invoke("method", {xx: 'xx'}, 'callback');
	*/
    exports.invoke = invoke;
	exports.openApp = openApp;
	exports.ddzopenApp = ddzopenApp;
	exports.openAppNotDownload = openAppNotDownload;
});