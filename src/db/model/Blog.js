/**
 * @description 微博数据模型
 * @author Castle
 */

const seq=require('../seq')
const {INTEGER,STRING,TEXT}= require('../types')
const Blog=seq.define('blog',{
    userId:{
        type:INTEGER,
        allowNull:false,
        comment:'用户 ID'
    },
    content:{
        type:TEXT,
        allowNull:false,
        comment:'内容'
    },
    image:{
        type:STRING,
        comment:'图片'
    }
})
 
module.exports=Blog