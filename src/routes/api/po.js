/**
 * @description part API route
 * @author Castle
 */

const router = require('koa-router')()
const blogValidate = require('../../validator/blog')
const { genValidator } = require('../../middlewares/validator')
const {
    create
} = require('../../controller/blog-home')
   
router.prefix('/api/po')
   
//
router.post('/create',genValidator(blogValidate), async (ctx, next)=> {
    const { content, image } = ctx.request.body
    const { id: userId } = ctx.session.userInfo
    ctx.body = await create({ userId, content, image })
})
  
module.exports=router