const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  database: "database",
  username: "username",
  password: "password",
  host: "host",
  port: 5432,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true, // This will help you. But you will see nwe error
      rejectUnauthorized: false // This line will fix new error
    }
  },
});

module.exports = sequelize;
