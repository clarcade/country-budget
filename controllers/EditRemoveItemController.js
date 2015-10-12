app.controller('EditRemoveItemController', [
   '$scope',
   '$modalInstance',
   function ($scope,
             modal_instance) {
      $scope.view = {};

      $scope.done = function () {
         modal_instance.close('done clicked');
      };

      $scope.cancel = function () {
         modal_instance.dismiss('modal dismissed');
      };
   }
]);