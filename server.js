var body_parser = require('body-parser');
var express = require('express');
var CONFIG = require('./config.js');
var app = express();

app.set('port', (process.env.PORT || 3000));
app.set('views', __dirname + '/public/views');
app.set('view engine', 'ejs');
app.set('superSecret', CONFIG.secret);

app.use(body_parser.json()); // support json encoded bodies
app.use(body_parser.urlencoded({extended: true})); // support encoded bodies
app.use('/static', express.static('public'));

app.route('/')
  .get(function (req, res) {
    res.render('index');
  });

app.use('/api', require('./domain/api/api'));
app.use('/docs', require('./domain/modules/docs'));
app.use('/getstarted', require('./domain/modules/getstarted'));
app.use('/register', require('./domain/modules/register'));
app.use('/signin', require('./domain/modules/signin'));
app.use('/lihp', require('./domain/modules/lihp'));
//app.use('/user/:user_id/item', require('./domain/modules/item'));

app.listen(app.get('port'), function () {
  console.log("Node app is running on port", app.get('port'));
});
