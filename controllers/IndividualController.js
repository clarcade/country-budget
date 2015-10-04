app.controller('IndividualController', [
   '$scope',
   'CommonService',
   function($scope,
            CommonService) {
      CommonService.setPageTitle('Individual Page');

      $scope.view = {};
      $scope.view.hello = "Individual page content";
   }
]);
