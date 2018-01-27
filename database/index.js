const mysql = require('mysql');
const Promise = require('bluebird');

let config;
let connection;

if (process.env.NODE_ENV === 'production') {
  config = require('../config.js');
  connection = mysql.createConnection({
    user: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    host: config.DB_HOST
  });
} else {
  connection = mysql.createConnection({
    user: 'root',
    password: '',
    database: 'codeop'
  });
}

// connectionLimit: 10
// host: 'us-cdbr-iron-east-05.cleardb.net'
// user: 'b4563830505e5c',
// password: '2590904e',
// database: 'heroku_e13a74604d192c8'

connection.connect((err) => {
  if (err) {
    console.log('could not connect to database', err);
  } else {
    console.log('connected to database');
  }
});

module.exports = connection;

