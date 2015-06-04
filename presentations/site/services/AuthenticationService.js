app.factory('AuthenticationService', [
   'Restangular',
   function(Restangular) {
      var authentication_service = {};

      authentication_service.login = function(user) {
         return Restangular.one('login').post(user);
      };

      return authentication_service;
   }
]);
