module.exports = (sequelize, DataType) => {
    const Contato = sequelize.define(
			"Contato",
			{
				id_contato: {
					type: DataType.INTEGER,
					primaryKey: true,
					autoIncrement: true,
					allowNull: false,
				},
				nome: {
					type: DataType.STRING,
					allowNull: false,
				},
				celular1: {
					type: DataType.STRING,
					allowNull: false,
				},
				celular2: {
					type: DataType.STRING,
					allowNull: true,
				},
				telefone: {
					type: DataType.STRING,
					allowNull: true,
				},
				id_usuario: {
					type: DataType.INTEGER,
					primaryKey: true,
					allowNull: false,
				},
			},
			{
				tableName: "contatos",
				timestamps: false,
			}
		);
	Contato.associate = (models) => {
		Contato.belongsTo(models.Usuario, {
			foreignKey: 'id_usuario',
			as: 'usuario'
		})
	}

    return Contato
}
