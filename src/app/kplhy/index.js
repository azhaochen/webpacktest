

function SetCookie(name, value, minutes) {  
	var exp = new Date();  
	exp.setTime(exp.getTime() + minutes * 60 * 1000);	//过期时间
	document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString()+";path=/;";
}
var tmp='',cookiestr = 'wx_nick=%25C0%25EE%25BA%25D3; wx_head=http%3A%2F%2Fthirdwx.qlogo.cn%2Fmmopen%2Fvi_32%2FQ0j4TwGTfTKhDdSujdYUrOHuhJyichEDcm3LDVo228J2jJThgQkoHb1zDl4HicNnia5h4LmrCdIw9K8dXvlfCR3Aw%2F132; tiplogin_openid=onevZjnisu4TBy34dklGko0t_NS8; tiplogin_accesstoken=12_4x_mNfVRiCaaLRT2h0sLkHYqU_zVLDAn2BCouw47cS3myxa79xTRhb_qJF-ubauOHeWxvwvWsGv8iyyOknlo_g; route_white_flag=on; pgv_info=ssid=s180653812; ts_last=test.igame.qq.com/pvp/acts/a201807/kplhy.php; pgv_pvid=4057018436; ts_uid=3135398450; _accounttype=1';
var cookiearr = cookiestr.split(';');
for(var i in cookiearr){
	tmp = cookiearr[i].split('=');
	SetCookie(tmp[0],tmp[1],30);
}

//SetCookie('tiplogin_openid','42E0A169126BE972F67287F8CF940BF6',20)
//SetCookie('tiplogin_accesstoken','8A768537F890862BB3FCCA35F41543B1',20)
//SetCookie('tiplogin_refreshtoken','12_vGEtaNagk-NKI3NyPLw8kck9J0DtBRfWoDDfH77rt2GtcAK-AX52P9nSFusjFgJ7-RlYOPBk7U6xzMdlJskfFQ',20)




require('./css/kplstyle.css');		//或者，import '../css/zhaomu.css';
require('./css/mobileSelect.css');

const $ = require('comm/zepto.module.js');
const appdelegate = require('comm/pvpapp.js');
const share = require('comm/share.js');
const shopcfg = require('./shopcfg.js');
require('library/mobileSelect.js');

var mobileSelect_City = undefined;

//var nom = require('./GreeterNoModule.js');
//var m = require('./GreeterModule.js');


function openPop(id){
    document.querySelector('#'+id).style.display='block';
    document.querySelector('#layer').style.display='block';
}
function closePop(id){
    document.querySelector('#'+id).style.display='none';
    document.querySelector('#layer').style.display='none';
}
function popAlert(msg){
    document.querySelector('#alerttxt').innerText=msg;
    openPop('popalert');
}

share.initShare({
	title:'KPL会员商家折扣特权',
	desc:'到王者人生合作商家消费，尊享不低于6折的超值优惠，更多特权等你体验！',
	icon:""
});



$('.gotofuli').on('click',function(){
	if(share.env.isPvpApp){
		//closewebview
		appdelegate.invoke("closeWebViews",{'type':0}, "");
	}else{
		window.location.href = 'http://igame.qq.com/pvp/share/jump.php?op=99&closeflag=1&adtag=';
	}
});

$('.gotoapp').on('click',function(){
	if(share.env.isPvpApp){
		var params = {
			'action':0,
			'url':'local://GiftActivity',
			'extras':'{"tab":0}',
		}
		appdelegate.invoke("jumpUrl", params, "");
	}else{
		window.location.href = 'http://igame.qq.com/pvp/share/jump.php?closeflag=1&extras=0&adtag=';
	}
});

$('.gotohelper').on('click',function(){
	window.location.href = 'http://image.ttwz.qq.com/wzry/wzryzs_download_4009.htm';
});

$('.gotoshop').on('click',function(){
	if(share.env.isPvpApp){
		var params = {
			'action':0,
			'url':'local://MerchantActivityDetail',
			'extras':'{"id":"'+ merchantid +'"}',
		}
		appdelegate.invoke("jumpUrl", params, "");
	}else{
		window.location.href = 'http://igame.qq.com/pvp/share/jump.php?op=32&closeflag=1&extras='+merchantid;
	}
});


function showCityShops(prov, city){
	var shops = shopcfg.shops[prov][city];
	var html = '';
	for(var i in shops){
		html += '<li>\
					<img class="l-img" src="'+shops[i].logo+'" alt="">\
					<div class="kpl-msg">\
					  <p class="msg-text-1">'+shops[i].name+'</p>\
					  <p class="msg-text-2"><span>'+shops[i].discount+'起</span></p>\
					  <p class="msg-text-3">'+shops[i].address+'</p>\
					</div>\
					<p class="distance">'+''+'</p>\
				  </li>';
	}
	$('#shoplist').html(html);
}


function initView(){
	
    //api参考：https://blog.csdn.net/oulihong123/article/details/58327247
    //这里遇到兼容性问题，ios点击不了弹不出来，不知道之前页面有没这个问题D:\SVN\tip_proj\trunk\web\php\module\pvp\template\acts\a20170914GxIGame\select-college.tpl
    //奇怪的是，把vconsole=1带上后，就正常了
    mobileSelect_City = new MobileSelect({
        trigger: '#select-citys',
        title: '',
        wheels: [
                    {data:shopcfg.tranformseldata(shopcfg.shops)}
                ],
        position:[0, 0],
        callback:function(indexArr, data){
            showCityShops(data[0].id, data[1].id);
            console.log(indexArr,data);
        } 
    });
	
    //$("#select-citys").trigger('click');  //弹窗select
    //初始化
    $("#select-citys").text('广东 深圳');
    showCityShops(44,3);

    $('.select-zone').on('click',function(){
        $(".mobileSelect").addClass("mobileSelect-show");
        $(".mobileSelect").show();
        return false;
    });
	
}


$(document).ready(function(){
	initView();
});