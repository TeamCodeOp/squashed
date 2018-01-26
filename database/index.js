const mysql = require('mysql');
const Promise = require('bluebird');

const connection = mysql.createConnection({
  user: 'root',
  password: '',
  database: 'codeop'
});

connection.connect((err) => {
  if (err) {
    console.log('could not connect to database', err);
  } else {
    console.log('connected to database');
  }
});

module.exports = connection;

