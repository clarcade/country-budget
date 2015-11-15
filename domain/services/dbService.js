var q = require('q');

var DB_SERVICE = (function (db_service, q) {
  db_service.getInstance = function () {
    var deferred = q.defer();
    var mongo_client = require('mongodb').MongoClient;
    var url = 'mongodb://localhost:27017/test';

    mongo_client.connect(url, function (err, db) {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(db);
      }
    });

    return deferred.promise;
  };

  return db_service;
}(DB_SERVICE || {}, q));

module.exports = DB_SERVICE;
