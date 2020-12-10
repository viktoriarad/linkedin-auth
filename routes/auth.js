const passport = require('passport');
const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/linkedin', passport.authenticate('linkedin', {
    scope: ['r_emailaddress', 'r_liteprofile'],
}));

router.get('/linkedin/callback',
    passport.authenticate('linkedin', {
        failureRedirect: '/login'
    }),
    function(req, res) {
        res.redirect('/profile');
    }
);

module.exports = router;
