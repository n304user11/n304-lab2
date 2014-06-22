var express = require('express')
  , app = express.createServer(express.logger())
  , pg = require('pg').native
  , connectionString = process.env.DATABASE_URL
  , port = process.env.PORT
  , client;

client = new pg.Client(connectionString);
client.connect();

app.get('/home', function(req, res) {
  var reply = '';
  query = client.query('SELECT * FROM events');
  query.on('row', function(result) {
    console.log(result);

    if (!result) {
      return res.send('No data found');
    } else {
      reply = reply + 'Event name: ' + result.eventname + '<br>';
    }
  });
  query.on('end', function() {
    res.send(reply);
  });
});

app.post('/home/create', function(req, res) {
  
  if(typeof(req.body.ename = "undefined") || typeof(req.body.dscri = "undefined")){
	 res.statusCode = 400;
    return res.send('Error 400: Post syntax incorrect.');  
  }
  
	var eventname = req.body.ename;
	var descr = req.body.dscri;
  
  query = client.query('insert into events (eventname, description)values ($1, $2)', [eventname, descr]);
  console.log("Added!");
  function (err, result) {
		done();
		if(err) return res.send(err);
		res.send('OK');
  }
  

});

app.listen(port, function() {
  console.log('Listening on:', port);
});
