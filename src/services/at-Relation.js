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

/**
 * 
 * @param {*} param0 
 * @param {*} param1 
 */
async function updateAtRelation(
    { newIsRead }, // 要更新的内容
    { userId, isRead } // 条件
) {
    // 拼接更新内容
    const updateData = {}
    if (newIsRead) {
        updateData.isRead = newIsRead
    }

    // 拼接查询条件
    const whereData = {}
    if (userId) {
        whereData.userId = userId
    }
    if (isRead) {
        whereData.isRead = isRead
    }

    // 执行更新
    const result = await AtRelation.update(updateData, {
        where: whereData
    })
    return result[0] > 0
}
module.exports={
    createAtRelation,
    getAtRelationCount,
    getAtUserBlogList,
    updateAtRelation
}