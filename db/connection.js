const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  database: "dncka30tc1qgs",
  username: "ppwdvkenrrviph",
  password: "522318a9098556dd03c849dcfd676426037224345308b13819ad39cc4d2c3e1f",
  host: "ec2-52-207-90-231.compute-1.amazonaws.com",
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
