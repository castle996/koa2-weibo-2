/**
 * @description parts view route
 * @author Castle
 */

const router = require('koa-router')()
const { getAllPartList } = require('../../controller/part')
  
// home page
router.get('/', async (ctx, next) => {
    const result= await getAllPartList(0)
    
    await ctx.render('parts/list', {
        count:result.data.count,
        partList:result.data.partList
    })
})
router.get('/new', async (ctx, next) => {
    await ctx.render('parts/new', {
    })
})
// parts list
router.get('/partlist', async (ctx, next) => {
    const result = await getAllPartList(0)
    const { isEmpty, partList, pageSize, pageIndex, count } = result.data || {}
 
    await ctx.render('parts/list', {
        partData: {
            isEmpty,
            partList,
            pageSize,
            pageIndex,
            count
        }
    })
})
 
module.exports = router
  