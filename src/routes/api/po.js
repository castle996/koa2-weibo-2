/**
 * @description part API route
 * @author Castle
 */

const router = require('koa-router')()
const poValidate = require('../../validator/po')
const { genValidator } = require('../../middlewares/validator')
const {
    createPOr,
    updatePOr,
    deletePOr,
    getOnePO
} = require('../../controller/po')
   
router.prefix('/api/po')
   
router.get('/get/:idpo1', async (ctx, next) => {
    const {idpo1} = ctx.params
    ctx.body = await getOnePO(idpo1)
})
//
router.post('/create',genValidator(poValidate), async (ctx, next)=> {
    const {refdate,payto,shipto,subtotal,tax,total,po2list} = ctx.request.body
    ctx.body = await createPOr({refdate,payto,shipto,subtotal,tax,total,po2list})

    //ctx.body = await createPOr({refdate:'08/26/2021',payto:'payto',shipto:'shipto',subtotal:100,tax:10,total:110},[{code:'123',quantity:5},{code:'456',quantity:6}])
})
//
router.post('/update',genValidator(poValidate), async (ctx, next)=> {
    const {refdate,payto,shipto,subtotal,tax,total,idpo1,po2list} = ctx.request.body
    ctx.body = await updatePOr({refdate,payto,shipto,subtotal,tax,total,idpo1,po2list})
})

//
router.post('/delete', async (ctx, next)=> {
    const {idpo1} = ctx.request.body
    ctx.body = await deletePOr(idpo1)
})
module.exports=router