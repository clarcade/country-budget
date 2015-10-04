var app = angular.module('CountryBudgetApp', [
   'restangular',
   'ngRoute',
   'ngStorage',
   'smart-table'
]);

app.config([
   '$routeProvider',
   'RestangularProvider',
   function ($routeProvider,
             restangular_provider) {
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
         .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginController'
         })
         .when('/register', {
            templateUrl: 'views/register.html',
            controller: 'RegisterController'
         })
         .when('/group', {
            templateUrl: 'views/group.html',
            controller: 'GroupController',
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
