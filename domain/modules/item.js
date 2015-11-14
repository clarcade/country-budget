var express = require('express');
var item_service = require('../services/itemService.js');
var item_router = express.Router({mergeParams: true});

item_router.route('/')
  .post(function (req, res) {
    if (!req.params.user_id || typeof Number(req.params.user_id) !== 'number') {
      console.log("Request missing valid user id");
      res.status(500).send('User id missing or invalid');
    } else if (!req.body) {
      console.log("Error: request missing body.");
      res.status(500).send("Couldn't save item.");
    } else {
      var user_id = Number(req.params.user_id);
      var response_item = req.body;
      var db_item = {};

      if (!response_item.name) {
        res.status(500).send('Item missing name.');
      } else if (!response_item.value) {
        res.status(500).send('Item missing value.');
      } else if (!response_item.revenue_type) {
        res.status(500).send('Item missing revenue type.');
      } else if (!response_item.item_type) {
        res.status(500).send('Item missing item type.');
      } else if (!response_item.template_type) {
        res.status(500).send('Item missing template type.');
      } else if (!response_item.start_date) {
        res.status(500).send('Item missing start date.');
      } else if (!response_item.recurrence_type) {
        res.status(500).send('Item missing recurrence_type.');
      } else {
        var is_valid = true;

        if (response_item.recurrence_type !== 'None') {
          if (!response_item.recurrence_end_type) {
            is_valid = false;
            res.status(500).send('Item missing recurrence end type');
          } else {
            if ((response_item.recurrence_end_type === 'With End Date') &&
              (!response_item.end_date)) {
              is_valid = false;
              res.status(500).send('Item missing end date.');
            } else {
              db_item.end_date = response_item.end_date;
            }
          }
        }

        if ((response_item.revenue_type === 'Expense') &&
          (response_item.budgets) &&
          (response_item.budgets.length > 0)) {
          // TODO: validate budgets array
          db_item.budgets = response_item.budgets;
        }

        if (is_valid) {
          db_item.name = response_item.name;
          db_item.value = response_item.value;
          db_item.revenue_type = response_item.revenue_type;
          db_item.item_type = response_item.item_type;
          db_item.template_type = response_item.template_type;
          db_item.start_date = response_item.start_date;
          db_item.recurrence_type = response_item.recurrence_type;

          db_item.user_id = user_id;

          try {
            var promise = item_service.addItem(db_item);
            promise.then(
              function (item) {
                res.send(item);
              },
              function (err) {
                console.log("Error: ", err);
                res.status(500).send("Failed to add item");
              }
            )
          } catch (err) {
            console.log("Error: ", err);
            res.status(500).send("Failed to add item");
          }
        }
      }
    }
  });

module.exports = item_router;
