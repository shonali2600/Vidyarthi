var GoogleStrategy = require('passport-google-oauth2').Strategy;
const config = require('../utils/config');
const User = require('../model/user');

module.exports = function(passport) {
    function checkEmail(email) {
        const index = email.indexOf('@');
        const domain = email.substr(index);
        if (domain !== '@mpgi.edu.in') return false;
        return true;
    }
    passport.use(
        new GoogleStrategy({
                clientID: config.CLIENT_ID,
                clientSecret: config.CLIENT_SECRET,
                callbackURL: config.CLIENT_CALLBACK,
                passReqToCallback: true,
            },

            async function(response, accessToken, refreshToken, profile, done) {
                if (checkEmail(profile.emails[0].value)) {
                    //Then Add  Data in Database
                    console.log('Login Valid');
                    console.log(profile.photos[0].value);
                    const newUser = {
                        googleId: profile.id,
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        image: profile.photos[0].value,
                    };

                    try {
                        let user = await User.findOne({ email: profile.emails[0].value });

                        if (user) {
                            done(null, user);
                        } else {
                            user = await User.create(newUser);
                            done(null, user);
                        }
                    } catch (err) {
                        console.error(err);
                    }
                }
                // console.log(profile.emails[0]);
                else return done(null, profile);
            }
        )
    );
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(user, done) {
        User.findById(user).then((user) => {
            done(null, user);
        });
    });
    // router.use(session({ secret: 'anything' }));
};