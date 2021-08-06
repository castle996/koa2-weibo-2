/**
 * @description user controller
 * @author Castle
 */

const { getUserInfo,createUser } = require('../services/user')
const { ErrorModel, SuccessModel } = require('../model/ResModel')
const { registerUserNameNotExistInfo,
    registerUserNameExistInfo,
    registerFailInfo
} = require('../model/Errorinfo')

const doCrypto = require('../utils/cryp')

/**
 * 用户名是否存在
 * @param {*} userName 用户名
 */
async function isExist(userName) {
    const userInfo=await getUserInfo(userName)
    if (userInfo){
        return new SuccessModel(userInfo)
    } else {
        return new ErrorModel(registerUserNameNotExistInfo)
    }
}

/**
 * 注册
 * @param {*} param0 
 * @returns 
 */
async function register({userName,password,gender}) {
    const userInfo=await getUserInfo(userName)
    if (userInfo){
        //用户名已存在
        return new ErrorModel(registerUserNameExistInfo)
    }
    try {
        await createUser({
            userName,
            password: doCrypto(password),
            gender
        })
        return new SuccessModel()
    }catch(ex){
        console.error(ex.message,ex.stack)
        return new ErrorModel(registerFailInfo)
    }
}

module.exports={
    isExist,
    register
}