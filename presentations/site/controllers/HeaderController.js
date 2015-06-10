app.controller('HeaderController', [
   '$scope',
   'CommonService',
   'UserService',
   function(scope,
            common_service,
            user_service) {
      scope.view = {};
      scope.view.page_info = common_service.getPageInfo();

      user_service.apiGetUser().then(
         function() {
            scope.view.user = user_service.getUser();
         },
         function(error) {
            console.log(error);
         }
      );

      scope.logout = function () {
         scope.view.user = null;
         user_service.logout();
      };
   }
]);
