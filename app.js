var express = require('express');
var rethinkdb = require('rethinkdb');
var app = express();

var connection = null;

// Just to show rethinkdb is working.
rethinkdb.connect(
  {
    host: 'localhost',
    port: 28015
  },
  function (err, conn) {
    if (err) {
      throw err;
    }
    connection = conn;
  }
);

app.use(express.static('assets'));
app.use(express.static('assets'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.route('/book')
  .get(function (req, res) {
    rethinkdb.table('tv_shows') // just to show rethinkdb is working.
      .run(connection, function (err, cursor) {
        if (err) {
          throw err;
        }
        cursor.toArray(function (err, result) {
          if (err) {
            throw err;
          }
          console.log(JSON.stringify(result, null, 2));
        })
      });

    res.send('Get a random book');
  })
  .post(function (req, res) {
    res.send('Add a book');
  })
  .put(function (req, res) {
    res.send('Update the book');
  });

var server = app.listen(8000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
