const { Router } = require("express");

const { index, store, update, deleta, show } = require("./controllers/user");

const routes = Router();

routes.get("/", index);
routes.post("/", store);
routes.delete("/:id", deleta);
routes.put("/:id", update);
routes.get("/show/:id", show);

module.exports = routes;
