var app = angular.module('CountryBudgetApp', [
   'restangular',
   'ngRoute',
   'ngStorage'
]);

app.config([
   '$routeProvider',
   'RestangularProvider',
   function ($routeProvider,
             restangular_provider) {
      // Route Settings
      $routeProvider
         .when('/', {
            templateUrl: 'public/views/home.html',
            controller: 'HomeController'
         })
         .when('/home', {
            templateUrl: 'public/views/home.html',
            controller: 'HomeController'
         })
         .when('/login', {
            templateUrl: 'public/views/login.html',
            controller: 'LoginController'
         })
         .when('/register', {
            templateUrl: 'public/views/register.html',
            controller: 'RegisterController'
         })
         //.when('/allusers', {
         //   templateUrl: 'secure/views/allusers.html',
         //   controller: 'AllUsersController',
         //   resolve: {
         //      'auth': ['AuthenticationService',
         //         function (authentication_service) {
         //            return authentication_service.checkAccess();
         //         }]
         //   }
         //})
         .when('/group', {
            templateUrl: 'secure/views/group.html',
            controller: 'GroupController',
            resolve: {
               'auth': ['AuthenticationService',
                  function (authentication_service) {
                     return authentication_service.checkAccess();
                  }]
            }
         })
         .when('/individual', {
            templateUrl: 'secure/views/individual.html',
            controller: 'IndividualController',
            resolve: {
               'auth': ['AuthenticationService',
                  function (authentication_service) {
                     return authentication_service.checkAccess();
                  }]
            }
         })
         .when('/settings', {
            templateUrl: 'secure/views/settings.html',
            controller: 'SettingsController',
            resolve: {
               'auth': ['AuthenticationService',
                  function (authentication_service) {
                     return authentication_service.checkAccess();
                  }]
            }
         })
         .otherwise({
            redirectTo: '/'
         });

      // Restangular Settings
      restangular_provider.setBaseUrl('http://api.countrybudget.lan');
      restangular_provider.setRequestSuffix('?XDEBUG_SESSION_START=PHPSTORM'); // works

      //RestangularProvider.setDefaultHttpFields({
      //   'withCredentials': true
      //});
      //RestangularProvider.setDefaultHeaders({
      //   'Content-Type': 'application/json',
      //   'Allow-Control-Allow-Origin': 'http://dev.countrybudget.lan',
      //   'Allow-Control-Allow-Origin': '*',
      //   'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, OPTIONS',
      //   'Access-Control-Allow-Headers': 'origin, x-requested-with, content-type',
      //   'Access-Control-Allow-Credentials': 'true'
      //});
   }
]);

app.run([
   '$rootScope',
   '$location',
   function (root_scope,
             location) {
      root_scope.$on('$routeChangeError',
         function (event, current, previous, rejection) {
            if (rejection === 'login_error') {
               console.log("You must log in.");
               location.path("/login");
            }
         }
      );

      root_scope.$on('$locationChangeStart',
         function (event, next, current) {
            console.log("locationChangeStart");
         }
      );
   }
]);
