var Q = require('q');
var MONGO = require('mongodb');
var CONFIG = require('../../config.js');

var DB_SERVICE = (function (db_service,
                            q,
                            mongo,
                            config) {
  var db = null;
  var main_deferred = q.defer();
  var main_promise = main_deferred.promise;
  var mongo_client = mongo.MongoClient;
  var url = config.database;
  var users_collection = null;
  var account_collection = null;
  //var items_collection = null;
  //var budgets_collection = null;
  var get_db_instance_deferred = null;
  var get_users_collection_deferred = null;
  var get_account_collection_deferred = null;
  //var get_items_collection_deferred = null;
  //var get_budgets_collection_deferred = null;

  mongo_client.connect(url, function (err, database) {
    if (err) {
      console.error(err);
      main_deferred.reject(err);
    } else {
      db = database;
      users_collection = db.collection('users');
      account_collection = db.collection('account');
      //items_collection = db.collection('items');
      //budgets_collection = db.collection('budgets');
      //console.log("Successfully connected to database and setup collections.");

      // Regular
      main_deferred.resolve();

      // Use this to drop all collections
      //dropAllCollections().then(
      //  function () {
      //    main_deferred.resolve();
      //  },
      //  function () {
      //    main_deferred.reject();
      //  }
      //);
    }
  });

  db_service.getDBInstance = function () {
    if (!get_db_instance_deferred) {
      get_db_instance_deferred = Q.defer();

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

  db_service.getUsersCollection = function () {
    if (!get_users_collection_deferred) {
      get_users_collection_deferred = Q.defer();

      main_promise.then(
        function () {
          get_users_collection_deferred.resolve(users_collection);
        },
        function (err) {
          get_users_collection_deferred.reject(err);
        }
      );
    }

    return get_users_collection_deferred.promise;
  };

  db_service.getAccountCollection = function () {
    if (!get_account_collection_deferred) {
      get_account_collection_deferred = Q.defer();

      main_promise.then(
        function () {
          get_account_collection_deferred.resolve(account_collection);
        },
        function (err) {
          get_account_collection_deferred.reject(err);
        }
      );
    }

    return get_account_collection_deferred.promise;
  };

  //db_service.getItemsCollection = function () {
  //  if (!get_items_collection_deferred) {
  //    get_items_collection_deferred = Q.defer();
  //
  //    main_promise.then(
  //      function () {
  //        get_items_collection_deferred.resolve(items_collection);
  //      },
  //      function (err) {
  //        get_items_collection_deferred.reject(err);
  //      }
  //    );
  //  }
  //
  //  return get_items_collection_deferred.promise;
  //};
  //
  //db_service.getBudgetsCollection = function () {
  //  if (!get_budgets_collection_deferred) {
  //    get_budgets_collection_deferred = Q.defer();
  //
  //    main_promise.then(
  //      function () {
  //        get_budgets_collection_deferred.resolve(budgets_collection);
  //      },
  //      function (err) {
  //        get_budgets_collection_deferred.reject(err);
  //      }
  //    );
  //  }
  //
  //  return get_budgets_collection_deferred.promise;
  //};

  // May not want to include in actual production code
  var dropCollectionByName = function (collection_name) {
    var deferred = Q.defer();

    if (db) {
      //console.log("attempting to drop: ", collection_name);
      db.collection(collection_name).drop(function (err, response) {
        if (err) {
          console.error("Couldn't drop collection: ", collection_name);
          deferred.reject(collection_name);
        } else {
          //console.log("Successfully dropped collection: ", collection_name);
          deferred.resolve(collection_name);
        }
      });
    } else {
      console.error("database connection not set");
      deferred.reject();
    }

    return deferred.promise;
  };

  // May not want to include in actual production code
  var dropAllCollections = function () {
    var deferred = Q.defer();

    if (db) {
      //console.log("Starting drop operation");
      var promises = [];
      var collection_deferred_map = {};
      var done_deferred = Q.defer(); // This will resolve when all promises have been added to promises[]

      db.listCollections().toArray(function (err, collections) {
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
                //console.log("collection name: ", collection_name);
                check_if_done++;
                var new_deferred = Q.defer();
                promises.push(new_deferred.promise);
                collection_deferred_map[collection_name] = new_deferred;

                // Check if all promises have been added

                if (future_promises_length === check_if_done) {
                  //console.log("resolving done_deferred");
                  done_deferred.resolve();
                }

                dropCollectionByName(collection_name).then(
                  function (collection_name) {
                    //console.log("resolving promise for collection: ", collection_name);
                    collection_deferred_map[collection_name].resolve();
                  },
                  function (collection_name) {
                    //console.log("rejecting promise for collection: ", collection_name);
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
          //console.log("Got to done_deferred success");
          Q.all(promises).then(
            function () {
              //console.log("Successfully dropped all collections.");
              deferred.resolve();
            },
            function () {
              console.error("Couldn't drop all collections.");
              deferred.reject();
            }
          );
        },
        function () {
          console.error("Got to done_deferred failed");
          deferred.reject();
        }
      );
    } else {
      console.error("database connection not set");
      deferred.reject();
    }

    return deferred.promise;
  };

  return db_service;
})(DB_SERVICE || {},
  Q,
  MONGO,
  CONFIG);

module.exports = DB_SERVICE;
