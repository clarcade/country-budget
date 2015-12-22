var body_parser = require('body-parser');
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 3000));

function startServer() {
  app.use(body_parser.json()); // support json encoded bodies
  app.use(body_parser.urlencoded({extended: true})); // support encoded bodies
  app.use('/static', express.static('public'));

  app.route('/')
    .get(function (req, res) {
      res.sendFile(__dirname + '/public/views/index.html');
    });

  //app.route('/getstarted')
  //  .get(function (req, res) {
  //    res.sendFile(__dirname + '/public/views/getstarted.html');
  //  });
  //
  //app.route('/registerPersonal')
  //  .get(function (req, res) {
  //    res.sendFile(__dirname + '/public/views/registerPersonal.html');
  //  });

  //app.route('/signin')
  //  .get(function (req, res) {
  //    res.sendFile(__dirname + '/public/views/signin.html');
  //  });

  var getstarted_router = require('./domain/modules/getstarted');
  app.use('/getstarted', getstarted_router);

  var register_router = require('./domain/modules/register');
  app.use('/register', register_router);

  //var signin_router = require('./domain/modules/signin');
  //app.use('/signin', signin_router);

  //var item_router = require('./domain/modules/item');
  //app.use('/user/:user_id/item', item_router);
  //
  //var budget_router = require('./domain/modules/budget');
  //app.use('/user/:user_id/budget', budget_router);
  //
  //var items_router = require('./domain/modules/items');
  //app.use('/user/:user_id/items', items_router);
  //
  //var budgets_router = require('./domain/modules/budgets');
  //app.use('/user/:user_id/budgets', budgets_router);

  //app.listen(3000, function () {
  //  console.log("started server");
  //});
  app.listen(app.get('port'), function () {
    console.log("Node app is running on port", app.get('port'));
  });
}

startServer();
