var express = require('express');
var item_service = require('../services/itemService.js');
var item_router = express.Router({mergeParams: true});

item_router.route('/')
  .post(function (req, res) {
    var user_id = Number(req.params.user_id);
    var response_item = req.body;
    var db_item = {};

    if (!user_id) {
      console.error("Request missing valid user id");
      res.status(500).send('User id missing.');
    } else if (typeof Number(user_id) !== 'number') {
      res.status(500).send('User id invalid');
    } else if (!response_item) {
      console.error("Error: Missing item.");
      res.status(500).send("Couldn't save item.");
    } else if (typeof(response_item) !== 'object') {
      console.error("Error: Item is not an object.");
      res.status(500).send("Couldn't save item.")
    } else if (!response_item.name) {
      console.error("Error: Item missing name.");
      res.status(500).send('Item missing name.');
    } else if (typeof(response_item.name) !== 'string') {
      console.error("Error: Item's name must be a string.");
      res.status(500).send("Item's name must be a string.")
    } else if (response_item.name === "") {
      console.error("Error: Item missing name.");
      res.status(500).send('Item missing name.');
    } else if (!response_item.value) {
      console.error("Error: Item missing value.");
      res.status(500).send('Item missing value.');
    } else if (!response_item.revenue_type) {
      console.error("Error: Item missing revenue type.");
      res.status(500).send('Item missing revenue type.');
    } else if (!response_item.item_type) {
      console.error("Error: Item missing item type.");
      res.status(500).send('Item missing item type.');
    } else if (!response_item.template_type) {
      console.error("Error: Item missing template type.");
      res.status(500).send('Item missing template type.');
    } else if (!response_item.start_date) {
      console.error("Error: Item missing start date.");
      res.status(500).send('Item missing start date.');
    } else if (!response_item.recurrence_type) {
      console.error("Error: Item missing recurrence_type.");
      res.status(500).send('Item missing recurrence_type.');
    } else if (response_item.recurrence_type !== 'None' &&
               response_item.recurrence_type !== 'Bi-Weekly' &&
               response_item.recurrence_type !== 'Monthly' &&
               response_item.recurrence_type !== 'Yearly') {
      console.error("Error: recurrence_type unknown");
      res.status(500).send("Specified recurrence type unknown.");
    } else if (!response_item.budgets ||
               (typeof(response_item.budgets) !== 'object') ||
               (typeof(response_item.budgets.length) !== 'number') ||
               (response_item.budgets.length <= 0)) {
      db_item.budgets = response_item.budgets;
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

      if (is_valid) {
        db_item.name = response_item.name;
        db_item.value = response_item.value;
        db_item.revenue_type = response_item.revenue_type;
        db_item.item_type = response_item.item_type;
        db_item.template_type = response_item.template_type;
        db_item.start_date = response_item.start_date;
        db_item.recurrence_type = response_item.recurrence_type;
        db_item.budgets = response_item.budgets;

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
  });

module.exports = item_router;
