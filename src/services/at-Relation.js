/**
 * @description @用户 service
 * @author Castle
 */

const {AtRelation, Blog,User}=require('../db/model/index')
const { formatUser, formatBlog } = require('./_format')
/**
 * 
 * @param {*} blogId 
 * @param {*} userId 
 * @returns 
 */
async function createAtRelation(blogId,userId){
    const result=await AtRelation.create({
        blogId,
        userId
    })
    return result.dataValues
}

/**
 * 
 * @param {*} userId 
 */
async function getAtRelationCount(userId){
    const result = await AtRelation.findAndCountAll({
        where: {
            userId,
            isRead: false
        }
    })
    return result.count
}

/**
 * 
 * @param {*} param0 
 * @returns 
 */
async function getAtUserBlogList({userId,pageIndex,pageSize=2}){
    const result = await Blog.findAndCountAll({
        limit:pageSize,
        offset:pageSize * pageIndex,
        order:[['id','desc']],
        include:[{
            model:AtRelation,
            attributes:['userId','blogId'],
            where: {userId}
        },
        {
            model:User,
            attributes:['userName','nickName','picture']
        }
        ]
    })

    // result.rows
    // result.count

    // 格式化
    let blogList = result.rows.map(row => row.dataValues)
    blogList = formatBlog(blogList)
    blogList = blogList.map(blogItem => {
        blogItem.user = formatUser(blogItem.user.dataValues)
        return blogItem
    })

    return {
        count: result.count,
        blogList
    }
}
module.exports={
    createAtRelation,
    getAtRelationCount,
    getAtUserBlogList
}