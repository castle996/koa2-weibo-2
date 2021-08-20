/**
 * @description blog controller
 * @author Castle
 */

const { createBlog,getFollowersBlogList } = require('../services/blog')
const { ErrorModel, SuccessModel } = require('../model/ResModel')
const { PAGE_SIZE,REG_FOR_AT_WHO } = require('../conf/constant')
const xss=require('xss')
const { createBlogFailInfo
} = require('../model/Errorinfo')
const {getUserInfo} =require('../services/user')
const {createAtRelation} =require('../services/at-Relation')
 
/**
  * 注册
  * @param {Object} {userId,content,image} 
  * @returns 
  */
async function create({userId,content,image}) {

    //分析并收集 content 中的 @ 用户
    const atUserNameList=[]
    conent=content.replace(
        REG_FOR_AT_WHO,
        (matchStr, nickName, userName) => {
            atUserNameList.push(userName)
            return matchStr //替换不生效，预期
        }
    )
    //根据@用户名查询用户信息
    const atUserList= await Promise.all(
        atUserNameList.map(userName=>getUserInfo(userName))
    )
    //根据用户信息，获取用户id
    const atUserIdList=atUserList.map(user=>user.id)

    try {
        const blog= await createBlog({
            userId,
            content:xss(content),
            image
        })

        await Promise.all(atUserIdList.map(
            userId=>createAtRelation(blog.id,userId)
        ))

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