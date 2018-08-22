/*
	js����ģ��  azhaochen 2017.05.20
	֧�֣�
		QQ���� qq���ѡ�qq�ռ䡢weixin���ѡ�����Ȧ
		weixin���� qq���ѡ�qq�ռ䡢weixin���ѡ�����Ȧ
		�����ص�
	ǰ�᣺
		��������ģ���װ��seajs��ϸ΢�����ݣ���Ҫ�ⲿ����
    		<script src="https://open.mobile.qq.com/sdk/qqapi.js?_bid=152"></script>
    		<script src="https://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
    	������ seajs.use ǰ���� define.cmd=true;
*/

;define(function(require, exports,module){
	var mqq   = null;
	var wx    = null;
	var $ 		= require('comm/zepto.module.js');
	var pvpapp 	= require('comm/pvpapp.js');
	var tipapp 	= require('comm/tipapp.js');

	var shareObject = {};
	var env = {};
	env.ua = navigator.userAgent.toLowerCase();
	env.isWeixin  = env.ua.indexOf('micromessenger') != -1;
	env.isQQ	  = env.ua.indexOf(' qq/') != -1;
	env.isPvpApp  = env.ua.indexOf(' igameapp/') != -1;
	env.isTipApp  = env.ua.indexOf(' gamelife/') != -1;
	env.isAndroid = env.ua.indexOf('android') != -1;
	env.isIos 	  = (env.ua.indexOf('iphone') != -1) || (env.ua.indexOf('ipad') != -1);
	env.isMsdk = env.ua.indexOf(' msdk/') != -1;
	env.isGHelper = env.ua.indexOf('gamehelper') != -1;

	env.version   = '';
	var wechatInfo  = env.ua.match(/micromessenger\/([\d\.]+)/i) ;
	var qqInfo 		= env.ua.match(/ qq\/([\d\.]+)/i) ;
	var pvpInfo 		= env.ua.match(/ igameapp\/([\d\.]+)/i) ;
	var tipInfo 		= env.ua.match(/ gamelife\/([\d\.]+)/i) ;
	if(wechatInfo && wechatInfo[1]) {
		env.version = wechatInfo[1];
	}
	if(qqInfo && qqInfo[1]) {
		env.version = qqInfo[1];
	}
	if(pvpInfo && pvpInfo[1]) {
		env.version = pvpInfo[1];
	}
	if(tipInfo && tipInfo[1]) {
		env.version = tipInfo[1];
	}
	console.log(env);

	var shareUiObj = {};
	shareUiObj.initCommShareUI = function(callback){
    	var styleNode=document.createElement("style");  
        styleNode.type="text/css";  
        styleNode.innerHTML = '.share-dialog-login{ padding:30px 20px; position:fixed; left:0; right:0; bottom:0;background:#222222; z-index:2001}\
						.share-choose-login {width:100%;margin:20px auto 0;text-align: center;font-size:0;}\
						.share-choose-login a {display:inline-block;vertical-align:middle;width:25%;}\
						.share-type{ width:45px; height:45px; display:block; margin:0 auto;  }\
						.share-type-1{background:url(//game.gtimg.cn/images/sy/2016/miniweb/ingame/commsrc/shareicon.png) no-repeat;background-size:auto 100%;}\
						.share-type-2{background:url(//game.gtimg.cn/images/sy/2016/miniweb/ingame/commsrc/shareicon.png) -45px 0 no-repeat;background-size:auto 100%;}\
						.share-type-3{background:url(//game.gtimg.cn/images/sy/2016/miniweb/ingame/commsrc/shareicon.png) -90px 0 no-repeat;background-size:auto 100%;}\
						.share-type-4{background:url(//game.gtimg.cn/images/sy/2016/miniweb/ingame/commsrc/shareicon.png) -135px 0 no-repeat;background-size:auto 100%;}\
						.share-public-text {display: block;color: #aaa;font-size:14px;line-height:20px;padding-top:6px;}\
						.share-dialog-close{ width:25px; height:25px; display:block; position:absolute; right:10px; top:10px; background:url(//game.gtimg.cn/images/user/cp/a20170922tipYYB/close-b.png) center center no-repeat; background-size:15px 15px; text-indent:-1000em; overflow:hidden}\
						.share-layer{ width:100%; height:100%; position:fixed; left:0; top:0; z-index:2000; background:rgba(0,0,0,0.5)}'; 
        document.getElementsByTagName("head")[0].appendChild( styleNode );

        var shareNode = document.createElement("div");
        shareNode.id="div_share_ui";
        shareNode.style.display='none';
        shareNode.innerHTML= '<div class="share-dialog-login">\
							    <a href="javascript:;" class="share-dialog-close" onclick="document.getElementById(\'div_share_ui\').style.display=\'none\';">�ر�</a>\
							    <div class="share-choose-login">\
							      <a href="javascript:;" onclick="javascript:'+callback+'(2);">\
							        <span class="share-type share-type-1"></span>\
							        <span class="share-public-text">����Ȧ</span>\
							      </a>\
							      <a href="javascript:;" onclick="javascript:'+callback+'(1);">\
							        <span class="share-type share-type-2"></span>\
							        <span class="share-public-text">΢�ź���</span>\
							      </a>\
							      <a href="javascript:;" onclick="javascript:'+callback+'(3);">\
							        <span class="share-type share-type-3"></span>\
							        <span class="share-public-text">QQ����</span>\
							      </a>\
							      <a href="javascript:;" onclick="javascript:'+callback+'(4);">\
							        <span class="share-type share-type-4"></span>\
							        <span class="share-public-text">QQ�ռ�</span>\
							      </a>\
							    </div>\
							  </div>\
							  <div class="share-layer"></div>';
	    document.getElementsByTagName('body')[0].appendChild(shareNode);
    }

    shareUiObj.showCommShareUI = function(){
    	document.getElementById('div_share_ui').style.display='block';
    }

    function openShareUI(){
		if(shareUiObj && shareUiObj.openShareUI){
			shareUiObj.openShareUI();
		}
	}

	/*
		obj:{title:'����',desc:'����',icon:'ͼ��',link:'��ַ',callback:''}
     */
    function initShare(obj) {
    	if(typeof obj == 'undefined')	obj={};
    	obj.title = obj.title || document.getElementsByTagName('title')[0].innerText;
    	obj.desc  = obj.desc  || obj.title;
    	obj.link  = obj.link  || window.location.href;
    	obj.icon  = obj.icon  || (env.isPvpApp?"http://ossweb-img.qq.com/images/pmd/igameapp/logo/log_igame_3.0.png":"http://ossweb-img.qq.com/images/pmd/igameapp/logo/logo_3.0.png");
    	shareObject = obj;

    	if(env.isMsdk){
    		initMsdkShare();
    	}else if(env.isGHelper){
    		initGHelperShare();
    	}else if(env.isQQ){
    		//require.async('https://open.mobile.qq.com/sdk/qqapi.js?_bid=152',function(obj){ //�����ļ���test02.js
		    //  mqq = obj;
		    //  initQQShare();
		    //});
			mqq = require('library/qqapi.js');
			initQQShare();
    	}else if(env.isWeixin){
    		//wx = require('https://res.wx.qq.com/open/js/jweixin-1.0.0.js');
			//wx = require('library/jweixin-1.3.2.js');
			wx = require('weixin-js-sdk');	//npm����֧��commonjs��jweixin��https://www.npmjs.com/package/weixin-js-sdk
    		initWeixinShare();
    	}else if(env.isPvpApp){
    		initPvpShare();
    	}else if(env.isTipApp){
    		initTipShare();
    	}
    }

    function initMsdkShare(){
    	//require('https://img.ssl.msdk.qq.com/wiki/msdkJsAdapter.js');
		require('library/msdkJsAdapter.js');
    	shareUiObj.initCommShareUI("msdkShareDelegate");

    	shareUiObj.openShareUI = function(){
			shareUiObj.showCommShareUI();
		}

		/*
			type��1(΢��),2(����Ȧ),3(QQ),4(QQ �ռ�)
		 */
		window.msdkShareDelegate = function(type){
			type = type || 0;
			var typeArr = {
				"1":'{"MsdkMethod":"WGSendToWeiXinWithUrl","scene":"0","title":"'+shareObject.title+'","desc":"'+shareObject.desc+'","url":"'+shareObject.link+'","mediaTagName":"MSG_INVITE","messageExt":"'+shareObject.title+'"}',
				"2":'{"MsdkMethod":"WGSendToWeiXinWithUrl","scene":"1","title":"'+shareObject.title+'","desc":"'+shareObject.desc+'","url":"'+shareObject.link+'","mediaTagName":"MSG_INVITE","messageExt":"'+shareObject.title+'"}',
				"3":'{"MsdkMethod":"WGSendToQQ","scene":"2","title":"'+shareObject.title+'","desc":"'+shareObject.desc+'","url":"'+shareObject.link+'"}',
				"4":'{"MsdkMethod":"WGSendToQQ","scene":"1","title":"'+shareObject.title+'","desc":"'+shareObject.desc+'","url":"'+shareObject.link+'"}'
			};

			if(typeof typeArr[type] == "undefined"){
				return false;
			}

			var param = typeArr[type];

			console.log(param);
			msdkShare(param);
		}
    }

    function initGHelperShare(){
    	if(typeof GameHelper == "undefined"){
    		if (document.addEventListener){
				document.addEventListener('GameHelperReady', onGameHelperReady, false);
			}else{
				onGameHelperReady();
			}
    	}else{
    		onGameHelperReady();
    	}
    	

		function onGameHelperReady(){
			shareUiObj.openShareUI = function(){
				GameHelper.shareWebPage(shareObject.title,shareObject.desc,
					shareObject.icon,shareObject.link,null);
			}
		}
    }

    function initQQShare(){
		mqq && mqq.ui && mqq.ui.setOnShareHandler(	//http://mqq.oa.com/api.html#js-mqq-core
			function (type) {
			if (type == 0 || type == 1 || type == 2 || type == 3) {
				var param = {
					title: shareObject.title,
					desc: shareObject.desc,
					share_type: type,
					share_url: shareObject.link,
					image_url: shareObject.icon,
					back: true,
					uinType: 0
				};
				var callback = function (result) {
					shareObject.callback && shareObject.callback();	//alert(result.retCode);
				};
				mqq.ui.shareMessage(param, callback);
			}
		});
    }

    function initWeixinShare(){
    	$.ajax({
    		url:'/pvp/share/getsharecfg.php',
    		dataType:'json',
    		success: function(data){
    			if(data.r==0){
					wx.config({
					    debug: false,
					    appId: data.wxappid,
					    timestamp: data.timestamp,
					    nonceStr: data.noncestr,
					    signature: data.signature,
					    jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareQZone']
					});
			    	var tmp = {
						'title': shareObject.title,
						'desc': shareObject.desc,
						'link': shareObject.link,
						'imgUrl': shareObject.icon,
						'type': '',							// ��������,music��video��link������Ĭ��Ϊlink
						'dataUrl': '', 						// ���type��music��video����Ҫ�ṩ�������ӣ�Ĭ��Ϊ��
						success: function () {
							shareObject.callback && shareObject.callback();
						},
						cancel: function () {}
			    	};
					wx.ready(function(){
					    wx.onMenuShareTimeline(tmp);
					    wx.onMenuShareAppMessage(tmp);
					    wx.onMenuShareQQ(tmp);
					    wx.onMenuShareQZone(tmp);
					})
    			}else{
					if(typeof data.url!='undefined'){
						//window.location.href = data.url;
					}
				}
    		}
    	});
    }

	//��������app����
	function initPvpShare(){
		var appShareParams = {
		    "type":"1",
		    "share_url":shareObject.link,
		    "image_url":shareObject.icon,
		    "title":shareObject.title,
		    "desc":shareObject.desc
		};
		window.shareCallBack = function(ret){	//'{"ret":0,"source_type":2}'
			shareObject.callback && shareObject.callback();
		}
		window.setTitleButtonsCallback = function(){
		    pvpapp.invoke("openShare", appShareParams, "shareCallBack");
		}
		var params = {
		    "title":document.getElementsByTagName('title')[0].innerText,
		    "button":'����'
		};
		pvpapp.invoke("setTitleButtons", params, "setTitleButtonsCallback");
	}

	//��Ϸ����app����
	function initTipShare(){
		var appShareParams = {
		    "type":"1",
		    "share_url":shareObject.link,
		    "image_url":shareObject.icon,
		    "title":shareObject.title,
		    "desc":shareObject.desc
		};
		window.shareCallBack = function(ret){	//'{"ret":0,"source_type":2}'
			shareObject.callback && shareObject.callback();
		}
		window.setTitleButtonsCallback = function(){
		    tipapp.invoke("openShare", appShareParams, "shareCallBack");
		}
		var params = {
		    "title":document.getElementsByTagName('title')[0].innerText,
		    "button":'����'
		};
		tipapp.invoke("setTitleButtons", params, "setTitleButtonsCallback");
	}

    exports.initShare = initShare;
    exports.env = env;
    exports.openShareUI = openShareUI;
});