const { check, validationResult, body } = require("express-validator");
const { Usuario } = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const indexController = {
	index: (req, res) => {
		if (res.locals.sessao) {
			res.redirect("/agenda");
		}
		res.render("index");
	},
	getLogin: (req, res) => {
		res.render("login");
	},
	getLogout: (req, res) => {
		req.session.destroy();
		res.redirect("/");
	},
	getCadastrar: (req, res) => {
		res.render("cadastrar-usuario");
	},
	postCadastrar: async (req, res) => {
		let errors = validationResult(req);
		if (errors.isEmpty()) {
			const { nome, celular, email, senha } = req.body;
			await Usuario.create({
				nome,
				email,
				celular,
				senha,
			});
			res.redirect("/login");
		} else {
			res.render("cadastrar-usuario", {
				errors: errors.mapped(),
				old: req.body,
			});
		}
	},
	postLogin: async (req, res) => {
		const { email, senha } = req.body;
		const usuarioProcurado = await Usuario.findOne({
			where: {
				email,
				senha,
			},
		});
		if (usuarioProcurado) {
			req.session.user = usuarioProcurado;
			return res.redirect("/agenda");
		} else {
			return res.redirect("/");
		}
	},
};

module.exports = indexController;
