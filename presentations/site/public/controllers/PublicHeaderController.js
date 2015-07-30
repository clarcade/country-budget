app.controller('PublicHeaderController', [
   '$scope',
   'CommonService',
   'AuthenticationService',
   '$location',
   function(scope,
            common_service,
            authentication_service,
            location) {
      scope.view = {};
      scope.view.page_info = common_service.getPageInfo();
      scope.view.user = authentication_service.auth.user;

      scope.logout = authentication_service.logout;

      scope.login = function () {
         location.path("/login");
      };

      scope.register = function () {
         location.path("/register");
      };
   }
]);
