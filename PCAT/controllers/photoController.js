const Photo = require('../models/Photo');
const fs = require('fs');

exports.getAllPhotos = async (req, res) => {
	const page = req.query.page || 1;
	const PhotosPerPage = 3;
	const totalPhotosCount = await Photo.find().countDocuments();
	const photos = await Photo.find({})
		.sort('-dateCreated')
		.skip((page - 1) * PhotosPerPage)
		.limit(PhotosPerPage);
	res.render('index', {
		photos,
		current: page,
		pages: Math.ceil(totalPhotosCount / PhotosPerPage),
	});
	//   console.log(req.query);
	//   const photos = await Photo.find({}).sort('-dateCreated');
	//   res.render('index', { photos });
};

exports.getPhoto = async (req, res) => {
	const photo = await Photo.findById(req.params.id);
	res.render('photo', { photo });
};

exports.createPhoto = (req, res) => {
	let uploadImage = req.files.image;
	let uploadPath = __dirname + '/../public/uploads/' + uploadImage.name;
	uploadImage.mv(uploadPath, async () => {
		await Photo.create({
			...req.body,
			image: '/uploads/' + uploadImage.name,
		});
	});

	res.redirect('/');
};

exports.deletePhoto = async (req, res) => {
	const photo = await Photo.findOne({ _id: req.params.id });
	let filePath = __dirname + '/../public' + photo.image;
	fs.unlinkSync(filePath);

	await Photo.findByIdAndRemove(req.params.id);
	res.redirect(`/`);
};

exports.updatePhoto = async (req, res) => {
	const photo = await Photo.findById(req.params.id);
	photo.title = req.body.title;
	photo.description = req.body.description;
	photo.save();

	res.redirect(`/photos/${req.params.id}`);
};
