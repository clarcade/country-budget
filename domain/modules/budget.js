var express = require('express');
var budget_router = express.Router({mergeParams: true});

budget_router.route('/')
  .post(function (req, res) {
    if (!req.params.user_id || typeof Number(req.params.user_id) !== 'number') {
      console.log("Request missing valid user id");
      res.status(500).send('User id missing or invalid');
    } else if (!req.body) {
      console.log("Error: request missing body.");
      res.status(500).send("Couldn't save budget.");
    } else {
      var user_id = Number(req.params.user_id);
      var response_budget = req.body;
      var db_budget = {};

      if (!response_budget.name) {
        res.status(500).send('Item missing name.');
      } else if (!response_budget.value) {
        res.status(500).send('Item missing value.');
      } else if (!response_budget.start_date) {
        res.status(500).send('Item missing start date.');
      } else if (!response_budget.recurrence_type) {
        res.status(500).send('Item missing recurrence_type.');
      } else {
        var is_valid = true;

        if ((response_budget.recurrence_type !== 'None') &&
          (response_budget.recurrence_end_type === 'With End Date')) {
          if (!response_budget.end_date) {
            is_valid = false;
            res.status(500).send('Item missing end date.');
          } else {
            db_budget.end_date = response_budget.end_date;
          }
        }

        if (is_valid) {
          db_budget.name = response_budget.name;
          db_budget.value = response_budget.value;
          db_budget.current_value = response_budget.value;
          db_budget.start_date = response_budget.start_date;
          db_budget.recurrence_type = response_budget.recurrence_type;

          db_budget.user_id = user_id;

          // Insert item into database
          var mongo_client = require('mongodb').MongoClient;
          var url = 'mongodb://localhost:27017/test';

          mongo_client.connect(url, function (err, db) {
            if (err) {
              console.log("err: ", err);
              res.status(500).send('Failed to add budget.');
            } else {
              db.collection('budgets').insertOne(
                db_budget,
                function(err, result) {
                  if (err) {
                    console.log("err: ", err);
                    res.status(500).send('Failed to add budget.');
                  } else {
                    res.send(db_budget);
                  }

                  db.close();
                }
              );
            }
          });
        }
      }
    }
  });

module.exports = budget_router;
