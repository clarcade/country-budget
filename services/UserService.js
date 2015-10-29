app.factory('UserService', [
  'ItemService',
  function (item_service) {
    var user_service = {};
    user_service.user = {};
    user_service.user.id = 123;
    user_service.user.income_items = [];
    user_service.user.expense_items = [];

    //user_service.addItem = function () {
    //  console.log("Do add item stuff.");
    //  item_service.addItem(user_service.user.user_id).result.then(
    //    function (income_item) {
    //      console.log("income_item: ", income_item);
    //    },
    //    function (response) {
    //      console.log("response: ", response);
    //    }
    //  );
    //};
    //
    //user_service.editRemoveItem = function () {
    //  console.log("Do edit/remove item stuff.");
    //  item_service.editRemoveItem().result.then(
    //    function (response) {
    //      console.log("editRemoveItem: Success.");
    //    },
    //    function (response) {
    //      console.log("response: ", response);
    //    }
    //  );
    //};

    return user_service;
  }
]);
