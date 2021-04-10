const User = require('../model/user');
module.exports.profile = async function(req, res) {
    //console.log('req session: ' + req.locals);
    await User.findOne({ email: res.locals.user.email })
        .then((user) => {
            // console.log(user.image);
            res.render('profile', {
                image: user.image,
                title: 'profile ',
                name: user.name,
                email: user.email,
            });
        })
        .catch((err) => {
            console.log('No User Available');
        });
};
module.exports.edit = function(req, res) {
    res.render('editProfile', { title: 'Edit Profile' });
};