const tracksStore = require('../models/users');

exports.getTracks = (req, res) => {
  tracksStore.find({}, function (err, result) {
    if (err) {
      console.log('It was possible to retrieve these TRACKS');
      res.send(err);
    } else {
      //   console.log(typeof result, result);
      res.json(result);
    }
  });
};
