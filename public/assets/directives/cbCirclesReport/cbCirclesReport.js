app.directive("cbCirclesReport", function () {
  return {
    restrict: 'AE',
    scope: {
      type: '@',
      user_budgets: '=data'
    },
    template: '' +
      '<div>' +
      '  <svg width="100%" height="200"></svg>' +
      '</div>',
    link: function ($scope, element, attrs) {
      var dom_svg = element.find('svg')[0];
      var svg = d3.select(dom_svg);

      var createBudgetCircles = function (budgets) {
        var d3_circles = svg.selectAll("circle")
          .data(budgets)
          .enter()
          .append("circle");

        d3_circles
          .attr("cx", function (d, i) {
            return i * 150 + 80;
          })
          .attr("cy", 100)
          .attr("r", 0)
          .attr("id", function (d) {
            return "budget-" + d.name;
          })
          .style("fill", "steelblue");

        d3_circles
          .transition()
          .duration(1000)
          .attr("r", function (d) {
            return Math.sqrt(d.value);
          });
      };

      var addD3Budget = function (new_budget) {
        console.log("addD3Budget");

        var new_circle = svg.append("circle")
          .data([new_budget])
          .attr("id", function (d) {
            return "budget-" + d.name;
          })
          .style("fill", "green")
          .attr("cy", 100)
          .attr("cx", function () {
            console.log("length: ", $scope.user_budgets.length);
            return ($scope.user_budgets.length - 1) * 150 + 80;
          })
          .attr("r", 0);

        new_circle
          .transition()
          .duration(1000)
          .attr("r", function () {
            return Math.sqrt(new_budget.value);
          });
      };

      var updateView = function (new_value, old_value) {
        var new_length = new_value.length;
        var old_length = old_value.length;
        if (new_length === old_length) {
          for (var i = 0; i < new_length; i++) {
            for (var j = 0; j < old_length; j++) {
              if (new_value[i].name === old_value[j].name) {
                if (new_value[i].value !== old_value[j].value) {
                  svg.select("#budget-" + new_value[i].name)
                    .transition()
                    .duration(1000)
                    .attr("r", function () {
                      return Math.sqrt(new_value[i].value);
                    });

                  i = new_length;
                  j = old_length;
                } else {
                  break;
                }
              }
            }
          }
        } else if (new_length > old_length) {
          addD3Budget($scope.user_budgets[new_length - 1]);
        } else {
          console.log("Need to implement delete budget method.");
        }
      };

      createBudgetCircles($scope.user_budgets);

      $scope.$watch('user_budgets', updateView, true);
    }
  };
});
