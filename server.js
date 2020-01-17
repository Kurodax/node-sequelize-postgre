require('dotenv').config()

const express = require("express");
const Sequelize = require("sequelize");
const routes = require("./src/routes");

const config = require("./src/configs/database");

const User = require("./src/models/user");

const connection = new Sequelize(config);

User.init(connection);

const app = express();

app.use(express.json());
app.use(routes);


/**
 * @description Outra forma de informa o nome da variavel é com = ['PORT']
 */

const servidor = process.env.PORT;
app.listen(servidor, () => {
  return console.log("Servidor online porta 9990");
});
