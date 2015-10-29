app.factory('ItemService', [
  '$modal',
  function ($modal) {
    var item_service = {};

    item_service.getItem = function () {
      console.log("ItemService: getItem");
      return $modal.open({
        templateUrl: 'views/getitem.html',
        controller: 'GetItemController',
        size: 'lg'
      });
    };

    item_service.addItem = function () {
      console.log("ItemService: addItem");
      console.log("This is where we make a post for addItem");
      console.log("On success update user's cached items");
    };

    item_service.editRemoveItem = function () {
      console.log("ItemService: editRemoveItem");
      return $modal.open({
        templateUrl: 'views/editRemoveItem.html',
        controller: 'EditRemoveItemController',
        size: 'lg'
      });
    };

    return item_service;
  }
]);
