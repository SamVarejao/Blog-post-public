const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/User");

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      User.findOne({ email })
        .then((user) => {
          if (!user) {
            return done(null, false, { Error: "Invalid User" });
          }
          //checks if login passwords match
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return done(err);
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { Error: "Wrong password" });
            }
          });
        })
        .catch((err) => done(err));
    })
  );
  passport.serializeUser((user, done) => { //https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
