const express = require("express");
const Sequelize = require('sequelize');

const routes = require('./src/routes');

const config = require("./src/configs/database");

const User = require("./src/models/user");

const connection = new Sequelize(config);

User.init(connection);

const app = express();

app.use(express.json());
app.use(routes);

app.listen(9990, () => {
  return console.log("Servidor online porta 9990");
});
