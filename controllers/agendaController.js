const { Contato } = require("../models");
const { Usuario } = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const agendaController = {
	index: async (req, res) => {
		let { page = 1 } = req.query;
		let { count: total, rows: contatosGeral } = await Contato.findAndCountAll({
			include: {
				model: Usuario,
				as: "usuario",
				required: true,
			},
			limit: 10,
			offset: (page - 1) * 10,
			order: [["id_contato", "ASC"]],
			where: {
				id_usuario: res.locals.sessao.id_usuario,
			},
		});
		let totalPaginas = Math.round(total / 10);
		return res.render("agenda", { contatosGeral, totalPaginas });
		// res.send(contatosGeral);
	},
	pesquisar: async (req, res) => {
		let { nome, page = 1 } = req.query;
		let { count: total, rows: contatosGeral } = await Contato.findAndCountAll({
			include: {
				model: Usuario,
				as: "usuario",
				required: true,
			},
			limit: 10,
			offset: (page - 1) * 10,
			where: {
				nome: {
					[Op.like]: `%${nome}%`,
				},
				id_usuario: res.locals.sessao.id_usuario
			},
			order: [["id_contato", "ASC"]]
		});
		let totalPaginas = Math.round(total / 10);
		return res.render("agenda", { contatosGeral, totalPaginas });
	},
	getUnicoContato: async (req, res) => {
		let { id } = req.params;
		let unicoContato = await Contato.findOne({
			where: {
				id_contato: id,
			},
		});
		return res.render("info-contato", { unicoContato });
	},
	getAdicionar: (req, res) => {
		return res.render("adicionar-contato");
	},
	postAdicionar: async (req, res) => {
		const { nome, celular1, celular2, telefone } = req.body;
		await Contato.create({
			nome,
			celular1,
			celular2,
			telefone,
			id_usuario: res.locals.sessao.id_usuario,
		});
		return res.redirect("/agenda");
	},
	getEditar: async (req, res) => {
		let { id } = req.params;
		let unicoContato = await Contato.findOne({
			where: {
				id_contato: id,
			},
		});
		res.render("editar-contato", { unicoContato });
	},
	postEditar: async (req, res) => {
		let { id } = req.params;
		const { nome, celular1, celular2, telefone } = req.body;
		let unicoContato = await Contato.update(
			{
				nome,
				celular1,
				celular2,
				telefone,
			},
			{
				where: {
					id_contato: id,
				},
			}
		);
		res.redirect("/agenda");
	},
	getExcluir: async (req, res) => {
		let { id } = req.params;
		let unicoContato = await Contato.destroy({
			where: {
				id_contato: id,
			},
		});
		res.redirect("/agenda");
	},
	// getUsuarios: async (req, res) => {
	// 	let infos = await Usuario.findAll({
	// 		include: {
	// 			model: Contato,
	// 			as: 'contatos',
	// 			required: true
	// 		}
	// 	})
	// 	return res.send(infos)
	// }
};

module.exports = agendaController;
