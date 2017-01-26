/*
 * @Author: Administrator
 * @Date:   2017-01-25 19:44:31
 * @Last Modified by:   Living Jiang
 * @Last Modified time: 2017-01-26 21:04:24
 */

'use strict';
angular.module("Movie.Service", [])
    .service("service", ["$window", "$document", function($window, $document) {
        // 缓存
        this.cache = {};
        var that = this;
        this.jsonp = function(url, data, callback) {
            // 处理data数据
            var concatStr = url.indexOf("?") >= 0 ? "&" : "?";
            for (var k in data) {
                concatStr += k + "=" + data[k] + "&";
            }
            // 存进缓存中的标识
            var cacheSrc = url + concatStr;
            // 生成随机函数名callback
            var fnName = "jsonp_fn_" + $window.Math.random().toString().replace(".", "");
            // 判断缓存中是否存在
            if (cacheSrc in that.cache) {
            // 传入第二个参数true说明没有发送请求，是从缓存中取出数据
                  callback(that.cache[cacheSrc],true);
            } else {
                // 请求的最终地址
                var src = cacheSrc + "callback=" + fnName;
                // window 上绑定callback函数
                $window[fnName] = function(data) {
                    callback(data);
                    // 将数据存入缓存中
                    that.cache[cacheSrc] = data;
                    $document[0].body.removeChild(newStript);
                }
                var newStript = $document[0].createElement('script');
                newStript.src = src;
                $document[0].body.appendChild(newStript);
            }
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
