app.controller('AddItemController', [
   '$scope',
   '$modalInstance',
   function ($scope,
             modal_instance) {
      $scope.view = {};
      $scope.view.item = {};

      $scope.done = function () {
         modal_instance.close('done clicked');
         //modal_instance.close({
         //   amount: $scope.view.amount,
         //   reoccurring: $scope.view.time_selected_value,
         //   start_date: $scope.view.start_date,
         //   end_date: $scope.view.end_date
         //});
      };

      $scope.cancel = function () {
         modal_instance.dismiss('modal dismissed');
      };
   }
]);
