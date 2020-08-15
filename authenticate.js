// local authentication
// For more details go to https://github.com/jaredhanson/passport-local
var LocalStrategy    = require('passport-local').Strategy;


var User       = require('./models/user-model');
var affiliateSeller = require('./models/affiliate-seller-model')
module.exports = function(passport) {

    // Maintaining persistent login sessions
    // serialized  authenticated user to the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // deserialized when subsequent requests are made
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

     passport.use('login', new LocalStrategy({
        usernameField : 'user_name',
        passReqToCallback : true 
    },
    function(req, user_name, password, done) {
       process.nextTick(function() {
            User.findOne({ 'User_Name' :  user_name }, function(err, user) {
                if (err){ return done(err);}
                if (!user)
                  return done(null,false,{status:false,message:'user is not exist'});
                if (!user.verifyPassword(password))
                    return done(null,false,{status:false,message:'Enter correct password'});
               else
                    return done(null, user);
            });
        });

    }));
    //for affiliate user log in 
    passport.use('affiliateSellerLogin', new LocalStrategy({
        usernameField : 'AffiliateSeller_Email',
        passReqToCallback : true 
    },
    function(req, user_name, password, done) {
       process.nextTick(function() {
            affiliateSeller.findOne({ 'AffiliateSeller_Email' :  user_name }, function(err, user) {
                if (err){ return done(err);}
                if (!user)
                  return done(null,false,{status:false,message:'user is not exist'});
                if (!user.verifyPassword(password))
                    return done(null,false,{status:false,message:'Enter correct password'});
               else
                    return done(null, user);
            });
        });

    }));

     passport.use('signup', new LocalStrategy({
        usernameField : 'email',
        passReqToCallback : true 
    },
    function(req, email, password, done) {

        process.nextTick(function() {
       
            if (!req.user) {
                User.findOne({ 'user.email' :  email }, function(err, user) {
            	    if (err){ return done(err);}
                    if (user) {
                        return done(null, false, req.flash('signuperror', 'User already exists'));
                    } else {
                        var newUser            = new User();
			newUser.user.username    = req.body.username;
                        newUser.user.email    = email;
                        newUser.user.password = newUser.generateHash(password);
			newUser.user.name	= ''
			newUser.user.address	= ''
                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }

                });
            } else {
                var user            = req.user;
		user.user.username    = req.body.username;
                user.user.email    = email;
                user.user.password = user.generateHash(password);
			user.user.name	= ''
			user.user.address	= ''

                user.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, user);
                });

            }

        });


    }));


};
/*const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const jwt = require("jsonwebtoken");

const config = require("./config");
const User = require("./models/user-model");

exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
////////////////////
exports.getToken = user => {
  return jwt.sign(user, config.jwtSecretKey);
};
var opts = {};
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.jwtSecretKey;

exports.jwtPassport = passport.use(
  new JWTStrategy(opts, (payload, done) => {
    //verify function
    User.findOne({ _id: payload._id }, (err, user) => {
      if (err) {
        return done(err, false);
      } else if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);
exports.verifyUser = passport.authenticate("jwt", { session: false });
*/