var EXPRESS = require('express');

var API_ROUTER = (function(express) {
  var api_router = express.Router({mergeParams: true});

  // MIDDLEWARE
  api_router.use(function (req, res, next) {
    console.log("API ROUTER.");
    next();
  });

  // Webpage for List of APIs
  api_router.route('/')
    .get(function (req, res) {
      res.render('api');
    });

  api_router.use('/user', require('./user.js'));

  return api_router;
})(EXPRESS);

module.exports = API_ROUTER;
