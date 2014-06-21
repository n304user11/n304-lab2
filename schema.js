var pg = require('pg').native
  , connectionString = process.env.DATABASE_URL
  , client
  , query;

client = new pg.Client(connectionString);
client.connect();
query = client.query('CREATE TABLE events (EventName varchar(50), date varchar(50), people varchar(255), description varchar(max))');

'create table query(userID varchar(50), email varchar(255),
user varchar(50), pass varchar(50), name varchar(100), country varchar(255));'

query.on('end', function(result) { client.end(); });