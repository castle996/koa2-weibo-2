const Sequelize = require('sequelize')
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('po2_castle', {
        item: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        idpo1: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'po1_castle',
                key: 'idnumber'
            }
        },
        code: {
            type: DataTypes.STRING(3),
            allowNull: false,
            references: {
                model: 'parts_castle',
                key: 'code'
            }
        },
        quantity: {
            type: DataTypes.DECIMAL(12,4),
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'po2_castle',
        schema: 'dbo',
        timestamps: true,
        indexes: [
            {
                name: 'PK__po2_cast__99B8822B24071C53',
                unique: true,
                fields: [
                    { name: 'item' },
                ]
            },
        ]
    })
}
