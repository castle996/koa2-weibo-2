/**
 * @description 用户关系数据模型
 * @author Castle
 */

const seq=require('../seq')
const {INTEGER,STRING,TEXT}= require('../types')
const UserRelation=seq.define('userRelation',{
    userId:{
        type:INTEGER,
        allowNull:false,
        comment:'用户 ID'
    },
    followerId:{
        type:INTEGER,
        allowNull:false,
        comment:'被关注用户 ID'
    }
})
  
module.exports=UserRelation