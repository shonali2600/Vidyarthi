const express = require('express');
const passport = require('passport');
const router = express.Router();
// require('../auth/passport')(passport);
router.get(
    '/google',
    passport.authenticate('google', {
        scope: ['email', 'profile'],
    })
);

function checkEmail(email) {
    const index = email.indexOf('@');
    const domain = email.substr(index);
    if (domain !== '@mpgi.edu.in') return false;
    return true;
}

router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    function(req, res) {
        res.redirect('/profile');
        // if (checkEmail(req.user.emails[0].value)) {
        //     console.log('Yeeeessss');
        //     console.log(`Auth ${req.user}`);
        //     res.redirect('/profile');
        // } else {
        //     console.log('Noooo');
        //     res.redirect('/');
        // }
    }
);
module.exports = router;