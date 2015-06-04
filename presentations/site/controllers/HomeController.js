app.controller('HomeController', [
   '$scope',
   'CommonService',
   function($scope,
            CommonService) {
      CommonService.setPageTitle('National - Summary');

      $scope.view = {};
      $scope.view.hello = "National summary data will go here when there is actually data to show.";
   }
]);
