const usersStore = require('../models/users');
const jwt = require('jsonwebtoken');

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
        const u = result[0];
        res.send(u);
        // jwt.sign({ user }, 'secretkey', (err, token) => {
        //   u.TOKEN = token;
        //   res.send(u);
        // });
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
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
};
