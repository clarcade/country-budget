// Don't need this now, but I may need it later so I'll leave it for now.
app.factory('UserService', [
   'Restangular',
   'AuthenticationService',
   function(restangular,
            authentication_service) {
      var user_service = {};
      user_service.user = authentication_service.auth.user;

      return user_service;
   }
]);
