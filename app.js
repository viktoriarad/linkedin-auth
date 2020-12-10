var express = require('express');
const session = require('express-session');
const passport = require('passport');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const config = require('./config')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var profileRouter = require('./routes/profile');
var authRouter = require('./routes/auth');

var app = express();

app.set('view engine', 'pug');
app.set("views", path.join(__dirname, "views"));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

passport.use(new LinkedInStrategy({
        clientID: config.linkedinAuth.clientID,
        clientSecret: config.linkedinAuth.clientSecret,
        callbackURL: config.linkedinAuth.callbackURL,
        scope: ['r_emailaddress', 'r_liteprofile'],
    }, function (token, tokenSecret, profile, done) {
        return done(null, profile);
    }
));

app.use('/', indexRouter);
app.use('/profile', profileRouter);
app.use('/auth', authRouter);

app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
