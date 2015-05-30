//app.factory('MortgageService', ['Restangular', function(Restangular) {
app.factory('MortgageService', function() {
    var mortgage_service = {};

    mortgage_service.calculateMonthlyPayments = function(mortgage_data) {
        mortgage_data.monthly_payments = null;

        var num_monthly_payments = mortgage_data.years_to_payoff_loan * 12;
        var r = mortgage_data.monthly_interest_rate / 12 / 100;
        mortgage_data.monthly_payments = (r * (mortgage_data.principal - mortgage_data.down_payment)) /
            (1 - Math.pow((1 + r), -num_monthly_payments));

        return mortgage_data;
   };

    mortgage_service.validate = function(mortgage_data) {
        mortgage_data.valid = false;

        if (angular.isNumber(mortgage_data.principal) &&
            angular.isNumber(mortgage_data.years_to_payoff_loan) &&
            angular.isNumber(mortgage_data.monthly_interest_rate) &&
            angular.isNumber(mortgage_data.down_payment)) {
            mortgage_data.valid = true;
        }

        return mortgage_data;
    };

   return mortgage_service;
});
