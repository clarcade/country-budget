var q = require('q');
var DB_SERVICE = require('./dbService.js');

var ITEMS_SERVICE = (function (items_service,
                               q,
                               db_service) {
  items_service.getUserItems = function (user_id) {
    var deferred = q.defer();

    db_service.getItemsCollection().then(
      function (items_collection) {
        var user_items = [];
        var cursor = items_collection.find( { "user_id": user_id } );
        cursor.each(function(err, doc) {
          if (err) {
            deferred.reject(err);
          } else if (doc != null) {
            user_items.push(doc);
          } else {
            deferred.resolve(user_items);
          }
        });
      },
      function (err) {
        deferred.reject(err);
      }
    );

    return deferred.promise;
  };

  return items_service;
}(ITEMS_SERVICE || {},
  q,
  DB_SERVICE));

module.exports = ITEMS_SERVICE;
