app.controller('RegisterController', [
   '$scope',
   'CommonService',
   function($scope,
            CommonService) {
      CommonService.setPageTitle('Register');

      $scope.view = {};
      $scope.view.hello = "Register page to come.";
   }
]);
