app.directive('secureWrapper',
   function () {
      return {
         restrict: 'E',
         transclude: true,
         templateUrl: 'secure/templates/securewrapper.html'
      };
   }
);
