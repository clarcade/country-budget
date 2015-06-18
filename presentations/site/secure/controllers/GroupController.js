app.controller('GroupController', [
   '$scope',
   'CommonService',
   'UserService',
   function($scope,
            common_service,
            user_service) {
      common_service.setPageTitle('Group Page');

      //user_service.getIncomeData(user_service.user.id)

      $scope.view = {};
   }
]);
