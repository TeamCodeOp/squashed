const Sequelize = require('sequelize');
const sequelize = new Sequelize('tripcollab', 'root', '', {
  host: 'localhost',
  dialect:'mysql' | 'sqlite' | 'postgres' | 'mssql',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },

  // SQLite only
  storage: 'path/to/database.sqlite',
});

