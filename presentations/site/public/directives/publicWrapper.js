app.directive('publicWrapper',
   function () {
      return {
         restrict: 'E',
         transclude: true,
         templateUrl: 'public/templates/publicwrapper.html'
      };
   }
);
