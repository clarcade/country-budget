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

  return helpers;
})(HELPERS || {},
  Q,
  VALIDATOR);

module.exports = HELPERS;
