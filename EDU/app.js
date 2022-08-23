const express = require('express');
const ejs = require('ejs');

const app = express();

app.get('/', (req, res) => {
    res.status(200).send('INDEX');
});

const port = 3000;
app.listen(port, () => {
    console.log('Live!!');
});
