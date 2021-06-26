const router = require("express").Router();
const passport = require("passport");
require("dotenv").config();
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const {
  models: { User },
} = require("../db");
module.exports = router;

const googleConfig = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK,
};

const strategy = new GoogleStrategy(
  googleConfig,
  (token, refreshToken, profile, done) => {
    console.log(profile);
    prompt = "consent";
    const googleId = profile.id;
    const email = profile.emails[0].value;
    const username = profile.displayName;
    const firstName = profile.name.givenName;
    const lastName = profile.name.familyName;
    const picture = profile.photos[0].value;

    User.findOrCreate({
      where: { googleId },
      defaults: {
        email,
        username: firstName,
        password: lastName,
        imageUrl: picture,
      },
    })
      .then(([user]) => done(null, user))
      .catch(done);
  }
);

passport.use(strategy);

router.get(
  "/",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/callback",
  passport.authenticate("google", {
    successRedirect: "/auth/google",
    failureRedirect: "/login",
  })
);
