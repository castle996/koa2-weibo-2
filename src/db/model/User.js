/**
 * @description 用户数据模型
 * @author Castle
 */

const seq=require('../mssql')
const {STRING,DECIMAL}= require('../types')
const User=seq.define('user',{
    userName:{
        type:STRING,
        allowNull:false,
        unique:true,
        comment:'userName'
    },
    password:{
        type:STRING,
        allowNull:false,
        comment:'password'
    },
    nickName:{
        type:STRING,
        allowNull:false,
        comment:'nickName'
    },
    gender:{
        type:DECIMAL,
        allowNull:false,
        defaultValue:3,
        comment:'gender'
    },
    picture:{
        type:STRING,
        comment:'picture'
    },
    city:{
        type:STRING,
        comment:'city'
    }
})

module.exports=User