/*
* @Author: Administrator
* @Date:   2017-01-25 19:44:31
* @Last Modified by:   Administrator
* @Last Modified time: 2017-01-26 11:38:38
*/

'use strict';
angular.module("Movie.Service",[])
.service("service",["$window","$document",function($window,$document) {
	this.url = "https://api.douban.com/v2/movie";
	this.jsonp = function (url,data,callback) {
      	// 处理data数据
      	var concatStr = url.indexOf("?")>=0?"&":"?";
      	for(var k in data) {
      		concatStr += k + "=" + data[k] + "&";
      	}
      	// 生成随机函数名callback
      	var fnName = "jsonp_fn_" + $window.Math.random().toString().replace(".","");
      	// 请求的最终地址
      	var src = url + concatStr +"callback=" + fnName;
      	// window 上绑定callback函数
      	$window[fnName] = function(data) {
      		callback(data);
      		$document[0].body.removeChild(newStript);
      	}
      	var newStript = $document[0].createElement('script');
      	newStript.src = src;
      	$document[0].body.appendChild(newStript);
      }
}]);


