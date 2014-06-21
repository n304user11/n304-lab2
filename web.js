var express = require('express')
  , app = express.createServer(express.logger())
  , pg = require('pg').native
  , connectionString = process.env.DATABASE_URL
  , port = process.env.PORT
  , client;

client = new pg.Client(connectionString);
client.connect();

app.get('/', function(req, res) {
  
  var a = 'abc';
  var b = '01/01/2000';
  var c = 'a,b,c';
  var d = 'test';

  client.query('INSERT INTO events  (EventName) VALUES('abc')');
  
  query = client.query('SELECT * FROM events');
  query.on('row', function(result) {
    console.log(result);

    if (!result) {
      return res.send('No data found');
    } else {
      res.send('Event name: ' + result.EventName);
    }
  });
});

app.listen(port, function() {
  console.log('Listening on:', port);
});
