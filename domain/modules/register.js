var express = require('express');

var register_router = express.Router({mergeParams: true});

register_router.route('/')
  .post(function (req, res) {
    if (!req.body) {
      console.log("Error: request missing body.");
      res.status(500).send("Couldn't create new user/account.");
    } else {
      var response_data = req.body;

      if (!response_data.firstName) {
        res.status(500).send('Item missing first name.');
      } else if (!response_data.lastName) {
        res.status(500).send('Item missing last name.');
      } else if (!response_data.companyName) {
        res.status(500).send('Item missing company name.');
      } else if (!response_data.username) {
        res.status(500).send('Item missing username.');
      } else if (!response_data.password) {
        res.status(500).send('Item missing password.');
      } else {
        try {
          var account_data = {};
          account_data.type = response_data.type;
          account_data.name = response_data.accountName;

          var user_data = {};

          user_data.firstName = response_data.firstName;
          user_data.lastName = response_data.lastName;
          user_data.companyName = response_data.companyName;
          user_data.username = response_data.username;
          user_data.password = response_data.password;

          // TODO: Sanitize user input

          // TODO: Insert data into database

        } catch (err) {
          console.log("Error: ", err);
          res.status(500).send('Failed to register new user/account');
        }
      }
    }
  });

module.exports = register_router;
