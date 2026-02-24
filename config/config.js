require('dotenv').config();

module.exports = {
  development: {
    username: "johnny",
    password: null,
    database: "johnny",
    host: "127.0.0.1",
    dialect: "postgres"
  },
  test: {
    username: "johnny",
    password: null,
    database: "johnny_test",
    host: "127.0.0.1",
    dialect: "postgres"
  },
  production: {
    username: "johnny",
    password: null,
    database: "johnny_prod",
    host: "127.0.0.1",
    dialect: "postgres"
  }
};
