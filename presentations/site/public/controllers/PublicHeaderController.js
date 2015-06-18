app.controller('PublicHeaderController', [
   '$scope',
   'CommonService',
   'AuthenticationService',
   function(scope,
            common_service,
            authentication_service) {
      scope.view = {};
      scope.view.page_info = common_service.getPageInfo();
      scope.view.user = authentication_service.auth.user;

      scope.logout = function () {
         authentication_service.logout();
      };
   }
]);
