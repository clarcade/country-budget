var body_parser = require('body-parser');
var express = require('express');
var app = express();

// Use this to drop 'items' collection
//var mongo_client = require('mongodb').MongoClient;
//var url = 'mongodb://localhost:27017/test';
//mongo_client.connect(url, function (err, db) {
//  db.collection('items').drop(function(err, response) {
//    console.log(response)
//  });
//});

app.use(body_parser.json()); // support json encoded bodies
app.use(body_parser.urlencoded({ extended: true })); // support encoded bodies
app.use('/static', express.static('public'));
//app.use('/assets', express.static('assets'));
//app.use('/controllers', express.static('controllers'));
//app.use('/services', express.static('services'));
//app.use('/views', express.static('views'));

app.route('/')
  .get(function (req, res) {
    res.sendFile(__dirname + '/public/views/index.html');
  });

// THIS IS TEMPORARY. REPLACE BACKEND STUFF WITH BACKEND IMPLEMENTATION SUCH AS countrybudget-domain
app.route('/user/:user_id/item')
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

app.route('/user/:user_id/budget')
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

app.route('/user/:user_id/items')
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
        var mongo_client = require('mongodb').MongoClient;
        var url = 'mongodb://localhost:27017/test';

        mongo_client.connect(url, function (err, db) {
          if (err) {
            console.log("err: ", err);
            res.status(500).send("Couldn't retrieve user items.");
          } else {
            var user_items = [];
            var cursor = db.collection('items').find( { "user_id": user_id } );
            cursor.each(function(err, doc) {
              if (err) {
                console.log("err: ", err);
                db.close();
                res.send("Couldn't retrieve user items");
              } else if (doc != null) {
                user_items.push(doc);
              } else {
                console.log("user_items: ", user_items);
                db.close();
                res.send(user_items);
              }
            });
          }
        });
      }
    }
  });

app.route('/user/:user_id/budgets')
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
        var mongo_client = require('mongodb').MongoClient;
        var url = 'mongodb://localhost:27017/test';

        mongo_client.connect(url, function (err, db) {
          if (err) {
            console.log("err: ", err);
            res.status(500).send("Couldn't retrieve user budgets.");
          } else {
            var user_budgets = [];
            var cursor = db.collection('budgets').find( { "user_id": user_id } );
            cursor.each(function(err, doc) {
              if (err) {
                console.log("err: ", err);
                db.close();
                res.send("Couldn't retrieve user budgets");
              } else if (doc != null) {
                user_budgets.push(doc);
              } else {
                console.log("user_budgets: ", user_budgets);
                db.close();
                res.send(user_budgets);
              }
            });
          }
        });
      }
    }
  });

app.listen(3000, function () {
  console.log("started server");
});
