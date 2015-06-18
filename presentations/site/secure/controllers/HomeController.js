app.controller('HomeController', [
   '$scope',
   'CommonService',
   function($scope,
            common_service) {
      common_service.setPageTitle('Nation Budget');

      $scope.view = {};
      $scope.view.hello = "Content welcoming and inviting users to use Nation budget will go here.";
   }
]);
