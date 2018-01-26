const mysql = require('mysql');

const connection = mysql.createConnection({
  user: 'root',
  password: '',
  database: 'codeop'
});

connection.connect();

module.exports = connection;

