/**
 * @description 用户关系数据模型
 * @author Castle
 */

const seq=require('../mssql')
const {INTEGER,STRING,TEXT}= require('../types')
const UserRelation=seq.define('userRelation',{
    userId:{
        type:INTEGER,
        allowNull:false,
        comment:'userId'
    },
    followerId:{
        type:INTEGER,
        allowNull:false,
        comment:'followerId'
    }
})
  
module.exports=UserRelation