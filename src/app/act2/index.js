

	var dayjs = require('dayjs');		//node modules
	console.log('from act2 w index.js:',dayjs().format('{YYYY} MM-DDTHH:mm:ss SSS [Z] A'));	

	var loginjs = require('comm/login.js');
	var jqcookie = require('library/jquery.cookie.js');
	const $ = require("jquery");
	var qrcode  = require('library/qrcode.js');
	
    var ma = location.href.match(/adtag=(.*?)(&|$)/);
    var adtag = '';
    if(ma && ma[1]){
        adtag = ma[1];
    }
    if(adtag.length>25 || adtag.match(/[^0-9a-zA-Z_\-]/g)!=null){
        adtag = '';
    }

    window.gotoApp = function(){
        window.location.href = 'http://igame.qq.com/pvp/share/jump.php?op=99&closeflag=1&adtag='+adtag;
    }

    //福利券商城
    window.gotoFuli = function(){
        window.location.href = "http://igame.qq.com/pvp/share/jump.php?op=12&closeflag=1&adtag="+adtag;
    }

    //地点擂台
    window.gotoArena = function(){
        window.location.href = "http://igame.qq.com/pvp/share/jump.php?op=10&closeflag=1&extras2=9&adtag="+adtag;
    }

    //地标擂台
    window.gotoLandArena = function(){
        window.location.href = "http://igame.qq.com/pvp/share/jump.php?op=11&closeflag=1&adtag="+adtag;
    };
	
	$('body').ready(function(){
		alert('ready');
	});