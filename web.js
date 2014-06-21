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
      res.send('Event name: ' + result.eventname + "<br></br>" + 'date: ' + result.date+ "<br></br>");
    }
  });
});

app.get('/', function(req, res) {
    
  query = client.query('SELECT * FROM events where eventid=2');
  query.on('row', function(result1) {
    console.log(result1);

    if (!result1) {
      return res.send('No data found');
    } else {
      res.send('Event name: ' + result1.eventname + "<br></br>" + 'date: ' + result1.date);
    }
  });
});

app.listen(port, function() {
  console.log('Listening on:', port);
});
