/**
 * @description user API 路由
 * @author Castle
 */

const router = require('koa-router')()
const {
    isExist,
    register,
    login,
    deleteCurUser
} = require('../../controller/user')
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
module.exports=router