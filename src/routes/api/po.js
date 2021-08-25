/**
 * @description part API route
 * @author Castle
 */

const router = require('koa-router')()
const poValidate = require('../../validator/po')
const { genValidator } = require('../../middlewares/validator')
const {
    createPOr
} = require('../../controller/po')
   
router.prefix('/api/po')
   
//
router.post('/create',genValidator(poValidate), async (ctx, next)=> {
    const {refdate,payto,shipto,subtotal,tax,total,po2list} = ctx.request.body
    ctx.body = await createPOr({refdate,payto,shipto,subtotal,tax,total},po2list)
})
  
module.exports=router