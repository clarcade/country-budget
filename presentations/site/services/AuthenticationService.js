app.factory('AuthenticationService', [
   'Restangular',
   '$q',
   function (Restangular,
             $q) {
      var authentication_service = {};
      var loggedin = null;
      var user = null;
      var login_promise = null;
      var authenticated_promise = null;
      var authentication_deferred = null;

      function resetAuthentication () {
         authenticated_promise = $q.defer();
         authentication_deferred = $q.defer();
         loggedin = false;
         user = {};
      };

      resetAuthentication();

      authentication_service.authenticated = function () {
         return authenticated_promise.promise;
      };

      authentication_service.getUser = function () {
         return user;
      };

      authentication_service.checkAccess = function () {
         if (loggedin) {
            authentication_deferred.resolve();
         } else {
            authentication_deferred.reject('login_error');
         }

         return authentication_deferred.promise;
      };

      authentication_service.login = function (user_data) {
         if (login_promise === null) {
            login_promise = Restangular.all('login').post(user_data);

            login_promise.then(
               function (response) {
                  if (angular.isDefined(response.user)) {
                     user.id = response.user.id;
                     loggedin = true;
                     authenticated_promise.resolve();
                  } else {
                     console.log("Incorrect username or password.");
                  }
               },
               function (error) {
                  console.log(error);
               }
            );
         }

         return login_promise;
      };

      authentication_service.logout = function () {
         resetAuthentication();
      };

      return authentication_service;
   }
]);
