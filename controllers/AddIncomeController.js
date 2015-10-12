app.controller('AddIncomeController', [
   '$scope',
   'UserService',
   '$modalInstance',
   function ($scope,
             user_service,
             modal_instance) {
      $scope.view = {};
      $scope.view.user = user_service.user;
      $scope.view.min_date = new Date();
      $scope.view.date_picker_mode = "day";
      //$scope.view.date_picker_mode = "month";
      //$scope.view.date_picker_mode = "year";
      $scope.view.time_options = [
         {
            value: 'biweek',
            label: 'Bi-Weekly'
         },
         {
            value: 'month',
            label: 'Monthly'
         },
         {
            value: 'year',
            label: 'Yearly'
         }
      ];
      $scope.view.time_selected_value = $scope.view.time_options[0].value;
      $scope.view.time_label = $scope.view.time_options[0].label;
      var dates_to_enable = [];
      var start_date = null;

      $scope.updateView = function () {
         var time_options = $scope.view.time_options;
         var count = time_options.length;
         for (var i = 0; i < count; i++) {
            if (time_options[i].value === $scope.view.time_selected_value) {
               $scope.view.time_label = time_options[i].label;
            }
         }
      };

      var initializeEndDateCalendar = function() {
         var temp_date = $scope.view.start_date;
         $scope.view.start_date = null;
         $scope.$digest();

      };

      $scope.updateDates = function () {
         initializeEndDateCalendar();
         dates_to_enable = [];

         start_date = new Date(
            $scope.view.start_date.getFullYear(),
            $scope.view.start_date.getMonth(),
            $scope.view.start_date.getDate()
         );
         var date_to_push = new Date(
            new Date().setDate(start_date.getDate())
         );

         dates_to_enable.push(date_to_push);
      };

      $scope.nullStartDate = function() {
         $scope.view.start_date = null;
      };

      $scope.ok = function () {
         modal_instance.close({
            amount: $scope.view.amount,
            reoccurring: $scope.view.time_selected_value,
            start_date: $scope.view.start_date,
            end_date: $scope.view.end_date
         });
      };

      $scope.cancel = function () {
         modal_instance.dismiss('cancel clicked');
      };

      //$scope.updateEnableDates = function (date, mode) {
      //   if ($scope.view.start_date && $scope.view.time_selected_value) {
      //      var date_in_question = new Date(
      //         date.getFullYear(),
      //         date.getMonth(),
      //         date.getDate()
      //      );
      //      var dates_to_enable_length = dates_to_enable.length;
      //      var date_to_push = null;
      //
      //      if (dates_to_enable_length === 0) {
      //         date_to_push = new Date(
      //            $scope.view.start_date.getFullYear(),
      //            $scope.view.start_date.getMonth(),
      //            $scope.view.start_date.getDate()
      //         );
      //
      //         dates_to_enable.push(date_to_push);
      //         dates_to_enable_length++;
      //      }
      //
      //      if (date_in_question.getTime() >
      //         dates_to_enable[dates_to_enable_length - 1].getTime()) {
      //         date_to_push = new Date(
      //            dates_to_enable[dates_to_enable_length - 1].getFullYear(),
      //            dates_to_enable[dates_to_enable_length - 1].getMonth(),
      //            dates_to_enable[dates_to_enable_length - 1].getDate()
      //         );
      //
      //         date_to_push.setDate(date_to_push.getDate() + 14);
      //         dates_to_enable.push(date_to_push);
      //      }
      //   }
      //};

      //$scope.disableStartDate = function (date, mode) {
      //   var disable = false;
      //
      //   // default to not disable unless start_date has been chosen
      //   if ($scope.view.start_date) {
      //      disable = true;
      //   }
      //
      //   // Needs finessing
      //   if ($scope.view.time_selected_value) {
      //      if ($scope.view.time_selected_value === "biweek" && $scope.view.start_date) {
      //         var date_in_question = new Date(
      //            date.getFullYear(),
      //            date.getMonth(),
      //            date.getDate()
      //         );
      //
      //         var count = dates_to_enable.length;
      //         for (var i = 0; i < count; i++) {
      //            if (date_in_question.getTime() === dates_to_enable[i].getTime()) {
      //               disable = false;
      //               i = count;
      //            }
      //         }
      //      }
      //   }
      //
      //   return disable;
      //};

      //$scope.disableEndDate = function (date, mode) {
      //   var disable = true;
      //
      //   if ($scope.view.time_selected_value) {
      //      if ($scope.view.time_selected_value === "biweek") {
      //         var date_in_question = new Date(
      //            date.getFullYear(),
      //            date.getMonth(),
      //            date.getDate()
      //         );
      //         var start_date = new Date(
      //            $scope.view.start_date.getFullYear(),
      //            $scope.view.start_date.getMonth(),
      //            $scope.view.start_date.getDate()
      //         );
      //
      //         if (date_in_question.getTime() !== start_date.getTime()) {
      //            var count = dates_to_enable.length;
      //            for (var i = 0; i < count; i++) {
      //               if (date_in_question.getTime() === dates_to_enable[i].getTime()) {
      //                  disable = false;
      //                  i = count;
      //               }
      //            }
      //         }
      //      }
      //   }
      //
      //   return disable;
      //};

      $scope.disableEndDate = function (date, mode) {
         var disable = true;
         var recurrence_type = $scope.view.time_selected_value;
         var dates_to_enable_length = dates_to_enable.length;
         var date_to_push = null;
         var date_in_question = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate()
         );
         if (dates_to_enable_length === 0) {
            $scope.updateDates();
            dates_to_enable_length = dates_to_enable.length;
         }

         for (var i = 0;
              date_in_question.getTime() > dates_to_enable[dates_to_enable_length - 1].getTime();
              i++) {
            console.log("here");
            var temp_date = new Date(
               dates_to_enable[dates_to_enable_length - 1].getFullYear(),
               dates_to_enable[dates_to_enable_length - 1].getMonth(),
               dates_to_enable[dates_to_enable_length - 1].getDate()
            );

            date_to_push = new Date(
               temp_date.setDate(temp_date.getDate() + 14)
            );
            dates_to_enable.push(date_to_push);
            dates_to_enable_length++;
         }

         if (recurrence_type === "biweek") {
            for (var i = 0; i < dates_to_enable_length; i++) {
               if (date_in_question.getTime() === dates_to_enable[i].getTime()) {
                  disable = false;
                  i = dates_to_enable_length;
               }
            }
         }

         return disable;
      };
   }
]);