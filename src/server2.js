const express = require('express');
const app = express();

const dummy = { a: 1, b: 2, c: 3 };

app.get('/hey', (req, res) => res.send('Yo!'));
console.log('hey');
app.listen(8080);
