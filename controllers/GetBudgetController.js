app.controller('GetBudgetController', [
  '$scope',
  '$modalInstance',
  '$compile',
  function ($scope,
            modal_instance,
            $compile) {
    $scope.view = {};
    $scope.view.loaded = false;
    $scope.view.budget = {};
    $scope.view.try_submit = false;
    $scope.view.recurrence_types = [
      'None',
      'Bi-Weekly',
      'Monthly',
      'Yearly'
    ];
    $scope.view.budget.recurrence_type = $scope.view.recurrence_types[0];
    $scope.view.recurrence_end_types = [
      'No End Date',
      'With End Date'
    ];
    $scope.view.budget.recurrence_end_type = $scope.view.recurrence_end_types[0];
    $scope.view.budget.value = 0.00;
    $scope.start_status = {};
    $scope.start_status.opened = false;
    $scope.end_status = {};
    $scope.end_status.opened = false;
    $scope.view.date_options = {
      'startingDay': 1
    };
    $scope.maxDate = new Date(2050);

    var today_date = new Date();
    var valid_dates = null;

    $scope.updateEndDates = function () {
      var recurrence_end_type = $scope.view.budget.recurrence_end_type;

      if (recurrence_end_type && recurrence_end_type === 'With End Date') {
        var recurrence_type = $scope.view.budget.recurrence_type;

        var start_date = $scope.view.budget.start_date;
        var end_date = $scope.view.budget.end_date ? $scope.view.budget.end_date : null;
        var reset_date = end_date ? end_date : start_date;
        var temp_min_date = null;

        if (recurrence_type === 'Monthly') {
          temp_min_date = new Date(
            start_date.getFullYear(),
            start_date.getMonth()
          );
          temp_min_date.setMonth(temp_min_date.getMonth() + 1);
        } else if (recurrence_type === 'Yearly') {
          temp_min_date = new Date(
            start_date.getFullYear(),
            0
          );
          temp_min_date.setFullYear(temp_min_date.getFullYear() + 1);
        } else {
          temp_min_date = new Date(
            start_date.getFullYear(),
            start_date.getMonth(),
            start_date.getDate()
          );
          temp_min_date.setDate(temp_min_date.getDate() + 14);
        }

        if (end_date) {
          if (recurrence_type === 'Monthly') {
            reset_date = new Date(
              end_date.getFullYear(),
              end_date.getMonth()
            );
          } else if (recurrence_type === 'Yearly') {
            reset_date = new Date(
              end_date.getFullYear(),
              0
            );
          } else {
            if (recurrence_type === 'Bi-Weekly') {
              reset_date = start_date;
            } else {
              reset_date = new Date(
                end_date.getFullYear(),
                end_date.getMonth(),
                end_date.getDate()
              );
            }
          }
        }

        if (reset_date.getTime() <= start_date.getTime()) {
          if (recurrence_type === 'Monthly') {
            reset_date = new Date(
              start_date.getFullYear(),
              start_date.getMonth()
            );
            reset_date.setMonth(reset_date.getMonth() + 1);
          } else if (recurrence_type === 'Yearly') {
            reset_date = new Date(
              start_date.getFullYear(),
              0
            );
            reset_date.setFullYear(reset_date.getFullYear() + 1);
          } else {
            reset_date = new Date(
              start_date.getFullYear(),
              start_date.getMonth(),
              start_date.getDate()
            );
            reset_date.setDate(reset_date.getDate() + 14);
          }
        }

        $scope.minDate = temp_min_date;
        $scope.view.budget.end_date = reset_date;
        valid_dates = [];
        valid_dates.push(reset_date);
      }
    };

    var updateStartDates = function () {
      var recurrence_type = $scope.view.budget.recurrence_type;

      if (recurrence_type === 'Monthly') {
        $scope.view.budget.start_date = new Date(
          today_date.getFullYear(),
          today_date.getMonth()
        );
        $scope.view.date_mode = 'month';
      } else if (recurrence_type === 'Yearly') {
        $scope.view.budget.start_date = new Date(
          today_date.getFullYear(),
          0
        );
        $scope.view.date_mode = 'year';
      } else {
        $scope.view.budget.start_date = new Date(
          today_date.getFullYear(),
          today_date.getMonth(),
          today_date.getDate()
        );
        $scope.view.date_mode = 'day';
      }
    };

    $scope.refreshDatepickers = function () {
      var elem = angular.element($("#datepickers-container"));
      elem.empty();

      updateStartDates();
      $scope.updateEndDates();
      $scope.updateDatePickerMode();

      var datepicker_html = "" +
        "<div ng-if=\"view.budget.recurrence_type === 'None'\">" +
        "  <div class='datepicker-container'>" +
        "    <button type='button' class='btn btn-default'" +
        "            ng-click='open(start_status)'>" +
        "      <i class='glyphicon glyphicon-calendar'></i>" +
        "    </button>" +
        "    <input type='text' class='form-control'" +
        "           ng-model='view.budget.start_date' datepicker-popup" +
        "           is-open='start_status.opened'" +
        "           datepicker-options='view.date_options'" +
        "           name='start_date' required>" +
        "    <span ng-if='view.try_submit === true'>" +
        "      <span ng-if='budget_form.start_date.$error.required'>" +
        "        Required" +
        "      </span>" +
        "    </span>" +
        "  </div>" +
        "</div>" +
        "<div ng-if=\"view.budget.recurrence_type !== 'None'\">" +
        "  <div class='datepicker-container'>" +
        "    <button type='button' class='btn btn-default'" +
        "            ng-click='open(start_status)'>" +
        "      <i class='glyphicon glyphicon-calendar'></i>" +
        "    </button>" +
        "    <input type='text' class='form-control'" +
        "           ng-model='view.budget.start_date' datepicker-popup" +
        "           is-open='start_status.opened'" +
        "           datepicker-options='view.date_options'" +
        "           name='start_date'" +
        "           min-mode=\"'" + $scope.view.date_mode + "'\"" +
        "           ng-change='updateEndDates()' required>" +
        "    <span ng-if='view.try_submit === true'>" +
        "      <span ng-if='budget_form.start_date.$error.required'>" +
        "        Required" +
        "      </span>" +
        "    </span>" +
        "  </div>" +
        "  <div ng-if=\"view.budget.recurrence_end_type === 'With End Date'\"" +
        "       class='datepicker-container'>" +
        "    <button type='button' class='btn btn-default'" +
        "            ng-click='open(end_status)'>" +
        "      <i class='glyphicon glyphicon-calendar'></i>" +
        "    </button>" +
        "    <input type='text' class='form-control'" +
        "           ng-model='view.budget.end_date'" +
        "           datepicker-popup" +
        "           is-open='end_status.opened'" +
        "           datepicker-options='view.date_options'" +
        "           min-date='minDate'" +
        "           min-mode=\"'" + $scope.view.date_mode + "'\"" +
        "           date-disabled='disableDates(date, mode)'" +
        "           name='end_date' required>" +
        "    <span ng-if='view.try_submit === true'>" +
        "      <span ng-if='budget_form.end_date.$error.required'>" +
        "        Required" +
        "      </span>" +
        "    </span>" +
        "  </div>" +
        "</div>";

      var compiled_html = $compile(datepicker_html);
      var content = compiled_html($scope);

      elem.append(content);
    };

    $scope.updateDatePickerMode = function () {
      if ($scope.view.budget.recurrence_type === 'Monthly') {
        $scope.view.date_options['datepicker-mode'] = "'month'";
      } else if ($scope.view.budget.recurrence_type === 'Yearly') {
        $scope.view.date_options['datepicker-mode'] = "'year'";
      } else {
        $scope.view.date_options['datepicker-mode'] = "'day'";
      }
    };

    $scope.open = function (selectedStatus) {
      selectedStatus.opened = true;
    };

    $scope.done = function (form) {
      $scope.view.try_submit = true;
      if (form.$valid) {
        if ($scope.view.budget.recurrence_type && $scope.view.budget.recurrence_type === 'None') {
          delete $scope.view.budget.end_date;
        }
        modal_instance.close($scope.view.budget);
      } else {
        console.log("Form not valid.");
      }
    };

    $scope.cancel = function () {
      modal_instance.dismiss('modal dismissed');
    };

    $scope.disableDates = function (date, mode) {
      var disable = true;

      if ($scope.view.budget.recurrence_type === 'Bi-Weekly') {
        while (valid_dates[valid_dates.length - 1].getTime() < date.getTime()) {
          var temp_date = new Date(valid_dates[valid_dates.length - 1].toDateString());
          temp_date.setDate(temp_date.getDate() + 14);
          valid_dates.push(temp_date);
        }

        var length = valid_dates.length;
        for (var i = 0; i < length; i++) {
          if (valid_dates[i].getTime() === date.getTime()) {
            i = length;
            disable = false;
          }
        }
      } else {
        disable = false;
      }

      return disable;
    };

    (function() {
      var interval_id = window.setInterval(function () {
        var elem = angular.element($("#datepickers-container"));
        if (elem.length > 0) {
          clearInterval(interval_id);
          $scope.refreshDatepickers();
          $scope.view.loaded = true;
        }
      }, 100);
    }());
  }
]);
