const mysql = require('mysql');
const { expect } = require('chai');


describe('thesis', () => {
  let dbConnection;

  beforeEach((done) => {
    dbConnection = mysql.createConnection({
      user: 'root',
      database: 'codeop',
    });
    dbConnection.connect();

    /* Empty the db table before each test so that multiple tests
     * (or repeated runs of the tests) won't screw each other up: */
    // also reset auto increment
    dbConnection.query('TRUNCATE projects', () => {
      dbConnection.query('ALTER TABLE projects AUTO_INCREMENT = 1', done);
    });
  });

  afterEach(() => {
    dbConnection.end();
  });

  it('should insert project name to the DB', (done) => {
    const userQ = 'INSERT INTO projects (project_name) VALUES ("test project")';
    dbConnection.query(userQ, () => {
      console.log('inside');
      dbConnection.query('SELECT * FROM projects WHERE project_name = "test project"', (err, results) => {
        expect(results.length).to.equal(1);
        done();
      });
    });
  });
});
