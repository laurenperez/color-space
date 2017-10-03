var express = require('express');
var router = express.Router();
var db = require('../models');
var passport = require('../config/ppConfig');



//////////routes////////////


router.get('/signup', function(req, res) {
  res.render('auth/signup');
});


//post route for our signup form
router.post('/signup', function(req, res) {
  // find or create a user, providing the name and password as default values
  db.user.findOrCreate({
    where: { email: req.body.email },
    defaults: {
      name: req.body.name,
      password: req.body.password
    }
  }).spread(function(user, created) {
    if (created) {
      passport.authenticate('local', {
        successRedirect: '/',
        successFlash: 'Account created and logged in'
      })(req, res);
    } else {
      // if not created, the email already exists
      req.flash('error', 'Email already exists');
      res.redirect('/auth/signup');
    }
  }).catch(function(error) {
    // if an error occurs, let's see what the error is
    req.flash('error', error.message);
    res.redirect('/auth/signup');
  });
});



router.get('/login', function(req, res) {
  res.render('auth/login');
});

//added flash to let user know if they successfully logged in or not
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login',
  successFlash: 'You have logged in',
  failureFlash: 'Invalid username and/or password'
}));

//added flash to let user knoe they logged out
router.get('/logout', function(req, res) {
  req.logout();
  req.flash('success', 'You have logged out');
  res.redirect('/');
});





module.exports = router;
