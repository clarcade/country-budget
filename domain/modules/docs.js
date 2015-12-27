var EXPRESS = require('express');

var DOCS_ROUTER = (function(express) {
  var docs_router = express.Router({mergeParams: true});

  docs_router.route('/')
    .get(function (req, res) {
      res.render('docs/docs');
    });

  docs_router.route('/account')
    .get(function (req, res) {
      res.render('docs/account');
    });

  docs_router.route('/user')
    .get(function (req, res) {
      res.render('docs/user');
    });

  docs_router.route('/space')
    .get(function (req, res) {
      res.render('docs/space');
    });

  return docs_router;
})(EXPRESS);

module.exports = DOCS_ROUTER;
