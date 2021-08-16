/**
 * @description 用户关系 service
 * @author Castle
 */

const {User,UserRelation}=require('../db/model/index')
const { formatUser } = require('./_format')
const Sequelize = require('sequelize')

/**
 * 获取关注该用户的用户列表，即用户的粉丝
 * @param {*} followerId 
 */
async function getUsersByFollower(followerId){
    const result=await User.findAndCountAll({
        attributes:['id','userName','nickName','picture'],
        order:[
            ['id','desc']
        ],
        include:[{
            model:UserRelation,
            where:{followerId}
        }]
    })

    //result.count
    //result.rows
    let userList=result.rows.map(row=>row.dataValues)
    userList = formatUser(userList)

    return {
        count:result.count,
        userList
    }
}
 
/**
 * 获取关注人列表
 * @param {number} userId userId
 */
async function getFollowersByUser(userId) {
    const result = await UserRelation.findAndCountAll({
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: User,
                attributes: ['id', 'userName', 'nickName', 'picture']
            }
        ],
        where: {
            userId,
            followerId: {
                [Sequelize.Op.ne]: userId
            }
        }
    })
    // result.count 总数
    // result.rows 查询结果，数组

    let userList = result.rows.map(row => row.dataValues)

    userList = userList.map(item => {
        let user = item.user
        user = user.dataValues
        user = formatUser(user)
        return user
    })

    return {
        count: result.count,
        userList
    }
}


module.exports={
    getUsersByFollower,
    getFollowersByUser
}