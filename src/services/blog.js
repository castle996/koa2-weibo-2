/**
 * @description blog service
 * @author Castle
 */

const {Blog}=require('../db/model/index')
/**
  * 创建微博
  * @param {Object} {userId,content,image}
  */
async function createBlog({userId,content,image}){
    const result=await Blog.create({
        userId,
        content,
        image
    })
    console.log(result.dataValues)
    return result.dataValues
}
 
module.exports={
    createBlog
}