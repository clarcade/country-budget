var app = angular.module('CountryBudgetApp', ['restangular', 'ngRoute']);

app.config([
    '$routeProvider',
    'RestangularProvider',
    function($routeProvider,
             RestangularProvider) {
        // Route Settings
        $routeProvider
            .when('/mortgage', {
                templateUrl: 'views/mortgage.html',
                controller: 'MortgageController'
            })
            .otherwise({
                redirectTo: '/'
            });

        // Restangular Settings
        RestangularProvider.setBaseUrl('http://api.countrybudget.lan');
        RestangularProvider.setRequestSuffix('?XDEBUG_SESSION_START=PHPSTORM'); // works
    }
]);

//app.run([
//    'Restangular',
//    function(Restangular) {
//    }
//]);
