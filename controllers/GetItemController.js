app.controller('GetItemController', [
   '$scope',
   '$modalInstance',
   function ($scope,
             modal_instance) {
      $scope.view = {};
      $scope.view.item = {};
      $scope.view.item.revenue_type = "";
      $scope.view.item.date = new Date();
      $scope.status = {};
      $scope.status.opened = false;
      $scope.view.date_options = {
         //formatYear: 'yy',
         startingDay: 1
      };
      $scope.maxDate = new Date(2020, 5, 22);
      $scope.minDate = new Date();

      $scope.open = function () {
         console.log("GetItemController: open");
         $scope.status.opened = true;
      };

      $scope.done = function () {
         console.log("GetItemController: done");
         modal_instance.close($scope.view.item);
      };

      $scope.cancel = function () {
         console.log("GetItemController: cancel");
         modal_instance.dismiss('modal dismissed');
      };
   }
]);
