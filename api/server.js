const express = require('express');
const app = express();
const path = require('path');
const router = require('express').Router();
app.use(express.static(path.resolve(__dirname + '/../build')));
require('dotenv').config({
  path: path.resolve(__dirname + '/../.env'),
});
const booksController = require('./controllers/booksController');
const usersController = require('./controllers/usersController');
const publishersController = require('./controllers/publishersController');
const writersController = require('./controllers/writersController');
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

router.get('/api/books', booksController.getBooks);
router.get('/api/book/:id', booksController.getBook);
router.delete(
  '/api/remove/:id',
  usersController.verifyToken,
  booksController.removeBook
);
router.post('/api/add', usersController.verifyToken, booksController.addBook);
router.post(
  '/api/purchase',
  usersController.verifyToken,
  usersController.purchaseBook
);
router.delete(
  '/api/removepurchaseditem',
  usersController.verifyToken,
  usersController.removePurchaseOnServer
);
router.put(
  '/api/update',
  usersController.verifyToken,
  booksController.updateBook
);
router.get('/api/bookbytitle/:title', booksController.searchBookByTitle);
router.get('/api/bookbyid/:id', booksController.searchBookById);
router.post('/api/login', usersController.authenticateUser);

router.get('/api/getpublishers', publishersController.getAllPublishers);
router.get('/api/publisher/:id', publishersController.getPublisherById);

router.get('/api/getwriters', writersController.getAllWriters);
router.get('/api/writer/:id', writersController.getWriterById);

router.get('/', function (req, res) {
  return res.sendFile(path.resolve(__dirname + '/../build/index.html'));
});

router.listen(PORT, (err) => {
  if (err) throw err;
  console.log('server started');
});
