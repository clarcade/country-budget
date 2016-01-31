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
      res.render('/docs/docs'); // TODO: FIX AS IT'S NOT WORKING
    });

  api_router.use('/authenticate', require('./authenticate.js'));
  api_router.use('/account', require('./account.js'));
  api_router.use('/space', require('./space.js'));
  api_router.use('/user', require('./user.js'));

  return api_router;
})(EXPRESS);

module.exports = API_ROUTER;
