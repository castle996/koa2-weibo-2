/**
 * @description @用户 service
 * @author Castle
 */

const {AtRelation}=require('../db/model/index')

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
module.exports={
    createAtRelation,
    getAtRelationCount
}