/**
 * @description 存储配置
 * @author Castle
 */

const {isProd}=require('../utils/env')

REDIS_CONF={
    port:6379,
    host:'127.0.0.1'
}

MYSQL_CONF={
    host:'127.0.0.1',
    user:'root',
    password:'15963',
    port:'3306',
    database:'koa2_weibo_db'

}
MSSQL_CONF={
    host:'192.168.16.148',
    user:'sa',
    password:'Weifang@1520#',
    port:1433,
    database:'test_db'

}
if (isProd) {
    REDIS_CONF = {
        // 线上的 redis 配置
        port: 6379,
        host: '127.0.0.1'
    }

    MYSQL_CONF = {
        // 线上的 mysql 配置
        host: 'localhost',
        user: 'root',
        password: '15963',
        port: '3306',
        database: 'koa2_weibo_db'
    }

    MSSQL_CONF={
        host:'192.168.16.148',
        user:'sa',
        password:'Weifang@1520#',
        port:1433,
        database:'test_db'
    
    }
    
}
module.exports={
    REDIS_CONF,
    MYSQL_CONF,
    MSSQL_CONF
}