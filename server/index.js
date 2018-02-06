const express = require('express');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const mysqlDB = require('../database/index.js');
const mysqlModel = require('../database/model.js');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const passportGithub = require('./passport-github.js');
const cache = require('memory-cache');
const url = require('url');

const queryString = require('query-string');
const _ = require('underscore');

const app = express();

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`listening on ${port}!`);
});

const io = require('socket.io').listen(server);

let sockets = {};
let isOnline;

io.on('connection', (socket) => {
  // keep track of user's socketId
  socket.on('registerSocket', (name) => {
    if (name.length > 0) {
      sockets[name] = {
        id: socket.id,
        isOnline: true
      };
    }

    socket.broadcast.emit('broadcast', sockets);
    socket.emit('broadcast', sockets);
  });

  socket.on('userDisconnect', (name) => {
    if (sockets[name]) {
      sockets[name] = undefined;
    }

    socket.broadcast.emit('broadcast', sockets);
    socket.emit('broadcast', sockets);
  });

  socket.on('messageAdded', (message) => {
    io.to(sockets[message.receiver].id).emit('messageAdded', message);
  });

  socket.on('groupMessageAdded', (message) => {
    socket.broadcast.emit('groupMessageAdded', message);
  });
});

app.use(express.static('./react-client/dist'));

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

app.get('/auth/github', passport.authenticate('github'));

app.get('/auth/github/return', passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    const lastPath = req.cookies.INTERCEPTED_ROUTE === undefined ? '/' : req.cookies.INTERCEPTED_ROUTE;
    cache.put(req.sessionID, req.user);

    // res.redirect(url.format({
    //   pathname: path,
    //   query: {
    //     session: req.sessionID
    //   }
    // }));
    res.clearCookie('INTERCEPTED_ROUTE')
      .redirect(`${lastPath}?session=${req.sessionID}`);
  }
);

app.get('/projects', (req, res) => {
  let techs;
  if (req.query.techs === undefined) {
    mysqlDB.retrieveProjects((projects) => {
      res.send(projects);
    });
  } else {
    techs = Array.isArray(req.query.techs) ? req.query.techs : [req.query.techs];
    mysqlDB.retrieveProjectsByTechs(techs, (projects) => {
      res.send(projects);
    });
  }
});

// GET request to database to get user info and user's projects
app.get('/developers/:username', (req, res) => {
  const username = req.params.username;
  mysqlDB.getUserInfo(username, (user) => {
    mysqlDB.getProjectsByUser(user.id, (projects) => {
      mysqlDB.getFollowersForUser(user.id, (followers) => {
        mysqlDB.getFollowingForUser(user.id, (following) => {

          let followersToReturn = [];
          followers.forEach((dataPacket) => {
            followersToReturn.push(dataPacket['follower_id']);
          });

          let followingToReturn = [];
          following.forEach((dataPacket) => {
            followingToReturn.push(dataPacket['followed_user_id']);
          });

          user.followers = followersToReturn;
          user.following = followingToReturn;
          user.projects = projects;
          res.send(user);
        });
      });
    });
  });
});

// GET request to database to project info and project's owner
app.get('/projects/:id', (req, res) => {
  const projectId = req.params.id;

  mysqlModel.selectAllWhere('projects', 'id', projectId, true, (project) => {
    mysqlModel.selectAllWhere('users', 'id', project.user_id, true, (user) => {
      project.user = user; // <-- is this being used anywhere?
      mysqlModel.selectAllWhere('technologies', 'project_id', project.id, false, (data) => {
        const response = [];
        const techs = [];
        data.forEach((element) => {
          techs.push(element['tech_name']);
        });
        response.push(project);
        response.push(techs);
        res.send(response);
      });
    });
  });
});

app.get('/checkSession', (req, res) => {
  mysqlDB.checkUserSession(req.sessionID, (user) => {
    res.send(user);
  });
});

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return next(err);
    }
    mysqlDB.deleteUserSession(req.sessionID, (user) => {
    });
    req.logout();

    res.redirect('/');
  });
});

app.get('/searchProjects', (req, res) => {
  const queryTerm = req.query;
  mysqlDB.findProject(queryTerm.title, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(data);
    }
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

app.post('/getCurrentUserProfileId', (req, res) => {
  console.log('get request /getCurrentUserProfileId in (server / index.js)');
  
  mysqlDB.getCurrentUserProfileId(req.body, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(data);
    }
  });
});

app.post('/checkIfCurrentlyFollowing', (req, res) => {
  mysqlDB.checkIfCurrentlyFollowing(req.body, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(data);
    }
  });
});

app.post('/followRequest', (req, res) => {
  mysqlDB.createFollowerConnection(req.body, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(data);
    }
  });
});

app.post('/unfollowRequest', (req, res) => {
  console.log('-------------------\n\n\n\npost request at /unfollowRequest received.\nreq.body is: ', req.body);
  mysqlDB.removeFollowerConnection(req.body, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(data);
    }
  });
});

/***Delete request to projects Schemna**/

app.delete('/projects/:id', (req, res) => {
  console.log('delete in server', req.params.id);
  const projectId = req.params.id;
  mysqlDB.deleteProjectByProjectId(projectId, (project) => {
    res.send(project);
  });
});

/* ************************************ */

app.get('/testing', (req, res) => {
  res.status(200);
  res.send('GET request to testing');
});

module.exports = app;