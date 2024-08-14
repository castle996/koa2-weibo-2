var DataTypes = require('sequelize').DataTypes
var _parts_castle = require('./parts_castle')
var _po1_castle = require('./po1_castle')
var _po2_castle = require('./po2_castle')

function initModels(sequelize) {
    var parts_castle = _parts_castle(sequelize, DataTypes)
    var po1_castle = _po1_castle(sequelize, DataTypes)
    var po2_castle = _po2_castle(sequelize, DataTypes)

    po2_castle.belongsTo(parts_castle, { as: 'code_parts_castle', foreignKey: 'code'})
    parts_castle.hasMany(po2_castle, { as: 'po2_castles', foreignKey: 'code'})
    po2_castle.belongsTo(po1_castle, { as: 'idpo1_po1_castle', foreignKey: 'idpo1'})
    po1_castle.hasMany(po2_castle, { as: 'po2_castles', foreignKey: 'idpo1'})

    return {
        parts_castle,
        po1_castle,
        po2_castle,
    }
}
module.exports = initModels
module.exports.initModels = initModels
module.exports.default = initModels
