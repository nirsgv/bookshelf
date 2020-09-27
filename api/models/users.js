const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const schema = new mongoose.Schema(
  {
    USER_ID: {
      type: String,
      trim: true,
    },
    FULL_NAME: {
      type: String,
      trim: true,
    },
    CREATED_AT: {
      type: Date,
      trim: true,
    },
    PURCHASED_BOOKS: {
      type: [String],
      trim: true,
    },
    PASSWORD: {
      type: String,
      trim: true,
    },
  },
  {
    collection: 'bookstore_db',
  }
);

module.exports = mongoose.model('usersModel', schema);
