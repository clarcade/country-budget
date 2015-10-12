app.factory('ItemService', [
   '$modal',
   function($modal) {
      var item_service = {};

      item_service.addItem = function() {
         console.log("In item_service.addItem");
         return $modal.open({
            templateUrl: 'views/additem.html',
            controller: 'AddItemController',
            size: 'lg'
         });
      };

      item_service.editRemoveItem = function () {
         console.log("In item_service.editRemoveItem");
         return $modal.open({
            templateUrl: 'views/editRemoveItem.html',
            controller: 'EditRemoveItemController',
            size: 'lg'
         });
      };

      return item_service;
   }
]);
