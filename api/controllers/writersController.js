const writersStore = require('../models/writers');

// get all writers
exports.getAllWriters = (req, res) => {
  writersStore.find({}, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json({ result, message: 'Returned all writers' });
    }
  });
};

// get a single writer
exports.getWriterById = (req, res) => {
  const { id } = req.params;

  writersStore.findOne({ WRITER_ID: id }, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json({ result, message: 'Returned a writer' });
    }
  });
};
