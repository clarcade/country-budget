var app = angular.module('CountryBudgetApp', [
  'ngRoute',
  'ui.bootstrap',
  'ngAnimate'
]);

app.config([
  '$routeProvider',
  function ($routeProvider) {
    // Route Settings
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeController'
      })
      .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'HomeController'
      })
      .otherwise({
        redirectTo: '/'
      });
  }
]);
