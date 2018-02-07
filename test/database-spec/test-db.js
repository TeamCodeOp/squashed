const mysql = require('mysql');
const { expect } = require('chai');

describe('test database', () => {
  let dbConnection;

  beforeEach((done) => {
    dbConnection = mysql.createConnection({
      user: 'root',
      database: 'test',
    });
    dbConnection.connect((err) => {
      if (err) {
        console.log('could not connect to database', err);
      } else {
        console.log('connected to database');
      }
    });

    /* Empty the db table before each test so that multiple tests
     * (or repeated runs of the tests) won't screw each other up: */
    // also reset auto increment
    dbConnection.query('TRUNCATE users', () => {
      console.log('im closing');
      dbConnection.query('ALTER TABLE users AUTO_INCREMENT = 1', done);
    });
  });

  afterEach(() => {
    dbConnection.end();
  });

  it('Should add user info to the users schema', (done) => {
    const userProfile = {
      displayName: 'Bob Miller',
      gitLogin: 'bmiller',
      avatarUrl: 'https://avatars0.githubusercontent.com/u/30578313?v=4',
      session_id: 'bdhjsdf68',
      user_bio: 'Hi I am Bob'
    };

    const userLogin = (userProfile, cb) => {
      dbConnection.query(`SELECT * FROM users WHERE git_username ='${userProfile.gitLogin}';`, (err, user) => {
        if (user.length === 0 || err) {
          dbConnection.query(`INSERT INTO users (name,git_username,session_id,avatar_url,user_bio) VALUES ("${userProfile.displayName}",         "${userProfile.gitLogin}", "${userProfile.session_id}", "${userProfile.avatarUrl}", "${userProfile.user_bio}");`, (err, results) => {
            if (err) {
              cb(err, null);
            } else {
              cb(null, results);
            }
          });
        } else if (user.length !== 0) {

          dbConnection.query(`UPDATE users SET session_id ='${userProfile.session_id}' WHERE git_username = '${userProfile.gitLogin}';`, (err, user) => {
            if (err) {
              throw err;
            } else {
              cb(null, user);
            }
          });

          const query = `SELECT * FROM users WHERE git_username ='${userProfile.gitLogin}';`;
          dbConnection.query(query, (err, results) => {
            if (err) {
              throw err;
            } else {
              expect(results.length).to.equal(1);
            }
          });
        }
      });
    };
    userLogin(userProfile, (err, results) => {
      const query = `SELECT * FROM users WHERE git_username ='${userProfile.gitLogin}';`;
      dbConnection.query(query, (err, results) => {
        if (err) {
          throw err;
        } else {
          expect(results.length).to.equal(1);
          done();
        }
      });
    });
  });
});

