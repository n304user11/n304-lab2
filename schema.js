var pg = require('pg').native
  , connectionString = process.env.DATABASE_URL
  , client
  , query;

client = new pg.Client(connectionString);
client.connect();
query = client.query('CREATE TABLE events (EventName varchar(50), date varchar(50), people varchar(255), description varchar(255));');


query.on('end', function(result) { client.end(); });