const pg = require('pg');
// protocol - address - database
const client = new pg.Client('postgres://localhost/twitterdb');
client.connect(err => {
	if (err) throw err;
});
// make sure Postrgres is running

//get everything from users table
// client.query('SELECT * FROM users', (err, data) => {
// 	if (err) console.error(err);
// 	else data.rows.forEach(rowObj => {
// 		console.log(rowObj);
// 	});
// });

// client.end(err => {
// 	if (err) throw err;
// });

module.exports = client;

// remember you're using PostgreSQL, not SQLite, each a diferent dialect of SQL; check 'returning' keyword (after INSERT, UPDATE, etc.)
