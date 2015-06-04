app.controller('GroupController', [
   '$scope',
   'CommonService',
   function($scope,
            CommonService) {
      CommonService.setPageTitle('Group Page');

      $scope.view = {};
      $scope.view.hello = "Group page content";
   }
]);
