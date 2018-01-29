const passport = require('passport');
const mysqlDB = require('../database/index.js');
const GitHubStrategy = require('passport-github').Strategy;
const config = require('../config.js');


passport.use(new GitHubStrategy(
  {
    clientID: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/github/return',
    passReqToCallback: true
  },
  function(req, accessToken, refreshToken, profile, done) {
    // console.log('request', req);
    const userProfile = {
      displayName: profile.displayName,
      gitLogin: profile.username,
      avatarUrl: profile.photos[0].value
    };
    //console.log('user profile', profile);
    mysqlDB.userLogin(userProfile, (err, user) => {
      if (err) {
        return done(err, null);
      } else {
        return done(null, profile);
      }
    });
  }
));


// used to serialize the user for the session
passport.serializeUser((user, done) => {
  console.log(' user in serialize', user);
  done(null, user.id);
});
// used to deserialize the user
passport.deserializeUser((userId, done) => {
  // mysqlDB.connection.query('select * from user where id = ' + userId, (err, rows) => {
  //   console.log('user in deserializeUser', rows);
  //   done(err, rows[0]);
  // });
  done(null, userId);
});


