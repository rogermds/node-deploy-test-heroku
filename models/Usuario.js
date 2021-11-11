module.exports = (sequelize, DataType) => {
    const Usuario = sequelize.define('Usuario', {
        id_usuario: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nome: {
            type: DataType.STRING,
            allowNull: false
        },
        celular: {
            type: DataType.STRING,
            allowNull: false
        },
        email: {
            type: DataType.STRING,
            allowNull: false
        },
        senha: {
            type: DataType.STRING,
            allowNull: false
        }
    },{
        tableName: 'usuarios',
        timestamps: false
    })

    Usuario.associate = (models) => {
        Usuario.hasMany(models.Contato,{
            foreignKey: 'id_usuario',
            as: 'contatos'
        })
    }

    return Usuario
}
