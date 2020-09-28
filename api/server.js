const express = require('express');
const app = express();
const path = require('path');
const jwt = require('jsonwebtoken');

app.use(express.static(path.resolve(__dirname + '/../build')));
// require('dotenv').config();
require('dotenv').config({
  path: path.resolve(__dirname + '/../.env'),
});
console.log(process.env.DATABASE);
// console.log(process.env.REACT_APP_DATABASE);
const booksController = require('./controllers/booksController');
const usersController = require('./controllers/usersController');
const mongoose = require('mongoose');
const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan');
const normalizePort = (port) => parseInt(port, 10);
const PORT = normalizePort(process.env.PORT || 8000);
const dev = app.get('env') !== 'production';
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
});
const connection = mongoose.connection;
connection.once('open', function () {
  console.log(`Connection with MongoDB was successful :smile:`);
});
app.get('/hey', (req, res) => res.send('Yo!'));

mongoose.Promise = global.Promise; // Tells Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});
console.log({ 'process.env.NODE_ENV': process.env.NODE_ENV, PORT });

app.disable('x-powered-by');
app.use(compression());
app.use(morgan('common'));
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/api/books', tmpMiddle, booksController.getBooks);
app.get('/api/book/:id', booksController.getBook);
app.delete(
  '/api/remove/:id',
  usersController.verifyToken,
  booksController.removeBook
);
app.post('/api/add', booksController.addBook);
app.put('/api/update', booksController.updateBook);
app.get('/api/bookbytitle/:title', booksController.searchBookByTitle);
app.get('/api/bookbyid/:id', booksController.searchBookById);

app.post('/api/login', usersController.authenticateUser);

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

function tmpMiddle(req, res, next) {
  //Get auth header value
  console.log('wedwedwef');
  next();
}

app.get('/about', function (req, res) {
  return res.sendFile(path.resolve(__dirname + '/../build/index.html'));
});
app.get('/track/*', function (req, res) {
  return res.sendFile(path.resolve(__dirname + '/../build/index.html'));
});
app.get('/concert/*', function (req, res) {
  return res.sendFile(path.resolve(__dirname + '/../build/index.html'));
});
app.get('/editorial', function (req, res) {
  return res.sendFile(path.resolve(__dirname + '/../build/index.html'));
});

app.get('/shows', function (req, res) {
  return res.sendFile(path.resolve(__dirname + '/../build/index.html'));
});

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log('server started');
});
