var app = angular.module('CountryBudgetApp', [
  'ngRoute',
  'ui.bootstrap',
  'ngAnimate',
  'restangular',
  'ngStorage',
  'smart-table',
  'ngMessages'
]);

app.config([
  '$routeProvider',
  'RestangularProvider',
  function ($routeProvider,
            restangular_provider) {
    // Route Settings
    $routeProvider
      .when('/', {
        templateUrl: 'static/views/home.html',
        controller: 'HomeController'
      })
      .when('/home', {
        templateUrl: 'static/views/home.html',
        controller: 'HomeController'
      })
      .otherwise({
        redirectTo: '/'
      });

    // Restangular Settings
    //restangular_provider.setBaseUrl('http://api.countrybudget.lan');
    restangular_provider.setBaseUrl('http://localhost:3000');
  }
]);
