/**
 * @description 用户关系 controller
 * @author Castle
 */

const { SuccessModel } = require('../model/ResModel')
const { getUsersByFollower,getFollowersByUser } = require('../services/user-relation')
 
/**
 * 
 * @param {*} userId 
 */
async function getFans(userId){
    const { count, userList } = await getUsersByFollower(userId)

    // 返回
    return new SuccessModel({
        count,
        fansList: userList
    })
}
/**
 * 获取关注人列表
 * @param {number} userId userId
 */
async function getFollowers(userId) {
    const { count, userList } = await getFollowersByUser(userId)

    return new SuccessModel({
        count,
        followersList: userList
    })
}
module.exports = {
    getFans,
    getFollowers
}