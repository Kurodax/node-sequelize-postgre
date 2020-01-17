require('dotenv').config()

const express = require("express");
const Sequelize = require("sequelize");

// routes
const routes = require("./src/routes");
// config
const config = require("./src/configs/database");
// models
const User = require("./src/models/user");

const connection = new Sequelize(config);

User.init(connection);

const app = express();

app.use(express.json());
app.use(routes);

/**
 * @description Outra forma de informa o nome da variavel é com = ['PORT']
 * TODO: comentar os parametros
 */
app.listen(process.env.PORT, () => {
  return console.log("Servidor online porta " + process.env.PORT); // para para ingles
});
