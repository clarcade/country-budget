app.controller('HeaderController', [
   '$scope',
   'CommonService',
   function($scope,
            CommonService) {
      $scope.page_info = CommonService.getPageInfo();
      //$scope.page_info = {
      //   page_title: "Test Title"
      //};
   }
]);
