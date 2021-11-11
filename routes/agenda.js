var express = require("express");
var router = express.Router();
var agendaController = require("../controllers/agendaController");

/* GET home page. */
router.get("/", agendaController.index);
router.get("/contatos/:id", agendaController.getUnicoContato);
router.get("/pesquisar", agendaController.pesquisar);
router.get("/adicionar", agendaController.getAdicionar);
router.post("/adicionar", agendaController.postAdicionar);
router.get("/contatos/editar/:id", agendaController.getEditar);
router.post("/editar/:id", agendaController.postEditar);
router.get("/excluir/:id", agendaController.getExcluir);

// router.get("/usuarios", agendaController.getUsuarios);


module.exports = router;
