/**
 * @description user API 路由
 * @author Castle
 */

const router = require('koa-router')()
const {
    isExist
} = require('../../controller/user')

router.prefix('/api/user')

router.post('/register', async (ctx, next)=> {
    await ctx.render('register',{})
})
router.post('/isExist', async (ctx, next)=> {
    const {userName}=ctx.request.body
    ctx.body = await isExist(userName)
})
module.exports=router