const express = require('express');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const mysqlDB = require('../database/index.js');
const mysqlModel = require('../database/model.js');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const passportGithub = require('./passport-github.js');
const cache = require('memory-cache');
const url = require('url');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(`${__dirname}/../react-client/dist`));

app.use(require('cookie-parser')());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
  secret: 'egh576',
  resave: false,
  saveUnitialized: true,
}));

// Intitialize passport
app.use(passport.initialize());

// Restore Session
app.use(passport.session());

console.log(' here before /auth/github');

app.get('/auth/github', passport.authenticate('github'));
console.log('after /auth/github');

app.get('/auth/github/return', passport.authenticate('github', { failureRedirect: '/'}),
  (req, res) => {
    console.log('------- inside passport authenticate');
    cache.put(req.sessionID, req.user);
    res.redirect(url.format({
      pathname: '/',
      query: {
        session: req.sessionID
      }
    }));
  }
);

app.get('/projects', (req, res) => {
  mysqlDB.retrieveProjects((projects) => {
    res.send(projects);
  });
});

// GET request to database to get user info and user's projects
app.get('/developers/:username', (req, res) => {
  let username = req.params.username;
  mysqlDB.getUserInfo(username, (user) => {
    mysqlDB.getProjectsByUser(user.id, (projects) => {
      user.projects = projects;
      console.log('line 58: ', user);
      res.send(user);
    });
  });
});

app.get('/checkSession', (req, res) => {
  console.log('SESSIONID-----: ', req.sessionID);
  mysqlDB.checkUserSession(req.sessionID, (user) => {
    res.send(user);
  });
});

app.get('/logout', (req, res) => {
console.log('logoutt-----', req.sessionID);

  req.session.destroy((err) => {
    if (err) {
      return next(err);
    }
  mysqlDB.deleteUserSession(req.sessionID, (user) => {
    console.log(user);
  });
    req.logout();

    res.redirect('/');
  });
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../react-client/dist`, 'index.html'));
});

app.get('/', (req, res) => {
  res.status(200).json();
});

app.post('/projects', (req, res) => {
  mysqlModel.insertProjectData(req.body);
  res.status(201).json();
});

app.get('/testing', (req, res) => {
  res.status(200);
  res.send('GET request to testing');
});


app.listen(port, () => {
  console.log('listening on port 3000!');
});

module.exports = app;
