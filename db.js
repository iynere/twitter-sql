const pg = require('pg');
// protocol - address - database
const client = new pg.Client('postgres://localhost/twitter');
client.connect();
// make sure Postrgres is running

// get everything from users table
client.query('SELECT * FROM users', (err, data) => {
	if (err) console.error(err);
	else data.rows.forEach(rowObj => {
		console.log(rowObj);
	});
});

// remember you're using PostgreSQL, not SQLite, each a diferent dialect of SQL; check 'returning' keyword (after INSERT, UPDATE, etc.)