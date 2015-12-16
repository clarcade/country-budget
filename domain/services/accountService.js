var q = require('q');
var http = require('http');

var ACCOUNT_SERVICE = (function (account_service,
                                 q,
                                 http) {
  account_service.createAccount = function () { // TODO
    var deferred = q.defer();

    return deferred.promise;
  };

  return account_service;
}(ACCOUNT_SERVICE || {},
  q,
  http));

module.exports = ACCOUNT_SERVICE;
