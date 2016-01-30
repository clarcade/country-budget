var EXPRESS = require('express');
var HELPERS = require('../helpers/helpers.js');
var JWT = require('jsonwebtoken');

var LIHP_ROUTER = (function(express,
                            helpers,
                            jwt) {
  var lihp_router = express.Router({mergeParams: true});

  lihp_router.use(function (req, res, next) {
    console.log('LIHP ROUTER.');

    var cookies = helpers.parseCookies(req);
    var token = cookies.token;

    if (token) {
      try {
        // Throws error if token isn't valid
        var decoded = jwt.verify(token, req.app.get('superSecret'));

        // if everything is good, save to request for use in other routes
        req.decoded = decoded; // NOT SURE IF THIS IS NEEDED
        next();
      } catch (err) {
        console.log("Error: ", err);

        var message = "Failed to authenticate token";

        if (err.name === 'JsonWebTokenError') {
          message = "Invalid Token";
        } else if (err.name === 'TokenExpiredError') {
          message = "Token Expired";
        }

        console.error(message);

        res.redirect('/signin');
      }
    } else {
      // NO TOKEN PROVIDED
      res.redirect('/signin');
    }
  });

  lihp_router.route('/')
    .get(function (req, res) {
      res.render('lihp');
    });

  return lihp_router;
})(EXPRESS,
  HELPERS,
  JWT);

module.exports = LIHP_ROUTER;
