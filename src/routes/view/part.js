/**
 * @description parts view route
 * @author Castle
 */

const router = require('koa-router')()
const { getSquareBlogList } = require('../../controller/blog-square')
  
// parts list
router.get('/partlist', async (ctx, next) => {
    // parts list
    const result = await getSquareBlogList(0)
    const { isEmpty, blogList, pageSize, pageIndex, count } = result.data || {}
 
    await ctx.render('partlist', {
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
  