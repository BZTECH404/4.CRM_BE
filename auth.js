// const passport = require('passport')
// const GoogleStrategy = require('passport-google-oauth20').Strategy;


// // Passport configuration
// passport.use(new GoogleStrategy({
//     clientID: ,
//     clientSecret: ,
//     callbackURL: ,
//     passReqToCallback:true
//   },
//   function(request,accessToken, refreshToken, profile, done) {
//     // In a real application, you would typically save the user to a database here
//     done(null,profile)
//     // User.findOrCreate({googleId:profile.id},function(err,user){
//     //     return cb(err, user);
//     // })
//   }
// ));

// passport.serializeUser(function(user, done) {
//     done(null, user);
//   });
  
//   passport.deserializeUser(function(obj, done) {
//     done(null, obj);
//   });