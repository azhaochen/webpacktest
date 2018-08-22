
// msdk javascript封装代码
var uniqueId = 1
var msdkiOSHandler

function log(message, data) {
    var log = document.getElementById('log')
    var el = document.createElement('div')
    el.className = 'logLine'
    el.innerHTML = uniqueId++ + '. ' + message + ':<br/>' + JSON.stringify(data)
    if (log && log.children && log.children.length) {
        log.insertBefore(el, log.children[0]);
    } else if (log) {
        log.appendChild(el);
    } else {
	//
    }
}

window.onerror = function(err) {
    log('window.onerror: ' + err)
}

function connectWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
        callback(WebViewJavascriptBridge)
    } else {
        document.addEventListener('WebViewJavascriptBridgeReady', function() {
            callback(WebViewJavascriptBridge)
        }, false)
    }
}

connectWebViewJavascriptBridge(function(bridge) {
    bridge.init(function(message, responseCallback) {
        log('JS got a message', message)
        var data = {
            'Javascript Responds': 'Wee!'
        }
        log('JS responding with', data)
        responseCallback(data)
    })
    msdkiOSHandler = bridge.callHandler
})
// ---Js接口 START---
function isiOS() {
    var agent = navigator.userAgent
    return !!agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
}

function msdkShare(data) {
    if (isiOS()) {
        msdkiOSHandler('OpenShare', data, null)
    } else {
        prompt(data)
    }
}

function msdkCall(tag,data) {
    if (isiOS()) {
        msdkiOSHandler(tag, data, null)
    } else {
        prompt(data)
    }
}

function msdkCloseWebview() {
    if (isiOS()) {
        msdkiOSHandler('CloseMSDKWebview', data, null);
    } else {
        var data = '{"MsdkMethod":"CloseMSDKWebview"}'
        prompt(data)
    }
}

function msdkSetWebviewOrientaton(orientation) {
    var data = '{"MsdkMethod":"WGSetWebviewOrientation","orientation":"'+orientation+'"}';
    if (isiOS()) {
        msdkiOSHandler('WGSetWebviewOrientation', data, null)
    } else {
        prompt(data)
    }
}
// ---Js接口 END---
