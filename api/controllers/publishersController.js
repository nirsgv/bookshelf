const publishersStore = require('../models/publishers');

// get all publishers
exports.getAllPublishers = (req, res) => {
  publishersStore.find({}, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json({ result, message: 'Returned all publishers' });
    }
  });
};

// get a single publisher
exports.getPublisherById = (req, res) => {
  const { id } = req.params;

  publishersStore.findOne({ PUBLISHER_ID: id }, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json({ result, message: 'Returned a publisher' });
    }
  });
};
