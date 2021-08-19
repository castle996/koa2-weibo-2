/**
 * @description blog controller
 * @author Castle
 */

const { createBlog,getFollowersBlogList } = require('../services/blog')
const { ErrorModel, SuccessModel } = require('../model/ResModel')
const { PAGE_SIZE } = require('../conf/constant')
const xss=require('xss')
const { createBlogFailInfo
} = require('../model/Errorinfo')
 
/**
  * 注册
  * @param {Object} {userId,content,image} 
  * @returns 
  */
async function create({userId,content,image}) {
    try {
        const blog= await createBlog({
            userId,
            content:xss(content),
            image
        })
        return new SuccessModel(blog)
    }catch(ex){
        console.error(ex.message, ex.stack)
        return new ErrorModel(createBlogFailInfo)
    }
}
 
/**
 * 获取首页微博列表
 * @param {number} userId userId
 * @param {number} pageIndex page index
 */
async function getHomeBlogList(userId, pageIndex = 0) {
    const result = await getFollowersBlogList(
        {
            userId,
            pageIndex,
            pageSize: PAGE_SIZE
        }
    )
    const { count, blogList } = result

    // 返回
    return new SuccessModel({
        isEmpty: blogList.length === 0,
        blogList,
        pageSize: PAGE_SIZE,
        pageIndex,
        count
    })
}

module.exports={
    create,
    getHomeBlogList
}