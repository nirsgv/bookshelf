const usersStore = require('../models/users');
const jwt = require('jsonwebtoken');

const secret = process.env.SECRET;

exports.authenticateUser = (req, res) => {
  const { email, password } = req.body;
  usersStore.findOne({ USER_ID: email, PASSWORD: password }, function (
    err,
    result
  ) {
    if (err) {
      res.send(err);
    } else {
      if (result) {
        const user = result;
        const token = jwt.sign({ id: user.USER_ID, role: user.ROLE }, secret, {
          expiresIn: 300,
        });
        console.log(token);
        const returnedUser = {
          TOKEN: token,
          FULL_NAME: user.FULL_NAME,
          ROLE: user.ROLE,
          PURCHASED_BOOKS: user.PURCHASED_BOOKS,
          USER_ID: user.USER_ID,
        };
        res.send(returnedUser);
      } else {
        res.send({ error_message: 'error in authenticating' });
      }
    }
  });
};

// Verify token middleware function
exports.verifyToken = (req, res, next) => {
  //Get auth header value
  const bearerHeader = req.headers['authorization'];

  if (typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(' ')[1];
    req.token = bearerToken;

    // console.log(bearerHeader);

    jwt.verify(bearerToken, secret, function (err, decoded) {
      if (err) {
        return res
          .status(403)
          .send({ auth: false, message: 'Failed to authenticate token.' });
      }
      // res.send
      req.decoded = decoded;
      next();
    });
  } else {
    // Forbidden
    res.sendStatus(403);
  }
};

// purchase a book
exports.purchaseBook = (req, res) => {
  const { bookId, userId, purchased } = req.body;
  let returnPurchased = [...purchased, bookId];

  if (req.decoded.role === 'User') {
    usersStore.findOneAndUpdate(
      { USER_ID: userId },
      { $push: { PURCHASED_BOOKS: bookId } },
      function (err, result) {
        if (err) {
          res.send(err);
        } else {
          res.json({ returnPurchased, message: 'Purchased an item' });
        }
      }
    );
  } else {
    res.status(403);
  }
};
