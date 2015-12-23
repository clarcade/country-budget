var body_parser = require('body-parser');
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 3000));
app.set('views', __dirname + '/public/views');
app.set('view engine', 'ejs');

function startServer() {
  app.use(body_parser.json()); // support json encoded bodies
  app.use(body_parser.urlencoded({extended: true})); // support encoded bodies
  app.use('/static', express.static('public'));

  app.route('/')
    .get(function (req, res) {
      res.render('index');
    });

  var getstarted_router = require('./domain/modules/getstarted');
  app.use('/getstarted', getstarted_router);

  var register_router = require('./domain/modules/register');
  app.use('/register', register_router);

  var signin_router = require('./domain/modules/signin');
  app.use('/signin', signin_router);

  //var item_router = require('./domain/modules/item');
  //app.use('/user/:user_id/item', item_router);

  app.listen(app.get('port'), function () {
    console.log("Node app is running on port", app.get('port'));
  });
}

startServer();
