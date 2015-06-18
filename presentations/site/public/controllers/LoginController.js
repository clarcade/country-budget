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
         scope.view.try_submit = true;

         if (form.$valid) {
            authentication_service.login(scope.view.user).then(
               function() {
                  location.path('/group');
               },
               function(error) {
                  console.log(error);
               }
            );
         } else {
            console.log("Form not valid");
         }
      };
   }
]);
