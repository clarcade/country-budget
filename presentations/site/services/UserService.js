app.factory('UserService', [
    'Restangular',
    function(Restangular) {
        var user_service = {};

        user_service.sayHello = function(name) {
            return Restangular.one('hello', name).get();
        };

        return user_service;
    }
]);
