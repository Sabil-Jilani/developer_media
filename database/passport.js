const passport=require("passport");
const UserModel = require("./model/user");

passport.use(UserModel.createStrategy());

passport.serializeUser(function(user, done) { done(null, user) });
passport.deserializeUser(function(user, done) { done(null, user) });