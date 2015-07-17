app.controller('GroupActualIncomeNewItemController', [
   '$scope',
   'CommonService',
   'GroupService',
   '$location',
   function(scope,
            common_service,
            group_service,
            location) {
      common_service.setPageTitle('Group Income - Actual - Add Item');
      scope.view = {};
      scope.view.item = {};
      scope.view.year_collection = [];
      scope.view.month_collection = [];
      //scope.view.item_types = [
      //   "basic",
      //   "mortgage"
      //];
      //scope.view.item.type = scope.view.item_types[0];

      scope.submit = function (form) {
         if (form.$valid) {
            group_service.addActualIncomeItem(scope.view.item);
         } else {
            console.log("Form not valid");
         }
      };

      //scope.updateTemplateType = function() {
      //   console.log("Updating template.");
      //
      //   if ((scope.view.item.type !== null) &&
      //       (scope.view.item.type !== "")) {
      //      scope.view.template_type = '/secure/views/' + scope.view.item.type + 'item.html';
      //   }
      //};
      //
      //scope.updateTemplateType();

      // Year Data -- Make into a directive later
      var date = new Date();
      var current_year = date.getFullYear();
      scope.view.selected_year = current_year;
      var temp_year = current_year - 5;
      for (var i = 0; i < 11; i++) {
         scope.view.year_collection.push(temp_year++);
      }

      // Month Data -- Make into a directive later
      scope.view.month_collection.push({id: 0, name: "January"});
      scope.view.month_collection.push({id: 1, name: "February"});
      scope.view.month_collection.push({id: 2, name: "March"});
      scope.view.month_collection.push({id: 3, name: "April"});
      scope.view.month_collection.push({id: 4, name: "May"});
      scope.view.month_collection.push({id: 5, name: "June"});
      scope.view.month_collection.push({id: 6, name: "July"});
      scope.view.month_collection.push({id: 7, name: "August"});
      scope.view.month_collection.push({id: 8, name: "September"});
      scope.view.month_collection.push({id: 9, name: "October"});
      scope.view.month_collection.push({id: 10, name: "November"});
      scope.view.month_collection.push({id: 11, name: "December"});
      scope.view.selected_month = date.getMonth();
   }
]);
