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
      user_service.user = authentication_service.auth.user;

      user_service.logout = function () {
         authentication_service.logout();
         location.path("/login");
      };

      //user_service.apiGetUser = function () {
      //   if (get_user_promise === null) {
      //      get_user_promise = $q.defer();
      //
      //      authentication_service.authenticated().then(
      //         function () {
      //            var deferred = restangular
      //               .one('user', authentication_service.getUser().id)
      //               .get();
      //            deferred.then(
      //               function (response) {
      //                  if (angular.isDefined(response.user)) {
      //                     //user = response.user;
      //                     user_service.user = response.user;
      //                     get_user_promise.resolve();
      //                  } else {
      //                     console.log("Error retrieving user data.");
      //                  }
      //               },
      //               function (error) {
      //                  console.log("Error retrieving user data.");
      //               }
      //            );
      //         },
      //         function (error) {
      //            console.log("authentication_service: authenticated failed");
      //         }
      //      );
      //   }
      //   return get_user_promise.promise;
      //};

      return user_service;
   }
]);
