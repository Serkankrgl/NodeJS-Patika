const Photo = require('../models/Photo');
exports.getUpdatePage = async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  res.render('edit', { photo });
};

exports.getAddPage = (req, res) => {
  res.render('add');
};

exports.getAboutPage = (req, res) => {
  res.render('about');
};
