const mysql = require('mysql');

let config;
let connection;

if (process.env.NODE_ENV === 'production') {
  connection = mysql.createPool({
    connectionLimit: 10,
    host: process.env.CLEARDB_HOST,
    user: process.env.CLEARDB_USERNAME,
    password: process.env.CLEARDB_PASS,
    database: process.env.CLEARDB_NAME
  });
} else {
  connection = mysql.createConnection({
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
}

module.exports.connection = connection;
