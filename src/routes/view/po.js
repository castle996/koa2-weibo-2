/**
 * @description Pos view route
 * @author Castle
 */

const router = require('koa-router')()
const { getAllPO1List,getAllPO2List,getOnePO } = require('../../controller/po')
   
//home page
router.get('/', async (ctx, next) => {
    const result= await getAllPO1List(0)
    await ctx.render('pos/list', {
        count:result.data.count,
        po1List:result.data.po1List
    })
})
router.get('/newpo', async (ctx, next) => {
    await ctx.render('pos/new', {
    })
})
router.get('/detailpo/:idpo1', async (ctx, next) => {
    const {idpo1} = ctx.params
    const result = await getOnePO(idpo1)
    console.log(result)
    await ctx.render('pos/detail', {
        po:result.data
    })
})
//po2 list
router.get('/po2list/:idpo1', async (ctx, next) => {
    const {idpo1} = ctx.params
    ctx.body = await getAllPO2List(idpo1)
})
module.exports = router
   