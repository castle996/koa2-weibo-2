const Sequelize = require('sequelize')

const {MSSQL_CONF}=require('../conf/db')
const {host,user,password,database}=MSSQL_CONF

const seq = new Sequelize(database, user, password, {
    host: host,
    port: 1433,
    dialect: 'mssql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    dialectOptions: {
        options: { encrypt: true,trustServerCertificate: true }
    }
})

module.exports=seq