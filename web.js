var express = require('express')
  , app = express.createServer(express.logger())
  , pg = require('pg').native
  , connectionString = process.env.DATABASE_URL
  , port = process.env.PORT
  , client;

client = new pg.Client(connectionString);
client.connect();

app.get('/', function(req, res) {
    
  query = client.query('SELECT * FROM events where eventid=1');
  query.on('row', function(result) {
    console.log(result);

    if (!result) {
      return res.send('No data found');
    } else {
      res.send('Event name: ' + result);
    }
  });
});

app.listen(port, function() {
  console.log('Listening on:', port);
});
