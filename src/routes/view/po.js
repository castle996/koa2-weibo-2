/**
 * @description Pos view route
 * @author Castle
 */

const router = require('koa-router')()
const { getSquareBlogList } = require('../../controller/blog-square')
   
// home page
router.get('/', async (ctx, next) => {
   
})
  
// parts list
router.get('/polist', async (ctx, next) => {
    // parts list
    const result = await getSquareBlogList(0)
    const { isEmpty, blogList, pageSize, pageIndex, count } = result.data || {}
  
    await ctx.render('polist', {
        blogData: {
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count
        }
    })
})
  
module.exports = router
   