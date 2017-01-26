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
    function($scope, service, AppConfig, $route, $routeParams) {

        $scope.datas = {
            title: "loading...",
            start: 0
        };
        //分页展示的页数
        $scope.showPageCount = 5;
        //请求数据的总条数
        $scope.total = 0;
        //当前页码数
        $scope.curPage = 0;
        // 每页展示电影数据的条数
        $scope.showCount = AppConfig.pageSize;
        // 总页数
        $scope.page = Math.ceil($scope.total / $scope.showCount);
        $scope.isLoading = true; // 是否为加载状态
        $scope.detail = AppConfig.detail; //进入具体电影页面的route配置

        $scope.changePage = function(page) {
                if (page < 0) return;
                if (page >= $scope.page) {
                    return;
                }
                $route.updateParams({ page: page });
            }
            // https://api.douban.com/v2/movie/search?q=张艺谋
        service.jsonp(AppConfig.listUrl + $routeParams.category, {
                count: $scope.showCount,
                start: $routeParams.page * $scope.showCount,
                q: $routeParams.q
            },
            function(data) {
                // 每条电影的数据
                $scope.datas = data;
                $scope.isLoading = false;
                $scope.total = data.total;
                $scope.page = Math.ceil($scope.total / $scope.showCount);
                $scope.curPage = parseInt($routeParams.page) + 1;
                $scope.curPage = $scope.curPage > $scope.page ?
                    $scope.page : $scope.curPage;
                $scope.showCount = data.count;

                //分页部分
                $scope.pageConfig = { totalPage: $scope.page,showPageCount:$scope.showPageCount};
                $scope.getPage = service.getPage($scope.pageConfig);
                $scope.pageArr = $scope.getPage($scope.curPage);
                
                $scope.$apply();
            });
    }
]);
