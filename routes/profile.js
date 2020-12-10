const passport = require('passport');
var express = require('express');
var router = express.Router();

router.get('/',
    passport.authenticate('linkedin', {
      failureRedirect: '/'
    }),
    function(req, res) {
      res.render('profile', {
        user: req.user
      });
    }
);

module.exports = router;
