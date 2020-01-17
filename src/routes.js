const { Router } = require("express");

const { index, store, update, deleta, show } = require("./controllers/user");

const routes = Router();

/**
 * @description GET - Mostra as informações do db dentro de um array.
 * @description POST - Inclui as informações passada pelo usuario para o db
 * @description Delete - Passando o ID correto é possivel deletar informação do db.
 * @description PUT - Passando o ID é possivel atualizar as informações.
 * @description GET SHOW - Parecido com metodo GET, porém mostra a informação passando ID e apresenta fora de um array. 
 */
routes.get("/", index);
routes.post("/", store);
routes.delete("/:id", deleta);
routes.put("/:id", update);
routes.get("/show/:id", show);

module.exports = routes;
