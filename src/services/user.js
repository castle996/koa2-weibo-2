/**
 * @description user service
 * @author Castle
 */

const {User}=require('../db/model/index')
const { formatUser } = require('./_format')
/**
 * 获取用户信息
 * @param {*} userName 用户名
 * @param {*} password 密码
 */
async function getUserInfo(userName,password){
    const whereOpt={
        userName
    }
    if (password){
        Object.assign(whereOpt,{password})
    }

    const result=await User.findOne({
        attributes:['id','userName','nickName','picture','city'],
        where:whereOpt
    })

    if (result==null){
        return result
    }

    const formatRes = formatUser(result.dataValues)
    return formatRes
}

/**
 * 注册用户
 * @param {string} userName 
 * @param {string} password
 * @param {number} gender
 * @param {string} nickName 
 * @returns 
 */
async function createUser({userName,password,gender=3,nickName}){

    const result=await User.create({
        userName,
        password,
        nickName:nickName?nickName:userName,
        gender
    })
    
    return result.dataValues
}

/**
 * 
 * @param {*} userName 
 */
async function deleteUser(userName){
    const result=await User.destroy({
        where:{userName}
    })
    //result 删除的行数
    return result>0
}
module.exports={
    getUserInfo,
    createUser,
    deleteUser
}