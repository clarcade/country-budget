app.controller('MainController', [
    '$scope',
    'Restangular',
    'UserService',
    function($scope,
             Restangular,
             UserService) {
        $scope.view = {};
        $scope.view.name = "Cory Larcade";

        $scope.sayHello = function () {
            UserService.sayHello($scope.view.name).then(
                function (response) {
                    console.log(response);
                    console.log("sayHello success!");
                },
                function () {
                    console.log("sayHello failed.");
                }
            );
        };
    }
]);
