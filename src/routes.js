const { Router } = require("express");

// controllers de usuários
const { index, store, update, deleta, show } = require("./controllers/user");

const routes = Router();

/**
 * Rotas de usuário
 * @description GET - Mostra as informações do db dentro de um array.
 * @description POST - Inclui as informações passada pelo usuario para o db
 * @description Delete - Passando o ID correto é possivel deletar informação do db.
 * @description PUT - Passando o ID é possivel atualizar as informações.
 * @description GET - Parecido com metodo GET, porém mostra a informação passando ID e apresenta fora de um array. 
 */
routes.get("/users", index);
routes.get("/users/:id", show);
routes.post("/users", store);
routes.delete("/users/:id", deleta);
routes.put("/users/:id", update);

module.exports = routes;
