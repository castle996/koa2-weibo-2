/**
 * @description profile controller
 * @author Castle
 */

const { getBlogListByUser } = require('../services/blog')
const { SuccessModel } = require('../model/ResModel')
const {PAGE_SIZE}=require('../conf/constant')
  
/**
 * 获取个人主页blog列表
 * @param {*} userName 
 * @param {*} pageIndex 
 * @returns 
 */
async function getProfileBlogList(userName,pageIndex=0) {
    const result=await getBlogListByUser({
        userName,
        pageIndex,
        pageSize:PAGE_SIZE
    })
    const blogList=result.blogList
    return new SuccessModel({
        isEmpty:blogList.length===0,
        blogList,
        pageSize:PAGE_SIZE,
        pageIndex,
        count:result.count
    })
}
  
module.exports={
    getProfileBlogList
}