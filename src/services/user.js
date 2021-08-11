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

/**
 * 
 * @param {*} 修改内容
 * @param {*} 查询条件
 */
async function updateUser({newPassword,newNickName,newPicture,newCity},{userName,password}){
    const updateData={}
    if (newPassword){
        updateData.password=newPassword
    }
    if (newNickName){
        updateData.nickName=newNickName
    }
    if (newPicture){
        updateData.picture=newPicture
    }
    if (newCity){
        updateData.city=newCity
    }
    const whereData={userName}
    if (password){
        whereData.password=password
    }

    const result=await User.update(updateData,{
        where:whereData})
    //
    return result[0]>0
}
/**
 * 
 * @param {*} 修改内容
 * @param {*} 查询条件
 */
async function updatePassword({newPassword},{userName,password}){
    const updateData={}
    if (newPassword){
        updateData.password=newPassword
    }
    const whereData={userName}
    if (password){
        whereData.password=password
    }

    const result=await User.update(updateData,{
        where:whereData})
    //
    return result[0]>0
}
module.exports={
    getUserInfo,
    createUser,
    deleteUser,
    updateUser,
    updatePassword
}