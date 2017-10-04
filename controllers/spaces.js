require('dotenv').config();
var express = require('express');
var router = express.Router();
var db = require('../models');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var multer = require('multer');
var upload = multer({dest: '../uploads/'});
var cloudinary = require('cloudinary');
var fs = require('fs');
var isLoggedIn = require('../middleware/isLoggedIn');

var images = [];


/////// THIS IS DONE DONT TOUCH IT ///////
router.get('/', isLoggedIn, function(req, res) {
  res.render('spaces/profile');
});


router.get('/:id', isLoggedIn, function(req, res) {
  //get room name by id or name and get data
  //pass data into api nd get back data
  //dend that data as a render obj
  res.render('spaces/show', {images, cloudinary});
});



/////// THIS IS DONE DONT TOUCH IT ///////
router.get('/new', isLoggedIn, function(req, res) {
  res.render('spaces/new');
});

/////// THIS IS DONE DONT TOUCH IT ///////
router.post('/', upload.single('myImage'), function(req, res){
  cloudinary.uploader.upload(req.file.path, function(result){
    images.push(result.public_id);
    db.user.findById(req.user.id).then(function(user){
      user.createSpace({
          name: req.body.name,
          url: result.secure_url
        })
        .then(function(image) {
          //now delete all the files in the upload folder
          fs.readdir('./uploads', function(err, items) {
          items.forEach(function(file) {
              fs.unlink('./uploads/' + file);
              console.log('Deleted ' + file);
            });
          });
        });
      });
    res.redirect('/');
  });
});



module.exports = router;
