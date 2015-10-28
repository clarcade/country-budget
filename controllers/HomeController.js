app.controller('HomeController', [
   '$scope',
   'UserService',
   function($scope,
            user_service) {
      $scope.view = {};

      $scope.addItem = function () {
         console.log("Adding Item");
         user_service.addItem();
      };

      $scope.editRemoveItem = function () {
         console.log("Edit/Remove Item");
         user_service.editRemoveItem();
      };
   }
]);
