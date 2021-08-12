/**
 * @description 微博 view 路由
 * @author Castle
 */

const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginChecks')
const { isExist } = require('../../controller/user')
 
// 首页
router.get('/', loginRedirect, async (ctx, next) => {

    const userInfo = ctx.session.userInfo
    const { id: userId } = userInfo

    await ctx.render('index', {
    })
})
 
module.exports = router
 