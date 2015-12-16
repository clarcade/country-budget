var express = require('express');
var account_service = require('../services/accountService.js');
var user_service = require('../services/userService.js');
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
        var is_valid = true;

        // TODO: more validation of user provided data

        if (is_valid) {
          try {
            var account_name = response_data.companyName;

            // TODO: add these services and their methods
            account_service.createAccount(account_name).then( // TODO
              addNewUser(account_id),
              createAccountFailed(err)
            ).then(
              sendSuccessResponse(),
              addUserFailed(err)
            );

            // Function Declarations
            function addNewUser(account_id) {
              var user_data = {};
              user_data.firstName = response_data.firstName;
              user_data.lastName = response_data.lastName;
              user_data.username = response_data.username;
              user_data.password = response_data.password;
              user_data.account_id = account_id;

              return user_service.addUser(user_data); // TODO
            }

            function createAccountFailed(err) {
              console.log("Error: ", err);
              res.status(500).send("Failed to add new account.");
            }

            function addUserFailed(err) {
              console.log("Error: ", err);
              res.status(500).send("Failed to add new user.");
            }

            function sendSuccessResponse() {
              res.send();
            }
          } catch (err) {
            console.log("Error: ", err);
            res.status(500).send('Failed to register new user/account');
          }
        }
      }
    }
  });

module.exports = register_router;
