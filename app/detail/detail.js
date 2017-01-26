'use strict';
// https://api.douban.com/v2/movie/in_theaters
// https://api.douban.com/v2/movie/search?q=张艺谋
// https://api.douban.com/v2/movie/subject/1764796
angular.module('Movie.detail', ['ngRoute', "Movie.Service"])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/subject/:id', {
        templateUrl: 'detail/detail.html',
        controller: 'detailController'
    });
}])

.controller('detailController', [
    '$scope',
    'service',
    'AppConfig',
    '$route',
    '$routeParams',
    function($scope, service, AppConfig,$route,$routeParams) {
    	$scope.searchSimilar = AppConfig.searchAnchor;
       service.jsonp(AppConfig.detailUrl + $routeParams.id, {},
            function(data) {
                $scope.datas = data;
                for(var k in data.genres) {
                	$scope.searchSimilar += data.genres[k]+" ";
                }
                
                $scope.$apply();
            })
    }
]);
