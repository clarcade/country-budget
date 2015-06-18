app.controller('SettingsController', [
   '$scope',
   'CommonService',
   function($scope,
            CommonService) {
      CommonService.setPageTitle('Settings');

      $scope.view = {};
      $scope.view.hello = "Settings page content";
   }
]);
