const User = require('../model/user');
module.exports.profile = async function(req, res) {
    //console.log('req session: ' + req.locals);
    await User.findOne({ email: res.locals.user.email }).then(async(user) => {
        // console.log(user.image);
        await res.render('profile', {
            title: 'profile ',
            name: user.name,
            image: user.image,
            email: user.email,
        });
    });
};