const { check, validationResult, body } = require("express-validator");
const { Usuario } = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const validadorCadastro = [
	check("nome")
		.notEmpty()
		.withMessage("Preencha o seu nome completo")
		.isLength({ min: 5 })
		.withMessage("O nome deve ter pelo menos 5 caracteres"),
	check("celular")
		.isLength({ min: 11 })
		.withMessage("Preencha o telefone corretamente")
		.custom(async (celularBody) => {
			const procuraCelular = await Usuario.findOne({
				where: {
					celular: celularBody,
				},
			});
			if (!procuraCelular) {
				return celularBody;
			}
				if (procuraCelular.celular) {
					return Promise.reject("Celular já cadastrado");
				}
		}),
	check("email")
		.notEmpty()
		.withMessage("E-mail é obrigatório")
		.custom(async (emailBody) => {
			const procuraEmail = await Usuario.findOne({
				where: {
					email: emailBody,
				},
			});
            if (!procuraEmail) {
                return emailBody;
            }
			if (procuraEmail.email) {
				return Promise.reject("E-mail já cadastrado");
			}
		}),
	check("senha")
		.notEmpty()
		.withMessage("A senha é obrigatória")
		.isLength({ min: 6, max: 10 })
		.withMessage("A senha deve ter entre 6 e 10 caracteres"),
	check("confirmarSenha")
		.notEmpty()
		.withMessage("A senha é obrigatória")
		.isLength({ min: 6, max: 10 })
		.withMessage("A senha deve ter entre 6 e 10 caracteres")
		.custom((confirmarSenha, { req }) => {
			const senha = req.body.senha;
			if (senha !== confirmarSenha) {
				throw new Error("As senhas não coincidem");
			} else {
                return confirmarSenha;
            }
		}),
];

module.exports = { validadorCadastro };
