/*
* @Author: Administrator
* @Date:   2017-01-26 01:23:57
* @Last Modified by:   Administrator
* @Last Modified time: 2017-01-26 15:57:12
*/

'use strict';
angular.module('Search', []).controller('searchController',[
          '$scope',
          '$route',
          'AppConfig',
          function($scope,$route,AppConfig) {
          	$scope.keyword = '';
          }]);