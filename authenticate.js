const passport = require("passport");
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