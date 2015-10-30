app.controller('HomeController', [
  '$scope',
  'UserService',
  'ItemService',
  function ($scope,
            user_service,
            item_service) {
    $scope.view = {};

    $scope.addItem = function () {
      console.log("HomeController: addItem");
      item_service.getItem().result.then(
        function (item) {
          return item_service.addItem(user_service.user.id, item);
        },
        function (error) {
          if (error) {
            console.log("error: ", error);
          } else {
            console.log("Failed to get item.");
          }
        }
      ).then(
        function (response) {
          console.log("response: ", response);
        },
        function (error) {
          console.log("error: ", error);
        }
      );
    };

    $scope.editRemoveItem = function () {
      console.log("HomeController: editRemoveItem");
      //user_service.editRemoveItem();
    };
  }
]);
