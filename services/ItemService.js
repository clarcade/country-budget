// ItemService should be Restful only
app.factory('ItemService', [
  'Restangular',
  function (restangular) {
    var item_service = {};

    item_service.getAllItems = function (user_id) {
      return restangular
        .one('user', user_id)
        .getList('items');
      //return restangular
      //  .one('user', user_id)
      //  .one('items')
      //  .get();
    };

    item_service.addItem = function (user_id, item) {
      console.log("ItemService: addItem");
      return restangular
        .one('user', user_id)
        .all('item')
        .post(item);
      //console.log("On success update user's cached items");
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
