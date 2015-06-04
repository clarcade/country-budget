app.factory('UserService', [
   'Restangular',
   function(Restangular) {
      var user_service = {};

      user_service.setUser = function(user) {
         user_service.user = user;
      };

      user_service.getUser = function(user) {
         return user_service.user;
      };

      user_service.sayHello = function(user_id) {
         return Restangular.one('user', user_id).get();
      };

      return user_service;
   }
]);
