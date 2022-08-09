const express = require('express');
const path = require('path');
const app = express();
//MIDDLEWARES

// const myLogger = (req, res, next) => {
//   console.log('middleware');
//   next();
// };

app.use(express.static('public'));
app.use(myLogger);
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'views/index.html'));
});

const port = 3000;
app.listen(port, () => {});
