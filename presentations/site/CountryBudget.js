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
         .when('/groupactualincome', {
            templateUrl: 'secure/views/groupactualincome.html',
            controller: 'GroupActualIncomeController',
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
            //console.log("locationChangeStart");
         }
      );
   }
]);
