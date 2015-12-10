app.directive("cbTable", function () {
  return {
    restrict: 'AE',
    scope: {
      user_items: '=data'
    },
    templateUrl: 'static/assets/directives/cbTable/cbTable.html'
  };
});
