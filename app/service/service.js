/*
 * @Author: Administrator
 * @Date:   2017-01-25 19:44:31
 * @Last Modified by:   Living Jiang
 * @Last Modified time: 2017-01-26 18:30:15
 */

'use strict';
angular.module("Movie.Service", [])
    .service("service", ["$window", "$document", function($window, $document) {
        this.url = "https://api.douban.com/v2/movie";
        this.jsonp = function(url, data, callback) {
            // 处理data数据
            var concatStr = url.indexOf("?") >= 0 ? "&" : "?";
            for (var k in data) {
                concatStr += k + "=" + data[k] + "&";
            }
            // 生成随机函数名callback
            var fnName = "jsonp_fn_" + $window.Math.random().toString().replace(".", "");
            // 请求的最终地址
            var src = url + concatStr + "callback=" + fnName;
            // window 上绑定callback函数
            $window[fnName] = function(data) {
                callback(data);
                $document[0].body.removeChild(newStript);
            }
            var newStript = $document[0].createElement('script');
            newStript.src = src;
            $document[0].body.appendChild(newStript);
        }
        this.getPage = function(config) {
            return function(cur) {
                var arr = [];
                var total = config.totalPage;
                var showCount = config.showPageCount;
                var start = cur - parseInt(showCount / 2);
                start = start <= 0 ? 1 : start;
                var end = start + showCount;
                end = end > total ? total + 1 : end;
                start = end - showCount;
                start = start <= 0 ? 1 : start;
                for (var i = start; i < end; i++) {
                    arr.push(i);
                }
                return arr;
            }
        }
    }]);
