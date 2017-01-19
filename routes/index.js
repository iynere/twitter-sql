'use strict';
const express = require('express');
const router = express.Router();
// const tweetBank = require('../tweetBank');
const client = require('../db');

module.exports = io => {

	router.get('/', function(req, res, next) {

		client.query('SELECT * FROM tweets INNER JOIN users ON tweets.user_id = users.id', function (err, result) {
	  	if (err) return next(err); // pass errors to Express
	  	var tweets = result.rows;
	  	res.render('index', { title: 'Twitter.js', tweets: tweets, showForm: true });
		});
	});

	// single-user page
	router.get('/users/:username', (req, res, next) => {
		client.query('SELECT * FROM tweets, users WHERE tweets.user_id=users.id AND users.name=$1', [req.params.username], function(err, result) {
					if (err) return next(err);
					var tweetsForName = result.rows;
        	res.render('index', {
						title: 'Twitter.js',
						tweets: tweetsForName,
						showForm: true,
						username: req.params.username
					});
    })
	});

	// single-tweet page
	router.get('/tweets/:id', (req, res, next) => {
		client.query('SELECT * FROM tweets, users WHERE tweets.user_id=users.id AND tweets.id=$1', [req.params.id], function(err, result) {
					if (err) return next(err);
					var tweetsForID = result.rows;
        	res.render('index', {
						title: 'Twitter.js',
						tweets: tweetsForID,
						showForm: true,
						//username: tweetsForID.name //req.params.username
					});
    })
	});

	// create a new tweet
	router.post('/tweets', (req, res, next) => {
		const newTweet = client.query('INSERT INTO tweets (user_id, content) VALUES ($1, $2)', [1, req.body.text], function(err, result) {
			if (err) return next(err);
			console.log('reqbodytext', req.body.text);
			res.redirect('/');
		});
		// const newTweet = tweetBank.add(req.body.name, req.body.text);
		io.sockets.emit('new_tweet', newTweet);
	});

	// // replaced this hard-coded route with general static routing in app.js
	// router.get('/stylesheets/style.css', => (req, res, next){
	//   res.sendFile('/stylesheets/style.css', { root: __dirname + '/../public/' });
	// });

	return router;
};
