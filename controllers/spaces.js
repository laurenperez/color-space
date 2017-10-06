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

// router.use(express.static(__dirname + '/public/'));


/////// view user profile page ///////
router.get('/', isLoggedIn, function(req, res) {
  db.space.findAll({
    where: {
      userId: req.user.id
    },//can include colors here
  }).then(function(spaces){
    res.render('spaces/profile', {spaces: spaces}); //include colors here
  });
});


/////// page with form to create a new space ///////
router.get('/new', isLoggedIn, function(req, res) {
  res.render('spaces/new');
});


/////// upload image to cloudinary and save its url to db ///////
router.post('/new', upload.single('myImage'), function(req, res){
  cloudinary.uploader.upload(req.file.path, function(result){
    images.push(result.public_id);
    db.user.findById(req.user.id).then(function(user){
      user.createSpace({
          name: req.body.name,
          url: result.secure_url
        })
        .then(function(space) {
          //now delete all the files in the upload folder
          fs.readdir('./uploads', function(err, items) {
          items.forEach(function(file) {
              fs.unlink('./uploads/' + file);
              console.log('Deleted ' + file);
            });
          });
          res.redirect('/spaces/create/' + space.id);
        });
    });
  });
});


///// color values from the API are inserted into colors table /////
function color0(callback) {
  db.color.findOrCreate({
    where: {
      r: colorData['0'].rgb[0],
      g: colorData['0'].rgb[1],
      b: colorData['0'].rgb[2],
      hex: colorData['0'].hex[0],
      c: colorData['0'].cmyk[0],
      m: colorData['0'].cmyk[1],
      y: colorData['0'].cmyk[2],
      k: colorData['0'].cmyk[3],
      spaceId: spaceId
    },
  }).spread(function(color, created){
    console.log(color);
  });
  callback(null, "yay!");
}
function color1(callback) {
  db.color.findOrCreate({
    where: {
      r: colorData['1'].rgb[0],
      g: colorData['1'].rgb[1],
      b: colorData['1'].rgb[2],
      hex: colorData['1'].hex[0],
      c: colorData['1'].cmyk[0],
      m: colorData['1'].cmyk[1],
      y: colorData['1'].cmyk[2],
      k: colorData['1'].cmyk[3],
      spaceId: spaceId
    },
  }).spread(function(color, created){
    console.log(color);
  });
  callback(null, "yay!");
}
function color2(callback) {
  db.color.findOrCreate({
    where: {
      r: colorData['2'].rgb[0],
      g: colorData['2'].rgb[1],
      b: colorData['2'].rgb[2],
      hex: colorData['2'].hex[0],
      c: colorData['2'].cmyk[0],
      m: colorData['2'].cmyk[1],
      y: colorData['2'].cmyk[2],
      k: colorData['2'].cmyk[3],
      spaceId: spaceId
    },
  }).spread(function(color, created){
    console.log(color);
  });
  callback(null, "yay!");
}
function color3(callback) {
  db.color.findOrCreate({
    where: {
      r: colorData['3'].rgb[0],
      g: colorData['3'].rgb[1],
      b: colorData['3'].rgb[2],
      hex: colorData['3'].hex[0],
      c: colorData['3'].cmyk[0],
      m: colorData['3'].cmyk[1],
      y: colorData['3'].cmyk[2],
      k: colorData['3'].cmyk[3],
      spaceId: spaceId
    },
  }).spread(function(color, created){
    console.log(color);
  });
  callback(null, "yay!");
}
function color4(callback) {
  db.color.findOrCreate({
    where: {
      r: colorData['4'].rgb[0],
      g: colorData['4'].rgb[1],
      b: colorData['4'].rgb[2],
      hex: colorData['4'].hex[0],
      c: colorData['4'].cmyk[0],
      m: colorData['4'].cmyk[1],
      y: colorData['4'].cmyk[2],
      k: colorData['4'].cmyk[3],
      spaceId: spaceId
    },
  }).spread(function(color, created){
    console.log(color);
  });
  callback(null, "yay!");
};


/////// API call is made with the image URL retrieved from db ///////
router.get('/create/:id', isLoggedIn, function(req, res) {
  db.space.findOne({
    where: {
      userId: req.user.id,
      id: req.params.id
     },
  }).then(function(space){
    spaceId = space.id;
    var spaceUrl = space.url;
    var url = spaceUrl.substring(8);
    var specialParams = "&precision=medium&json=1";
    var colorApiUrl = "http://mkweb.bcgsc.ca/color-summarizer/?url=" + url + specialParams;
    request(colorApiUrl, function(error, response, body) {
      colorData = JSON.parse(body).clusters;
      async.series([color0, color1, color2, color3, color4], function(err, results){
        console.log('done!');
      });
    });
    res.render('spaces/create', {space: space});
  });
});


/////// view all data on a spacific space ///////
router.get('/:id', isLoggedIn, function(req, res) {
  db.space.findOne({
    where: {
      userId: req.user.id,
      id: req.params.id
     },
  }).then(function(space) {
    console.log("Got it!");
    res.render('spaces/show', {space: space});
  });
});


/////// DELETE DRAFT ///////
router.delete('/:id', function(req, res) {
  console.log('in the delete route')
  db.space.findOne({
    where: {
      id:req.params.id
    },
  }).then(function(space) {
    console.log('in the then promise in the delete route');
    if (space) {
      space.destroy().then(function() {
        res.send({msg: 'success'});
      });
    } else {
      res.status(404).send({msg: 'error'});
    }
  }).catch(function(err) {
    res.status(500).send({msg: 'error'});
  });
});





module.exports = router;
