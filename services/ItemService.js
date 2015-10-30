app.factory('ItemService', [
  '$modal',
  'Restangular',
  function ($modal,
            restangular) {
    var item_service = {};

    item_service.getItem = function () {
      console.log("ItemService: getItem");
      return $modal.open({
        templateUrl: 'views/getitem.html',
        controller: 'GetItemController',
        size: 'lg'
      });
    };

    item_service.addItem = function (user_id, item) {
      console.log("ItemService: addItem");
      return restangular
        .one('user', user_id)
        .all('item')
        .post(item);
      //console.log("This is where we make a post for addItem");
      //console.log("On success update user's cached items");
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
