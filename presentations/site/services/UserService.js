app.factory('UserService', [
   'Restangular',
   'AuthenticationService',
   '$q',
   '$location',
   function(restangular,
            authentication_service,
            $q,
            location) {
      var user_service = {};
      var user = {};
      var get_user_promise = null;

      user_service.logout = function () {
         user = {};
         authentication_service.logout();
         location.path("/login");
      };

      user_service.apiGetUser = function () {
         if (get_user_promise === null) {
            get_user_promise = $q.defer();

            authentication_service.authenticated().then(
               function () {
                  var deferred = restangular
                     .one('user', authentication_service.getUser().id)
                     .get();
                  deferred.then(
                     function (response) {
                        if (angular.isDefined(response.user)) {
                           user = response.user;
                           get_user_promise.resolve();
                        } else {
                           console.log("Error retrieving user data.");
                        }
                     },
                     function (error) {
                        console.log("Error retrieving user data.");
                     }
                  );
               },
               function (error) {
                  console.log("authentication_service: authenticated failed");
               }
            );
         }
         return get_user_promise.promise;
      };

      user_service.getUser = function () {
         return user;
      };

      return user_service;
   }
]);
