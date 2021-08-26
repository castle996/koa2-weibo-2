const Sequelize = require('sequelize')
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('po1_castle', {
        idnumber: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        refdate: {
            type: DataTypes.STRING(31),
            allowNull: false
        },
        payto: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        shipto: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        subtotal: {
            type: DataTypes.DECIMAL(12,4),
            allowNull: false
        },
        tax: {
            type: DataTypes.DECIMAL(12,4),
            allowNull: false
        },
        total: {
            type: DataTypes.DECIMAL(12,4),
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'po1_castle',
        schema: 'dbo',
        timestamps: true,
        indexes: [
            {
                name: 'PK__po1_cast__E629C96CC1F26E52',
                unique: true,
                fields: [
                    { name: 'idnumber' },
                ]
            },
        ]
    })
}
