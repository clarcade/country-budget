var express = require('express');
var items_service = require('../services/itemsService.js');
var items_router = express.Router({mergeParams: true});

items_router.route('/')
  .get(function (req, res) {
    if (!req.params.user_id) {
      console.log("Request missing user id");
      res.status(500).send('User id missing');
    } else {
      var user_id = Number(req.params.user_id);

      if (typeof user_id !== 'number') {
        console.log("Request missing valid user id");
        res.status(500).send('User id is invalid');
      } else {
        try {
          var promise = items_service.getUserItems(user_id);
          promise.then(
            function (user_items) {
              res.send(user_items);
            },
            function (err) {
              console.log("Error: ", err);
              res.status(500).send("Couldn't retrieve user items");
            }
          );
        } catch (err) {
          console.log("Error: ", err);
          res.status(500).send("Couldn't retrieve user items");
        }
      }
    }
  });

module.exports = items_router;
