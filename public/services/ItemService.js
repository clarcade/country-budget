// ItemService should be Restful only
app.factory('ItemService', [
  'Restangular',
  function (restangular) {
    var item_service = {};

    item_service.getAllItems = function (user_id) {
      if (!user_id) {
        console.error("user_id not provided");
      }

      return restangular
        .one('user', user_id)
        .getList('items');
    };

    item_service.addItem = function (user_id, item) {
      //console.log("ItemService: addItem");

      if (!user_id) {
        console.error("user_id not provided");
      }

      return restangular
        .one('user', user_id)
        .all('item')
        .post(item);
    };

    //item_service.editRemoveItem = function () {
    //  console.log("ItemService: editRemoveItem");
    //  return $modal.open({
    //    templateUrl: 'views/editRemoveItem.html',
    //    controller: 'EditRemoveItemController',
    //    size: 'lg'
    //  });
    //};

    return item_service;
  }
]);
