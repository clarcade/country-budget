app.factory('AuthenticationService', [
   'Restangular',
   '$q',
   '$sessionStorage',
   function (restangular,
             $q,
             session_storage) {
      var authentication_service = {};
      var authentication_deferred = $q.defer();
      authentication_service.auth = session_storage.$default({
         user: { id: null }
      });

      function resetAuthentication () {
         authentication_service.auth.user.id = null;
      };

      authentication_service.checkAccess = function () {
         if (authentication_service.auth.user.id !== null) {
            authentication_deferred.resolve();
         } else {
            authentication_deferred.reject('login_error');
         }

         return authentication_deferred.promise;
      };

      authentication_service.login = function (user_data) {
         var login_promise = restangular.all('login').post(user_data);

         login_promise.then(
            function (response) {
               if (angular.isDefined(response.user)) {
                  authentication_service.auth.user.id = response.user.id;
               } else {
                  console.log("Incorrect username or password.");
               }
            },
            function (error) {
               console.log(error);
            }
         );

         return login_promise;
      };

      authentication_service.register = function (user_data) {
         return restangular.all('register').post(user_data);
      };

      authentication_service.logout = function () {
         resetAuthentication();
      };

      return authentication_service;
   }
]);
