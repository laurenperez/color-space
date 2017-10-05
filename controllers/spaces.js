require('dotenv').config();
var express = require('express');
var request = require('request')
var async = require('async');
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
var colorData = null;
var spaceId;

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


function color0(callback) {
  db.color.findOrCreate({
    where: {
      rgb: colorData['0'].rgb,
      hex: colorData['0'].hex,
      cmyk: colorData['0'].cmyk,
      spaceId: spaceId
    },
  }).spread(function(color, created){
    console.log(color);
  });
}
function color1(callback) {
  db.color.findOrCreate({
    where: {
      rgb: colorData['1'].rgb,
      hex: colorData['1'].hex,
      cmyk: colorData['1'].cmyk,
      spaceId: spaceId
    },
  }).spread(function(color, created){
    console.log(color);
  });
}
function color2(callback) {
  db.color.findOrCreate({
    where: {
      rgb: colorData['2'].rgb,
      hex: colorData['2'].hex,
      cmyk: colorData['2'].cmyk,
      spaceId: spaceId
    },
  }).spread(function(color, created){
    console.log(color);
  });
}
function color3(callback) {
  db.color.findOrCreate({
    where: {
      rgb: colorData['3'].rgb,
      hex: colorData['3'].hex,
      cmyk: colorData['3'].cmyk,
      spaceId: spaceId
    },
  }).spread(function(color, created){
    console.log(color);
  });
}
function color4(callback) {
  db.color.findOrCreate({
    where: {
      rgb: colorData['4'].rgb,
      hex: colorData['4'].hex,
      cmyk: colorData['4'].cmyk,
      spaceId: spaceId
    },
  }).spread(function(color, created){
    console.log(color);
  });
}


/////// this is not currently working it can find but now save data ///////
router.get('/:name', isLoggedIn, function(req, res) {
  db.space.findOne({
    where: {
      userId: req.user.id,
      name: req.params.name
     },
  }).then(function(space){
    spaceId = space.id;
    var spaceUrl = space.url;
    var url = spaceUrl.substring(8);
    var specialParams = "&precision=medium&json=1";
    var colorApiUrl = "http://mkweb.bcgsc.ca/color-summarizer/?url=" + url + specialParams;
    request(colorApiUrl, function(error, response, body) {
      colorData = JSON.parse(body).clusters;
      async.waterfall([color0, color1, color2, color3, color4], function(err, results){
        console.log('done!');
      });
    });
    res.render('spaces/show', {space: space});
  });
});





module.exports = router;
