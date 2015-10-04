app.controller('RegisterController', [
   '$scope',
   'CommonService',
   '$location',
   'AuthenticationService',
   function(scope,
            common_service,
            location,
            authentication_service) {
      common_service.setPageTitle('Register');

      scope.view = {};
      scope.view.user = {};
      scope.view.try_submit = false;

      scope.submit = function (form) {
         scope.view.try_submit = true;

         if (form.$valid) {
            authentication_service.register(scope.view.user).then(
               function() {
                  location.path('/login');
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
