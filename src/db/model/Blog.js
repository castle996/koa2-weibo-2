/**
 * @description 微博数据模型
 * @author Castle
 */

const seq=require('../mssql')
const {INTEGER,STRING,TEXT}= require('../types')
const Blog=seq.define('blog',{
    userId:{
        type:INTEGER,
        allowNull:false,
        comment:'userId'
    },
    content:{
        type:TEXT,
        allowNull:false,
        comment:'content'
    },
    image:{
        type:STRING,
        comment:'image'
    }
})
 
module.exports=Blog