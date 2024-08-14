/**
 * @description user API 路由
 * @author Castle
 */

const router = require('koa-router')()
const {
    isExist,
    register,
    login,
    deleteCurUser,
    changeInfo,
    logout,
    changePassword
} = require('../../controller/user')
const {getFollowers}= require('../../controller/user-relation')
const userValidate = require('../../validator/user')
const { genValidator } = require('../../middlewares/validator')
const { isTest } = require('../../utils/env')
const { loginCheck } = require('../../middlewares/loginChecks')


router.prefix('/api/user')

router.post('/isExist', async (ctx, next)=> {
    const {userName}=ctx.request.body
    ctx.body = await isExist(userName)
})

router.post('/register',genValidator(userValidate), async (ctx, next)=> {
    const {userName,password,gender}=ctx.request.body
    ctx.body = await register({userName,password,gender})
})

router.post('/login', async (ctx, next)=> {
    const {userName,password}=ctx.request.body
    ctx.body = await login(ctx,userName,password)
})

router.post('/delete', loginCheck,async (ctx, next)=> {
    if (isTest){
        //测试环境下，删除自己
        const {userName}=ctx.session.userInfo
        ctx.body = await deleteCurUser(userName)
    }
})

//修改个人信息
router.patch('/changeInfo',loginCheck,genValidator(userValidate), async (ctx, next)=> {
    const {nickName,city,picture}=ctx.request.body
    ctx.body = await changeInfo(ctx,{nickName,city,picture})
})

//修改个人密码
router.patch('/changePassword',loginCheck,genValidator(userValidate), async (ctx, next)=> {
    const { password, newPassword } = ctx.request.body
    const { userName } = ctx.session.userInfo

    ctx.body = await changePassword(userName,password,newPassword)
})

// 退出登录
router.post('/logout', loginCheck, async (ctx, next) => {
    //controller
    ctx.body = await logout(ctx)
})

// 获得at列表
router.get('/getAtList', loginCheck, async (ctx, next) => {
    const {id: userId}=ctx.session.userInfo
    const result=await getFollowers(userId)
    const {followersList}=result.data
    const list =followersList.map(user=>{
        return `${user.nickName} - ${user.userName}`
    })
    ctx.body=list
})

module.exports=router