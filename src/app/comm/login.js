
	var dayjs = require('dayjs');		//node modules
	var jqcookie = require('library/jquery.cookie.js');


$.cookie('the_cookie','the_value',{
    expires:7,  
    path:'/',
    domain:'jquery.com',
    secure:true
});

console.log($.cookie('the_cookie'));

var dayjs = require('dayjs');		//node modules
console.log('from loginjs: ',dayjs().format('{YYYY} MM-DDTHH:mm:ss SSS [Z] A'));	








