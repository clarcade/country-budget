app.directive('secureWrapper',
   function () {
      return {
         restrict: 'E',
         transclude: true,
         templateUrl: 'templates/securewrapper.html'
      };
   }
);
