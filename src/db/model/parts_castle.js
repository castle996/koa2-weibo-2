const Sequelize = require('sequelize')
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('parts_castle', {
        code: {
            type: DataTypes.STRING(3),
            allowNull: false,
            primaryKey: true
        },
        description: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(12,4),
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'parts_castle',
        schema: 'dbo',
        timestamps: true,
        indexes: [
            {
                name: 'PK__parts_ca__357D4CF8B7DCC052',
                unique: true,
                fields: [
                    { name: 'code' },
                ]
            },
        ]
    })
}
