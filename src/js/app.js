var bookmarkApp = angular.module('bookmarkApp', ['ngRoute']);

// handlebars template tag used with Assemble uses {{}} that does not provide method changing template tags.
bookmarkApp.config(function ($interpolateProvider) {
  $interpolateProvider
    .startSymbol('<%')
    .endSymbol('%>');
});

bookmarkApp.config(function ($httpProvider) {
  $httpProvider.interceptors.push(function ($q, $rootScope) {

    return {
      'request': function (config) {
        $rootScope.$broadcast('loading-started');

        return config || $q.when(config);
      },
      'response': function (response) {
        $rootScope.$broadcast('loading-complete');

        return response || $q.when(response);
      }
    };
  });
});

bookmarkApp.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/bookmarks.html',
      controller: 'bookmarkController'
    });
});

bookmarkApp.controller('bookmarkController', function ($scope) {
});

bookmarkApp.controller('BookmarkCtrl', [
  '$scope',
  '$http',
  function ($scope, $http) {
    $http({
      method: 'GET',
      url: './json/bookmark.json'
    })
    .success(function (data, status, headers, config) {
      $scope.bookmarks = data;
      $scope.bookmarkCount = data.length;
    })
    .error(function (data, status, headers, config) {
    });
  }
]);

bookmarkApp.directive('loading', function () {
  return {
    restrict: 'A',
    template: '<div class="loading"></div>',
    link: function (scope, element, attrs) {
      scope.$on('loading-start', function (e) {
        element.css({'display': ''});
      });
      scope.$on('loading-complete', function (e) {
        element.css({'display': 'none'});
      });
    }
  };
});
