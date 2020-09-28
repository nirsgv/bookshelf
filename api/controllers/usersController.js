const usersStore = require('../models/users');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

const secret = 'asdl,a[c[psssf,12';

exports.authenticateUser = (req, res) => {
  const { email, password } = req.body;
  usersStore.find({ USER_ID: email, PASSWORD: password }, function (
    err,
    result
  ) {
    if (err) {
      res.send(err);
    } else {
      if (result.length > 0) {
        const user = result[0];
        const token = jwt.sign({ id: user.USER_ID, role: user.ROLE }, secret, {
          expiresIn: 300,
        });
        console.log(token);
        const returnedUser = {
          TOKEN: token,
          FULL_NAME: user.FULL_NAME,
          ROLE: user.ROLE,
          PURCHASED_BOOKS: user.PURCHASED_BOOKS,
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
