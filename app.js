'use strict';
const express = require('express');
const app = express();
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const makesRouter = require('./routes');
const fs = require('fs');
const path = require('path');
const mime = require('mime');
const bodyParser = require('body-parser');
const socketio = require('socket.io');

// templating boilerplate setup
app.engine('html', nunjucks.render); // how to render html templates
app.set('view engine', 'html'); // what file extension do our templates have
nunjucks.configure('views', { noCache: true }); // where to find the views, caching off

// logging middleware
app.use(morgan('dev'));

// body parsing middleware
app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
app.use(bodyParser.json()); // would be for AJAX requests


// start the server
const server = app.listen(1337, () => console.log('listening on port 1337'));
const io = socketio.listen(server);

app.use(express.static(path.join(__dirname, '/public')));

// modular routing that uses io inside it
app.use('/', makesRouter(io));

// // manually-written static file middleware
// app.use((req, res, next) => {
//   const mimeType = mime.lookup(req.path);
//   fs.readFile('./public' + req.path, (err, fileBuffer) => {
//     if (err) return next();
//     res.header('Content-Type', mimeType);
//     res.send(fileBuffer);
//   });
// });
