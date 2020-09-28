const bookStore = require('../models/books');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');

//import all of our models, a singleton is implemented, once this is required it is available throught the app

// get all books
exports.getBooks = (req, res) => {
  bookStore.find({}, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
};

// get book by id
exports.getBook = (req, res) => {
  const { id } = req.params;
  console.log(`func get book: ${id}`);
  bookStore.find({ BOOK_ID: id }, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      console.log(typeof result, result);
      res.json(result);
    }
  });
};

// delete a book
exports.removeBook = (req, res) => {
  console.log(req.decoded);
  const { id } = req.params;
  console.log(`func get book: ${id}`);
  if (req.decoded.role === 'Admin') {
    return bookStore.remove({ BOOK_ID: id }, function (err, result) {
      if (err) {
        res.send(err);
      } else {
        console.log(typeof result, result);
        res.json({ result, message: 'Deleted an item' });
      }
    });
  } else {
    res.status(403);
  }
};

// add a book
exports.addBook = (req, res) => {
  const { PRICE, WRITTEN_BY, PUBLISHED_BY, TITLE } = req.body;
  bookStore.create(
    {
      BOOK_ID: uuidv4(),
      PRICE,
      WRITTEN_BY,
      PUBLISHED_BY,
      TITLE,
    },
    function (err, result) {
      if (err) {
        res.send(err);
      } else {
        console.log(typeof result, result);
        res.json(result);
      }
    }
  );
};

// update a book
exports.updateBook = (req, res) => {
  const { BOOK_ID, PRICE, WRITTEN_BY, PUBLISHED_BY, TITLE } = req.body;

  if (req.decoded.role === 'Admin') {
    bookStore.findOneAndUpdate(
      {
        BOOK_ID,
      },
      {
        PRICE,
        WRITTEN_BY,
        PUBLISHED_BY,
        TITLE,
      },
      function (err, result) {
        if (err) {
          res.send(err);
        } else {
          console.log(result);
          res.json(result);
        }
      }
    );
  } else {
    return res.status(403);
  }
};

// get book by id
exports.searchBookByTitle = (req, res) => {
  const { title } = req.params;
  const regPat = { $regex: title, $options: 'i' };

  bookStore.find({ TITLE: regPat }, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      console.log(typeof result, result);
      res.json(result);
    }
  });
};

// get book by id
exports.searchBookById = (req, res) => {
  const { id } = req.params;

  bookStore.find({ BOOK_ID: id }, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
};

exports.searchTracks = (req, res) => {
  const { filteredBySearch, searchArtistNames, searchTrackTitles } = req.body;
  let choice;
  const regPat = { $regex: filteredBySearch, $options: 'i' };
  if (
    (searchArtistNames && searchTrackTitles) ||
    (!searchArtistNames && !searchTrackTitles)
  ) {
    choice = {
      $or: [{ ARTIST_NAME: regPat }, { TRACK_TITLE: regPat }],
    };
  } else if (searchArtistNames) {
    choice = { ARTIST_NAME: regPat };
  } else {
    choice = { TRACK_TITLE: regPat };
  }
  tracksStore.find(choice, { ID: 1, _id: 0 }, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
};
