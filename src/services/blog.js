/**
 * @description blog service
 * @author Castle
 */

const {Blog,User}=require('../db/model/index')
const { formatUser, formatBlog } = require('./_format')
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
    return result.dataValues
}
 
/**
 * 
 * @param {*} param0 
 * @returns 
 */
async function getBlogListByUser({userName,pageIndex=0,pageSize=10}){
    //拼接查询条件
    const userWhereOpts={}
    if (userName){
        userWhereOpts.userName=userName
    }
 
    //执行查询
    const result=await Blog.findAndCountAll({
        limit:pageSize,
        offset:pageSize * pageIndex,
        order:[
            ['id','desc']
        ],
        include:[{
            model:User,
            attributes:['userName','nickName','picture'],
            where:userWhereOpts
        }]
    })
    //result.count
    //result.rows
    let blogList=result.rows.map(row=>row.dataValues)
    blogList = formatBlog(blogList)
    blogList=blogList.map(blogItem=>{
        const user=blogItem.user.dataValues
        blogItem.user=formatUser(user)
        return blogItem
    })
    return {
        count:result.count,
        blogList
    }
}

module.exports={
    createBlog,
    getBlogListByUser
}