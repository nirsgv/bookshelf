const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    WRITER_ID: {
      type: String,
      trim: true,
    },
    WRITER_NAME: {
      type: String,
      trim: true,
    },
  },
  {
    collection: 'writers',
  }
);

module.exports = mongoose.model('writersStore', schema);
