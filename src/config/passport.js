// load all the things we need
var LocalStrategy = require('passport-local').Strategy;
// load up the user model
var User = require('../model/user');

// load the auth variables
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    passport.use('local-login', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'name',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
        },
        function(req, name, password, done) {
            console.log('start')
                // asynchronous
            process.nextTick(function() {
                User.findOne({ 'name': name }, function(err, user) {
                    // if there are any errors, return the error
                    if (err)
                        return done(err);

                    // if no user is found, return the message
                    if (!user)
                        return done(null, false, req.flash('loginMessage', 'No user found.'));

                    if (!user.validPassword(password))
                        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

                    // all is well, return user
                    else
                        return done(null, user);
                });
            });

        }));

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    passport.use('local-signup', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'name',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
        },
        function(req, name, password, done) {
            console.log(req)
            process.nextTick(function() {
                console.log('ok')
                User.findOne({ 'name': name }, function(err, user) {
                    // if there are any errors, return the error
                    if (err) {
                        console.log(err)
                        return done(err);
                    }
                console.log('ok2')

                    // check to see if theres already a user with that email
                    if (user) {
                        return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                    } else {
                                       console.log('ok3')
 
                        var newUser = new User();
                        newUser.name = name;
                        newUser.password = newUser.generateHash(password);
                      //  newUser.email = req.body.email;
                      //  var isadmin = req.body.isadmin == "on"
                      //  newUser.isadmin = isadmin;
                        newUser.save(function(err) {
                            console.log(err)
                            if (err)
                                return done(err);

                            return done(null, newUser);
                        });
                    }

                })


            });

        }));





};
