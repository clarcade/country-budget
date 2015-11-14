var express = require('express');
var budgets_service = require('../services/budgetsService.js');
var budgets_router = express.Router({mergeParams: true});

budgets_router.route('/')
  .get(function (req, res) {
    if (!req.params.user_id) {
      console.log("Request missing user id");
      res.status(500).send('User id missing');
    } else {
      var user_id = Number(req.params.user_id);

      if (typeof user_id !== 'number') {
        console.log("Request missing valid user id");
        res.status(500).send('User id is invalid');
      } else {
        try {
          var promise = budgets_service.getUserBudgets(user_id);
          promise.then(
            function (user_budgets) {
              res.send(user_budgets);
            },
            function (err) {
              console.log("Error: ", err);
              res.status(500).send("Couldn't retrieve user budgets");
            }
          );
        } catch (err) {
          console.log("Error: ", err);
          res.status(500).send("Couldn't retrieve user budgets");
        }
      }
    }
  });

module.exports = budgets_router;
