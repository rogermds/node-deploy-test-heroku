var express = require('express');
var router = express.Router();
var indexController = require('../controllers/indexController')
var validator = require("../middlewares/express-validator");

/* GET home page. */
router.get("/", indexController.index);
router.get("/login", indexController.getLogin);
router.post("/login", indexController.postLogin);
router.get("/cadastrar", indexController.getCadastrar);
router.post("/cadastrar", validator.validadorCadastro, indexController.postCadastrar);
router.get("/logout", indexController.getLogout);
router.get("/teste", (req, res) => {
    let info = res.locals.sessao.id_usuario;
	console.log(info)
});

module.exports = router;
