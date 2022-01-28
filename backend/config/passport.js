const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const UserModel = require("../models/user");
const bcrypt = require("bcryptjs");

passport.use(
  new LocalStrategy(
    {
      usernameField: "login",
      passwordField: "password",
    },
    async (login, password, done) => {
      const user = await UserModel.findOne({ login }).catch(done);
      if (!user) {
        return done(null, false, "Incorrect login!");
      }

      const isValid = await bcrypt.compare(password, user.password).catch(done);
      if (!isValid) {
        return done(null, false, "Incorrect password!");
      }
      done(null, user);
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_KEY,
    },
    (jwtPayload, done) => {
      UserModel.findOne({ _id: jwtPayload.sub }, (err, user) => {
        if (err) {
          return done(err, false);
        }
        if (!user) {
          return done(null, false);
        }
        console.log("jwt verified for ", user);
        return done(null, user);
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await UserModel.findById(id).catch(done);
  done(null, user);
});
