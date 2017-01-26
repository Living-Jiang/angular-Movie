'use strict';
// https://api.douban.com/v2/movie/in_theaters
// https://api.douban.com/v2/movie/search?q=张艺谋
// https://api.douban.com/v2/movie/subject/1764796
angular.module('Movie.list', ['ngRoute', "Movie.Service"])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/:category/:page', {
        templateUrl: 'list/list.html',
        controller: 'hotController'
    });
}])

.controller('hotController', [
    '$scope',
    'service',
    'AppConfig',
    '$route',
    '$routeParams',
    function($scope, service, AppConfig,$route,$routeParams) {
        $scope.datas = {
            title: "loading...",
            start: 0
        };
        $scope.total = 0;
        $scope.curPage = 0;
        $scope.showCount = AppConfig.pageSize;
        $scope.page = Math.ceil($scope.total / $scope.showCount);
        $scope.isLoading = true;
        $scope.detail = AppConfig.detail;
        $scope.changePage = function(page) {
            if (page < 0) return;
            if (page >= $scope.page) {
                 return;
            }
            $route.updateParams({page:page});
        }
        // https://api.douban.com/v2/movie/search?q=张艺谋
        service.jsonp(AppConfig.listUrl + $routeParams.category, {
                count: $scope.showCount,
                start: $routeParams.page*$scope.showCount,
                q:$routeParams.q
            },
            function(data) {
                $scope.datas = data;
                $scope.isLoading = false;
                $scope.total = data.total;
                $scope.page = Math.ceil($scope.total / $scope.showCount);
                $scope.curPage = parseInt($routeParams.page) + 1;
                $scope.curPage = $scope.curPage > $scope.page ?
                					 $scope.page:$scope.curPage;
                $scope.showCount = data.count;
                $scope.$apply();
            })
    }
]);
