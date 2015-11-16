var q = require('q');
var mongo = require('mongodb');

var DB_SERVICE = (function (db_service,
                            mongo,
                            q) {
  var db = null;
  var main_deferred = q.defer();
  var main_promise = main_deferred.promise;
  var mongo_client = mongo.MongoClient;
  var url = 'mongodb://localhost:27017/test';
  var items_collection = null;
  var budgets_collection = null;
  var get_db_instance_deferred = null;
  var get_items_collection_deferred = null;
  var get_budgets_collection_deferred = null;

  mongo_client.connect(url, function (err, database) {
    if (err) {
      console.error(err);
      main_deferred.reject(err);
    } else {
      db = database;
      items_collection = db.collection('items');
      budgets_collection = db.collection('budgets');
      console.log("Successfully connected to database and setup collections.");
      main_deferred.resolve();
    }
  });

  db_service.getDBInstance = function () {
    if (!get_db_instance_deferred) {
      get_db_instance_deferred = q.defer();

      main_promise.then(
        function () {
          get_db_instance_deferred.resolve(db);
        },
        function (err) {
          get_db_instance_deferred.reject(err);
        }
      );
    }

    return get_db_instance_deferred.promise;
  };

  db_service.getItemsCollection = function () {
    if (!get_items_collection_deferred) {
      get_items_collection_deferred = q.defer();

      main_promise.then(
        function () {
          get_items_collection_deferred.resolve(items_collection);
        },
        function (err) {
          get_items_collection_deferred.reject(err);
        }
      );
    }

    return get_items_collection_deferred.promise;
  };

  db_service.getBudgetsCollection = function () {
    if (!get_budgets_collection_deferred) {
      get_budgets_collection_deferred = q.defer();

      main_promise.then(
        function () {
          get_budgets_collection_deferred.resolve(budgets_collection);
        },
        function (err) {
          get_budgets_collection_deferred.reject(err);
        }
      );
    }

    return get_budgets_collection_deferred.promise;
  };

  db_service.dropCollectionByName = function (collection_name) {
    console.log("dropCollectionByName");
    var deferred = q.defer();

    main_promise.then(
      function () {
        console.log("attempting to drop: ", collection_name);
        db.collection(collection_name).drop(function(err, response) {
          if (err) {
            console.error("Couldn't drop collection: ", collection_name);
            deferred.reject(collection_name);
          } else {
            console.log("Successfully dropped collection: ", collection_name);
            deferred.resolve(collection_name);
          }
        });
      },
      function (err) {
        console.error("Couldn't drop collection: ", collection_name);
        deferred.reject(collection_name);
      }
    );

    return deferred.promise;
  };

  db_service.dropAllCollections = function () {
    var deferred = q.defer();

    main_promise.then(
      function () {
        var promises = [];
        var collection_deferred_map = {};
        var done_deferred = q.defer(); // This will resolve when all promises have been added to promises[]

        db.listCollections().toArray(function(err, collections){
          if (err) {
            console.error(err);
            done_deferred.reject();
          } else {
            if (collections) {
              var future_promises_length = collections.length - 1; // Minus 1 for 'system.indexes' collection
              var check_if_done = 0;

              collections.forEach(function (collection) {
                if (collection.name && collection.name !== 'system.indexes') {
                  var collection_name = collection.name;
                  console.log("collection name: ", collection_name);
                  check_if_done++;
                  var new_deferred = q.defer();
                  promises.push(new_deferred.promise);
                  collection_deferred_map[collection_name] = new_deferred;

                  // Check if all promises have been added

                  if (future_promises_length === check_if_done) {
                    console.log("resolving done_deferred");
                    done_deferred.resolve();
                  }

                  db_service.dropCollectionByName(collection_name).then(
                    function (collection_name) {
                      console.log("resolving promise for collection: ", collection_name);
                      collection_deferred_map[collection_name].resolve();
                    },
                    function (collection_name) {
                      console.log("rejecting promise for collection: ", collection_name);
                      collection_deferred_map[collection_name].reject();
                    }
                  );
                }
              });
            } else {
              done_deferred.reject();
            }
          }
        });

        done_deferred.promise.then(
          function () {
            console.log("Got to done_deferred success");
            q.all(promises).then(
              function () {
                console.log("Successfully dropped all collections.");
                deferred.resolve();
              },
              function () {
                console.error("Couldn't drop all collections.");
                deferred.reject();
              }
            );
          },
          function () {
            console.log("Got to done_deferred failed");
            deferred.reject();
          }
        );
      },
      function () {
        console.error("Couldn't drop all collections.");
      }
    );

    return deferred.promise;
  };

  //db_service.dropItemsCollection = function () {
  //  var deferred = q.defer();
  //
  //  main_promise.then(
  //    function () {
  //      items_collection.drop(function(err, response) {
  //        if (err) {
  //          console.error("Couldn't drop items collection.");
  //          deferred.reject(err);
  //        } else {
  //          console.log("Successfully dropped items collection.");
  //          deferred.resolve(response);
  //        }
  //      });
  //    },
  //    function (err) {
  //      console.error("Couldn't drop items collection.");
  //      deferred.reject(err);
  //    }
  //  );
  //
  //  return deferred.promise;
  //};
  //
  //
  //db_service.dropBudgetsCollection = function () {
  //  var deferred = q.defer();
  //
  //  main_promise.then(
  //    function () {
  //      budgets_collection.drop(function(err, response) {
  //        if (err) {
  //          console.error("Couldn't drop budgets collection.");
  //          deferred.reject(err);
  //        } else {
  //          console.log("Successfully dropped budgets collection.");
  //          deferred.resolve(response);
  //        }
  //      });
  //    },
  //    function (err) {
  //      console.error("Couldn't drop budgets collection.");
  //      deferred.reject(err);
  //    }
  //  );
  //
  //  return deferred.promise;
  //};

  //db_service.dropAllCollections = function () {
  //  db_service
  //};

  return db_service;
}(DB_SERVICE || {},
  mongo,
  q));

module.exports = DB_SERVICE;
