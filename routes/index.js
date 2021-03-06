var express = require('express');
var router = express.Router();
const userController = require('../controller/profile');
/* GET home page. */

function ensureAuth(req, res, next) {
    console.log('checkkkkkk+ ' + req.isAuthenticated());
    //  console.log(req);
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/');
    }
}

function ensureGuest(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/profile');
    }
}
router.get('/', ensureGuest, function(req, res, next) {
    res.render('index', { title: 'Express' });
});
router.get('/dashboard', (req, res) => {
    res.render('dashboard', { title: 'dashboard' });
});

const checkUserLoggedIn = (req, res, next) => {
    console.log(req.user);
    req.user ? next() : res.sendStatus(401);
};
router.get('/profile', ensureAuth, userController.profile);
router.get('/profile/edit', ensureAuth, userController.edit);
router.get('/login', (req, res) => {
    res.render('login', { title: 'profile' });
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/'); //Inside a callback… bulletproof!
});
router.get('/complain', (req, res) => {
    res.render('complain', { title: 'complain' });
});
module.exports = router;