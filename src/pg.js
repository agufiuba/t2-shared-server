var pg = require('pg');

var pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL
});

if (process.env.PROD == "true") {
	pg.defaults.ssl = true;
}
pool.connect(function(err, client,r) {
  if (err) throw err;
  console.log('Connected to postgres! Getting schemas...');

  // client
  //   .query('SELECT table_schema,table_name FROM information_schema.tables;')
  //   .on('row', function(row) {
  //     console.log(JSON.stringify(row));
  //   });
});

pool.end();
