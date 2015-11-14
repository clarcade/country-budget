var q = require('q');

var ITEMS_SERVICE = (function (items_service, q) {
  items_service.getUserItems = function (user_id) {
    var deferred = q.defer();
    var mongo_client = require('mongodb').MongoClient;
    var url = 'mongodb://localhost:27017/test';

    mongo_client.connect(url, function (err, db) {
      if (err) {
        deferred.reject(err);
      } else {
        var user_items = [];
        var cursor = db.collection('items').find( { "user_id": user_id } );
        cursor.each(function(err, doc) {
          if (err) {
            db.close();
            deferred.reject(err);
          } else if (doc != null) {
            user_items.push(doc);
          } else {
            db.close();
            deferred.resolve(user_items);
          }
        });
      }
    });

    return deferred.promise;
  };

  return items_service;
}(ITEMS_SERVICE || {}, q));

module.exports = ITEMS_SERVICE;
