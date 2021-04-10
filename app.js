var express = require('express');
var path = require('path');
var logger = require('morgan');
const mongoose = require('mongoose');

const config = require('./utils/config');
// const cookieSession = require('cookie-session');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
// var MongoDBStore = require('connect-mongodb-session')(session);
var cookieParser = require('cookie-parser');
require('./auth/passport')(passport);
//const authRouter = require('./auth/passport-google-Oauth2');
//  Routing Files Imported
var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
// var usersRouter = require('./routes/users');
const connectDB = require('./utils/db');
var app = express();
let PORT = config.PORT;
// view engine setup
connectDB();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// var store = new MongoDBStore({
//     uri: config.MONGODB_URI,
//     collection: 'mySessions',
// });

// Config Passport

app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
    // console.log(req.user);
    res.locals.user = req.user || null;
    next();
});
app.use('/auth', authRouter);
app.use('/', indexRouter);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/news.ejs', (req, res) => {

    res.render('news');
    
});

app.listen(PORT, (req, res, err) => {
    console.log('Server is running at Port ' + PORT);
});