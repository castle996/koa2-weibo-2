/**
 * @description utils API 路由
 * @author Castle
 */

const router = require('koa-router')()
const {
    saveFile
} = require('../../controller/utils')
const { loginCheck } = require('../../middlewares/loginChecks')
const koaForm=require('formidable-upload-koa')
 
 
router.prefix('/api/utils')
 

router.post('/upload',loginCheck,koaForm(), async (ctx, next)=> {
    const file=ctx.req.files['file']
    const {size,path,name,type}=file
    ctx.body = await saveFile({name,type,size,filePath:path})
})
 
module.exports=router