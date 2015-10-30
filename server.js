var body_parser = require('body-parser');
var express = require('express');
var app = express();

app.use(body_parser.json()); // support json encoded bodies
app.use(body_parser.urlencoded({ extended: true })); // support encoded bodies
app.use('/assets', express.static('assets'));
app.use('/controllers', express.static('controllers'));
app.use('/services', express.static('services'));
app.use('/views', express.static('views'));

app.route('/')
  .get(function (req, res) {
    console.log("Serving index file.");
    res.sendFile(__dirname + '/views/index.html');
  });

app.route('/user/:user_id/item')
  .post(function (req, res) {
    var item = req.body;
    console.log("item: ", item);
    res.send(item);
  });

app.listen(3000, function () {
  console.log("started server");
});
