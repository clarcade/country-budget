app.controller('LoginController', [
   '$scope',
   'CommonService',
   'UserService',
   'AuthenticationService',
   '$location',
   function(scope,
            common_service,
            user_service,
            authentication_service,
            location) {
      common_service.setPageTitle('Login');

      scope.view = {};
      scope.view.user = {};
      scope.view.try_submit = false;

      scope.submit = function (form) {
         console.log(form);
         scope.view.try_submit = true;

         if (form.$valid) {
            console.log("Submitting");

            //authentication_service.login(user).then(
            //   function(response) {
            //      var user = response.user;
            //
            //      if (angular.isDefined(user)) {
            //         user_service.setUser(user);
            //
            //         location.path('#/home');
            //      } else {
            //         console.log("Incorrect username or password.");
            //      }
            //   },
            //   function(error) {
            //      console.log("The following error occurred: " + error.message);
            //   }
            //);
         } else {
            console.log("Form not valid");
         }
      };
   }
]);
