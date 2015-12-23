var express = require('express');

var REGISTER_ROUTER = (function() {
  var register_router = express.Router({mergeParams: true});

  register_router.route('/')
    .get(function (req, res) {
      res.render('getstarted');
    });

  register_router.route('/personal')
    .get(function (req, res) {
      res.render('personal');
    })
    .post(function (req, res) {
      if (!req.body) {
        console.log("Error: request missing body.");
        res.status(500).send("Couldn't create new account/user.");
      } else {
        var response_data = req.body;

        if (!response_data.firstName) {
          res.status(500).send('Item missing first name.');
        } else if (!response_data.lastName) {
          res.status(500).send('Item missing last name.');
        } else if (!response_data.email) {
          res.status(500).send('Item missing email.');
        } else if (!response_data.password) {
          res.status(500).send('Item missing password.');
        } else {
          try {
            var first_name = response_data.firstName;
            var last_name = response_data.lastName;
            var email = response_data.email;
            var password = response_data.password;

            // TODO: Sanitize user input

            // TODO: Insert data into database

          } catch (err) {
            console.log("Error: ", err);
            res.status(500).send('Failed to register new user/account');
          }
        }
      }
    });

  register_router.route('/business')
    .get(function (req, res) {
      res.render('business');
    });

  function validateName(name) {

    return true;
  }

  return register_router;
})();

module.exports = REGISTER_ROUTER;
