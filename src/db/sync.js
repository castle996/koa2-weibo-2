/**
 * @description sequelize 同步数据库
 * @author Castle
 */

const seq=require('./mssql')
require('./model/index')

seq.authenticate().then(()=>{
    console.log('auth ok')
}).catch(()=>{
    console.log('auth err')
})

seq.sync({force:true}).then(()=>{
    console.log('sync ok')
    process.exit()
})