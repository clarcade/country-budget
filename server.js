var body_parser = require('body-parser');
var express = require('express');
var app = express();

// Use this to drop 'items' collection
//var mongo_client = require('mongodb').MongoClient;
//var url = 'mongodb://localhost:27017/test';
//mongo_client.connect(url, function (err, db) {
//  db.collection('items').drop(function(err, response) {
//    console.log(response)
//  });
//});

app.use(body_parser.json()); // support json encoded bodies
app.use(body_parser.urlencoded({ extended: true })); // support encoded bodies
app.use('/static', express.static('public'));

app.route('/')
  .get(function (req, res) {
    res.sendFile(__dirname + '/public/views/index.html');
  });

var item_router = require('./domain/modules/item');
app.use('/user/:user_id/item', item_router);

var budget_router = require('./domain/modules/budget');
app.use('/user/:user_id/budget', budget_router);

var items_router = require('./domain/modules/items');
app.use('/user/:user_id/items', items_router);

var budgets_router = require('./domain/modules/budgets');
app.use('/user/:user_id/budgets', budgets_router);

app.listen(3000, function () {
  console.log("started server");
});
