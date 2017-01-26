/*
* @Author: Administrator
* @Date:   2017-01-26 01:23:57
* @Last Modified by:   Administrator
* @Last Modified time: 2017-01-26 01:24:53
*/

'use strict';
angular.module('Search', [
          'ngRoute'
      ]).controller('searchController',[
          '$scope',
          '$route',
          function($scope,$route) {
          	$scope.keyword = '';
          	$scope.search = function() {
          		if($scope.keyword=='') return;
          		$route.updateParams({
          			category:"search",
          			q:$scope.keyword
          		});
          	}
          }]);