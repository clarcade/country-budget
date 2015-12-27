var Q = require('q');

var ACCOUNT_SERVICE = (function (account_service,
                                 q) {
  account_service.addAccount = function () { // TODO
    var deferred = q.defer();

    return deferred.promise;
  };

  return account_service;
})(ACCOUNT_SERVICE || {},
  Q);

module.exports = ACCOUNT_SERVICE;
