app.controller('MortgageController', ['$scope', 'MortgageService', function($scope, MortgageService) {
    $scope.view = {};
    $scope.view.data = {};
    $scope.view.data.mortgage = {};
    $scope.view.data.mortgage.principal = null;
    $scope.view.data.mortgage.monthly_interest_rate = null;
    $scope.view.data.mortgage.years_to_payoff_loan = null;
    $scope.view.data.mortgage.down_payment = null;
    $scope.view.data.mortgage.monthly_payments = null;
    $scope.view.data.mortgage.valid = false;

    $scope.calcMonthlyPayments = function() {
        $scope.view.data.mortgage = MortgageService.calculateMonthlyPayments($scope.view.data.mortgage);
    };

    $scope.validateMortgage = function() {
        $scope.view.data.mortgage = MortgageService.validate($scope.view.data.mortgage);
    };
}]);
