/**
 * @description user controller
 * @author Castle
 */

const { getUserInfo,createUser,deleteUser } = require('../services/user')
const { ErrorModel, SuccessModel } = require('../model/ResModel')
const { registerUserNameNotExistInfo,
    registerUserNameExistInfo,
    registerFailInfo,
    loginFailInfo,
    deleteUserFailInfo
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

/**
 * 登录
 * @param {Object} ctx 
 * @param {string} userName 
 * @param {string} password 
 */
async function login(ctx,userName,password){
    //登录成功 ctx.session.userInfo=xxx
    const userInfo=await getUserInfo(userName,doCrypto(password))
    if (!userInfo){
        //登录失败
        return new ErrorModel(loginFailInfo)
    }

    //登录成功
    if (ctx.session.userInfo==null){
        ctx.session.userInfo=userInfo
    }
    console.log(ctx.session.userInfo)
    return new SuccessModel()
}

/**
 * 
 * @param {*} userName 
 */
async function deleteCurUser(userName){
    const result=await deleteUser(userName)
    if (result){
        return new SuccessModel()
    }

    return new ErrorModel(deleteUserFailInfo)
}
module.exports={
    isExist,
    register,
    login,
    deleteCurUser
}