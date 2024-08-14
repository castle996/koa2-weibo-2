const initModels = require('../model/init-models')
const seq = require('../mssql')

const MODELS=initModels(seq)

module.exports = MODELS