app.factory('AuthenticationService', [
   'Restangular',
   '$q',
   '$sessionStorage',
   '$location',
   function (restangular,
             $q,
             session_storage,
             location) {
      var authentication_service = {};
      authentication_service.auth = session_storage.$default({
         user: { id: null },
         group: { id: null }
      });

      function resetAuthentication () {
         authentication_service.auth.user.id = null;
         authentication_service.auth.group.id = null;
      };

      authentication_service.checkAccess = function () {
         console.log("In checkAccess: ");
         var authentication_deferred = $q.defer();

         if (authentication_service.auth.user.id !== null) {
            console.log("auth resolving");
            authentication_deferred.resolve();
         } else {
            console.log("auth rejecting");
            authentication_deferred.reject('login_error');
         }

         return authentication_deferred.promise;
      };

      authentication_service.login = function (user_data) {
         var login_promise = restangular.all('login').post(user_data);

         login_promise.then(
            function (response) {
               if (angular.isDefined(response.user)) {
                  authentication_service.auth.user.id = response.user.user_id;
                  authentication_service.auth.group.id = response.user.group_id;
               } else {
                  console.log(response.data.error);
               }
            },
            function (error) {
               console.log(error.data.error);
            }
         );

         return login_promise;
      };

      authentication_service.register = function (user_data) {
         return restangular.all('register').post(user_data);
      };

      authentication_service.logout = function () {
         resetAuthentication();
         location.path("/login");
      };

      return authentication_service;
   }
]);
