const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    PUBLISHER_ID: {
      type: String,
      trim: true,
    },
    PUBLISHER_NAME: {
      type: String,
      trim: true,
    },
  },
  {
    collection: 'publishers',
  }
);

module.exports = mongoose.model('publishersStore', schema);
