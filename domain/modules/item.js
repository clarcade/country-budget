var express = require('express');
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

          // Insert item into database
          var mongo_client = require('mongodb').MongoClient;
          var url = 'mongodb://localhost:27017/test';

          mongo_client.connect(url, function (err, db) {
            // Check if failed to connect to db
            if (err) {
              console.log("err: ", err);
              res.status(500).send('Failed to add item.');
            } else {
              //if (db_item.budgets) {
              //  // TODO: if item touches budgets, update the budgets then save the item to db
              //  updateBudgets(db_item.budgets);
              //
              //  var cursor = db.collection('budgets').find( { "name":  } );
              //  cursor.each(function(err, doc) {
              //    if (err) {
              //      console.log("err: ", err);
              //      db.close();
              //      res.send("Couldn't retrieve user items");
              //    } else if (doc != null) {
              //      user_items.push(doc);
              //    } else {
              //      console.log("user_items: ", user_items);
              //      db.close();
              //      res.send(user_items);
              //    }
              //  });
              //} else {
              // otherwise, just save item to db
              db.collection('items').insertOne(
                db_item,
                function(err, result) {
                  if (err) {
                    console.log("err: ", err);
                    res.status(500).send('Failed to add item.');
                  } else {
                    res.send(db_item);
                  }

                  db.close();
                }
              );
              //}
            }
          });
        }
      }
    }
  });

module.exports = item_router;
