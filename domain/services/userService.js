var q = require('q');
var http = require('http');

var USER_SERVICE = (function (user_service,
                              q,
                              http) {
  user_service.createAccount = function () { // TODO
    var deferred = q.defer();

    return deferred.promise;
  };

  return user_service;
}(USER_SERVICE || {},
  q,
  http));

module.exports = USER_SERVICE;
