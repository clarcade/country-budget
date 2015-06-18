app.controller('SecureHeaderController', [
   '$scope',
   'CommonService',
   'UserService',
   function(scope,
            common_service,
            user_service) {
      scope.view = {};
      scope.view.page_info = common_service.getPageInfo();

      scope.view.user = user_service.user;

      scope.logout = function () {
         user_service.logout();
      };
   }
]);
