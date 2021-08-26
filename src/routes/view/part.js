/**
 * @description parts view route
 * @author Castle
 */

const router = require('koa-router')()
const { getAllPartList } = require('../../controller/part')
  
router.get('/newpart', async (ctx, next) => {
    await ctx.render('parts/new', {
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
  