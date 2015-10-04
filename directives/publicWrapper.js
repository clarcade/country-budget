app.directive('publicWrapper',
   function () {
      return {
         restrict: 'E',
         transclude: true,
         templateUrl: 'templates/publicwrapper.html'
      };
   }
);
