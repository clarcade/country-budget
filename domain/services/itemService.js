var q = require('q');

var ITEM_SERVICE = (function (item_service, q) {
  item_service.addItem = function (item) {
    var deferred = q.defer();
    var mongo_client = require('mongodb').MongoClient;
    var url = 'mongodb://localhost:27017/test';

    mongo_client.connect(url, function (err, db) {
      // Check if failed to connect to db
      if (err) {
        deferred.reject(err);
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
          item,
          function(err, result) {
            if (err) {
              deferred.reject(err);
            } else {
              deferred.resolve(item);
            }

            db.close();
          }
        );
        //}
      }
    });

    return deferred.promise;
  };

  return item_service;
}(ITEM_SERVICE || {}, q));

module.exports = ITEM_SERVICE;
