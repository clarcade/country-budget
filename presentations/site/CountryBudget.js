var app = angular.module('CountryBudgetApp', ['restangular', 'ngRoute']);

app.config([
   '$routeProvider',
   'RestangularProvider',
   function ($routeProvider,
             RestangularProvider) {
      // Route Settings
      $routeProvider
         .when('/', {
            templateUrl: 'views/home.html',
            controller: 'HomeController'
         })
         .when('/group', {
            templateUrl: 'views/group.html',
            controller: 'GroupController'
         })
         .when('/individual', {
            templateUrl: 'views/individual.html',
            controller: 'IndividualController'
         })
         .when('/settings', {
            templateUrl: 'views/settings.html',
            controller: 'SettingsController'
         })
         .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginController'
         })
         .when('/register', {
            templateUrl: 'views/register.html',
            controller: 'RegisterController'
         })
         .otherwise({
            redirectTo: '/'
         });

      // Restangular Settings
      RestangularProvider.setBaseUrl('http://api.countrybudget.lan');
      //RestangularProvider.setRequestSuffix('?XDEBUG_SESSION_START=PHPSTORM'); // works
   }
]);
