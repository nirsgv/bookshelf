const mongoose = require('mongoose');

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
    PURCHASED_BOOKS: {
      type: [String],
      trim: true,
    },
    PASSWORD: {
      type: String,
      trim: true,
    },
    ROLE: {
      type: String,
      trim: true,
    },
  },
  {
    collection: 'users',
  }
);

module.exports = mongoose.model('usersModel', schema);
