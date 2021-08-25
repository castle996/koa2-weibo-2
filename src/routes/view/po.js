/**
 * @description Pos view route
 * @author Castle
 */

const router = require('koa-router')()
const { getAllPO1List,getAllPO2List } = require('../../controller/po')
   
// home page
// router.get('/', async (ctx, next) => {
//     const result = await getAllPO1List(0)
//     const { isEmpty, po1List, pageSize, pageIndex, count } = result.data || {}
  
//     await ctx.render('po1list', {
//         po1Data: {
//             isEmpty,
//             po1List,
//             pageSize,
//             pageIndex,
//             count
//         }
//     })
// })
  
// po2 list
// router.get('/po2list', async (ctx, next) => {
//     const result = await getAllPO2List(0)
//     const { isEmpty, po2List, pageSize, pageIndex, count } = result.data || {}
  
//     await ctx.render('po2list', {
//         po2Data: {
//             isEmpty,
//             po2List,
//             pageSize,
//             pageIndex,
//             count
//         }
//     })
// })
module.exports = router
   