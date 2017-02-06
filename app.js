      angular.module('Movie', [
          'ngRoute',
          'Search',
          'Movie.detail',
          'Movie.list'
      ]).
      constant('AppConfig', {
          listUrl: "https://api.douban.com/v2/movie/",
          detailUrl: "https://api.douban.com/v2/movie/subject/",
          searchAnchor:"#/search/0?q=",
          detail:"#/subject/",
          pageSize: 10
      }).
      config(['$routeProvider', function($routeProvider) {
              $routeProvider.otherwise({ redirectTo: '/in_theaters/0' });
          }])
          .controller('navController', [
              '$scope',
              '$location',
              function($scope, $location) {
              	$scope.$location = $location;
                  $scope.$watch('$location.path()', function(now) {
                      $scope.activeItem = now.slice(now.indexOf('') + 1,
                       now.lastIndexOf('/'));
                  });   
              }
          ]);
