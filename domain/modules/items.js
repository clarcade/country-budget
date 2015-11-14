var express = require('express');
var items_router = express.Router({mergeParams: true});

items_router.route('/')
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

module.exports = items_router;
