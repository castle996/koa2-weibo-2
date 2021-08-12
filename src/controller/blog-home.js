/**
 * @description blog controller
 * @author Castle
 */

const { createBlog } = require('../services/blog')
const { ErrorModel, SuccessModel } = require('../model/ResModel')
const { createBlogFailInfo
} = require('../model/Errorinfo')
 
/**
  * 注册
  * @param {*} param0 
  * @returns 
  */
async function create({userId,content,image}) {
    try {
        const blog= await createBlog({
            userId,
            content,
            image
        })
        return new SuccessModel()
    }catch(ex){
        console.error(ex.message, ex.stack)
        return new ErrorModel(createBlogFailInfo)
    }
}
 
module.exports={
    create
}