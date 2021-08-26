/**
 * @description part API route
 * @author Castle
 */

const router = require('koa-router')()
const partValidate = require('../../validator/part')
const { genValidator } = require('../../middlewares/validator')
const {
    createPt,
    updatePt,
    deletePt,
    getOnePart
} = require('../../controller/part')
  
router.prefix('/api/part')
  
router.get('/get/:code', async (ctx, next) => {
    const {code} = ctx.params
    ctx.body = await getOnePart(code)
})
//
router.post('/create',genValidator(partValidate), async (ctx, next)=> {
    const {code,description,price} = ctx.request.body
    ctx.body = await createPt({code,description,price})
})
 
//
router.post('/update',genValidator(partValidate), async (ctx, next)=> {
    const {code,description,price} = ctx.request.body
    ctx.body = await updatePt({description,price},code)
})

//
router.post('/delete', async (ctx, next)=> {
    const {code} = ctx.request.body
    ctx.body = await deletePt(code)
})
module.exports=router