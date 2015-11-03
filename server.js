var body_parser = require('body-parser');
var express = require('express');
var app = express();

//var findRestaurants = function(db, callback) {
//  var cursor =db.collection('restaurants').find( { "borough": "Manhattan" } );
//  cursor.each(function(err, doc) {
//    assert.equal(err, null);
//    if (doc != null) {
//      console.dir(doc);
//    } else {
//      callback();
//    }
//  });
//};

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
app.use('/assets', express.static('assets'));
app.use('/controllers', express.static('controllers'));
app.use('/services', express.static('services'));
app.use('/views', express.static('views'));

app.route('/')
  .get(function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
  });

// THIS IS TEMPORARY. REPLACE BACKEND STUFF WITH BACKEND IMPLEMENTATION SUCH AS countrybudget-domain
app.route('/user/:user_id/item')
  //.get(function (req, res) {
  //  mongo_client.connect(url, function (err, db) {
  //    assert.equal(null, err);
  //    findRestaurants(db, function () {
  //      db.close();
  //    });
  //  });
  //})
  .post(function (req, res) {
    console.log("user_id: ", req.params.user_id);
    console.log("user_id type: ", typeof req.params.user_id);

    if (!req.params.user_id || typeof Number(req.params.user_id) !== 'number') {
      console.log("Request missing valid user id");
      res.status(500).send('User id missing or invalid');
    } else if (!req.body) {
      console.log("Error: request missing body.");
      res.status(500).send("Couldn't save item.");
    } else {
      var user_id = Number(req.params.user_id);
      var item = req.body;

      // Validate item
      if (!item.name) {
        res.status(500).send('Item missing name.');
      } else if (!item.value) {
        res.status(500).send('Item missing value.');
      } else if (!item.item_type) {
        res.status(500).send('Item missing item type.');
      } else if (!item.template_type) {
        res.status(500).send('Item missing template type.');
      } else if (!item.recurrence_type) {
        res.status(500).send('Item missing recurrence_type.');
      } else if (!item.date) {
        res.status(500).send('Item missing date.');
      } else {
        item.user_id = user_id;

        // Insert item into database
        var mongo_client = require('mongodb').MongoClient;
        var url = 'mongodb://localhost:27017/test';

        mongo_client.connect(url, function (err, db) {
          db.collection('items').insertOne(
            item,
            function(err, result) {
              if (err) {
                console.log("err: ", err);
                res.status(500).send('Failed to add item.');
              } else {
                res.send(item);
              }
            }
          );
        });
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
                res.send("Couldn't retrieve user items");
              }
              if (doc != null) {
                user_items.push(doc);
              } else {
                console.log("user_items: ", user_items);
                res.send(user_items);
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
