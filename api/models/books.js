const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const schema = new mongoose.Schema(
  {
    BOOK_ID: {
      type: String,
      trim: true,
    },
    PRICE: {
      type: Number,
      trim: true,
    },
    WRITTEN_BY: {
      type: String,
      trim: true,
    },
    PUBLISHED_BY: {
      type: String,
      trim: true,
    },
    TITLE: {
      type: String,
      trim: true,
    },
  },
  {
    collection: 'books',
  }
);

module.exports = mongoose.model('booksModel', schema);
