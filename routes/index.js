var express = require('express');
var router = express.Router();
const Sequelize = require('sequelize');
const { Usuario } = require('../models')
const Op = Sequelize.Op


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.post('/', async (req, res) => {
  const {nome, email} = req.body
  await Usuario.create({
    nome,
    email
  })
  return res.redirect('/usuarios')
})

router.get("/usuarios", async (req, res) => {
  let users = await Usuario.findAll()
	res.render("usuarios", {users});
});


module.exports = router;
