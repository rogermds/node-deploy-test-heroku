var express = require('express');
var router = express.Router();
var indexController = require('../controllers/indexController')

/* GET home page. */
router.get("/", indexController.index);
router.get("/login", indexController.getLogin);
router.post("/login", indexController.postLogin);
router.get("/cadastrar", indexController.getCadastrar);
router.post("/cadastrar", indexController.postCadastrar);
router.get("/logout", indexController.getLogout);
router.get("/teste", (req, res) => {
    let info = res.locals.sessao.id_usuario;
	console.log(info)
});

module.exports = router;
