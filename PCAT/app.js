const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');

const fs = require('fs');
const ejs = require('ejs');

const app = express();
const photoController = require('./controllers/photoController');
const pageController = require('./controllers/pageController');

mongoose.connect('mongodb://localhost/pcat-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//MIDDLEWARES
// const myLogger = (req, res, next) => {
//   console.log('middleware');
//   next();
// };
const uploadDir = 'public/uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
//TEMPLATE ENGINE
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());

app.get('/', photoController.getAllPhotos);
app.get('/photos/:id', photoController.getPhoto);
app.post('/photos', photoController.createPhoto);
app.put('/photos/:id', photoController.updatePhoto);
app.delete('/photos/:id', photoController.deletePhoto);

app.get('/about', pageController.getAboutPage);
app.get('/add', pageController.getAddPage);
app.get('/photos/edit/:id', pageController.getUpdatePage);


const port = 3000;
app.listen(port, () => {});
