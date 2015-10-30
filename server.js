var express = require('express');
var app = express();

app.use('/assets', express.static('assets'));
app.use('/controllers', express.static('controllers'));
app.use('/services', express.static('services'));
app.use('/views', express.static('views'));

app.route('/')
  .get(function (req, res) {
    console.log("Serving index file.");
    res.sendFile(__dirname + '/views/index.html');
  });

app.listen(3000, function () {
  console.log("started server");
});
