var Q = require('q');
var VALIDATOR = require('validator');

var HELPERS = (function (helpers,
                         q,
                         validator) {
  helpers.sanitizeEmail = function (email) {
    var trimmed_email = validator.trim(email);
    var trimmed_and_escaped_email = validator.escape(trimmed_email);
    var sanitized_email = validator.normalizeEmail(trimmed_and_escaped_email);

    return sanitized_email;
  };

  // Code from http://stackoverflow.com/questions/3393854/get-and-set-a-single-cookie-with-node-js-http-server
  helpers.parseCookies = function (request) {
    var list = {}
      , rc = request.headers.cookie;

    rc && rc.split(';').forEach(function( cookie ) {
      var parts = cookie.split('=');
      list[parts.shift().trim()] = decodeURI(parts.join('='));
    });

    return list;
  };

  return helpers;
})(HELPERS || {},
  Q,
  VALIDATOR);

module.exports = HELPERS;
