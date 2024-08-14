const Sequelize = require('sequelize')

const {MSSQL_CONF}=require('../conf/db')
const {host,user,password,database,port}=MSSQL_CONF

const seq = new Sequelize(database, user, password, {
    host: host,
    port: port,
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