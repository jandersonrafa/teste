var mainApp = angular.module('mainApp');

// HOME
mainApp.directive('home', function ($interval) {
  
  const PATH_DIRECTIVES = 'directives/'
  return {
    restrict: 'E',
    templateUrl: PATH_DIRECTIVES + 'home/home.html',
    controller: 'homeController'
  }
});

