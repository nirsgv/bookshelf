const express = require('express');
const app = express();
const path = require('path');
const compression = require('compression');
const booksController = require('./controllers/booksController');
const usersController = require('./controllers/usersController');
const publishersController = require('./controllers/publishersController');
const writersController = require('./controllers/writersController');
const mongoose = require('mongoose');
app.use(express.static(path.resolve(__dirname + '/../build')));
require('dotenv').config({
  path: path.resolve(__dirname + '/../.env'),
});
const cors = require('cors');
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
connection.on('error', (err) => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});
mongoose.Promise = global.Promise; // Tells Mongoose to use ES6 promises

app.disable('x-powered-by');
app.use(compression());
app.use(morgan('common'));
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/api/books', booksController.getBooks);
app.get('/api/book/:id', booksController.getBook);
app.delete(
  '/api/remove/:id',
  usersController.verifyToken,
  booksController.removeBook
);
app.post('/api/add', usersController.verifyToken, booksController.addBook);
app.post(
  '/api/purchase',
  usersController.verifyToken,
  usersController.purchaseBook
);
app.delete(
  '/api/removepurchaseditem',
  usersController.verifyToken,
  usersController.removePurchaseOnServer
);
app.put('/api/update', usersController.verifyToken, booksController.updateBook);
app.get('/api/bookbytitle/:title', booksController.searchBookByTitle);
app.get('/api/bookbyid/:id', booksController.searchBookById);
app.post('/api/login', usersController.authenticateUser);

app.get('/api/getpublishers', publishersController.getAllPublishers);
app.get('/api/publisher/:id', publishersController.getPublisherById);

app.get('/api/getwriters', writersController.getAllWriters);
app.get('/api/writer/:id', writersController.getWriterById);

app.get('/', function (req, res) {
  return res.sendFile(path.resolve(__dirname + '/../build/index.html'));
});

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log('server started');
});
