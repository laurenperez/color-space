require('dotenv').config();
var express = require('express');
var request = require('request')
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
  db.space.findAll({
    where: {
      userId: req.user.id
    },
  }).then(function(spaces){
    res.render('spaces/profile', {spaces: spaces});
  });
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


/////// THIS IS DONE DONT TOUCH IT ///////
router.get('/new', isLoggedIn, function(req, res) {
  res.render('spaces/new');
});


/////// THIS IS DONE BUT IT IS VERY SLOW ///////
router.get('/:name', isLoggedIn, function(req, res) {
  db.space.findOne({
    where: {
      userId: req.user.id,
      name: req.params.name
     },
  }).then(function(space){
    var spaceUrl = space.url;
    var url = spaceUrl.substring(8);
    var specialParams = "&precision=medium&json=1";
    var colorApiUrl = "http://mkweb.bcgsc.ca/color-summarizer/?url=" + url + specialParams;
    request(colorApiUrl, function(error, response, body) {
      var colorData = JSON.parse(body).clusters;
      console.log(colorData);
      res.render('spaces/show', {space: space},);
    });
  });
});



module.exports = router;
