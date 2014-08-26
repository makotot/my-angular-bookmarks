var bookmarkApp = angular.module('bookmarkApp', []);

// handlebars template tag used with Assemble uses {{}} that does not provide method changing template tags.
bookmarkApp.config(function ($interpolateProvider) {
  $interpolateProvider
    .startSymbol('<%')
    .endSymbol('%>');
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
