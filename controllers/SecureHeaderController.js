app.controller('SecureHeaderController', [
   '$scope',
   'CommonService',
   'UserService',
   'AuthenticationService',
   '$location',
   function(scope,
            common_service,
            user_service,
            authentication_service) {
      scope.view = {};
      scope.view.page_info = common_service.getPageInfo();
      scope.view.user = user_service.user;

      scope.logout = authentication_service.logout;
   }
]);
