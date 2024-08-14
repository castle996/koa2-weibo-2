/**
 * @description parts view route
 * @author Castle
 */

const router = require('koa-router')()
const { getAllPartList,getOnePart } = require('../../controller/part')
  
router.get('/newpart', async (ctx, next) => {
    await ctx.render('parts/new', {
    })
})
router.get('/detailpart/:code', async (ctx, next) => {
    const {code} = ctx.params
    const result = await getOnePart(code)
    await ctx.render('parts/detail', {
        part:result.data
    })
})
// parts list
router.get('/partlist', async (ctx, next) => {
    const result= await getAllPartList(0)
    await ctx.render('parts/list', {
        count:result.data.count,
        partList:result.data.partList
    })
})
 
module.exports = router
  