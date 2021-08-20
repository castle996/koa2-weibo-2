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

module.exports={
    createAtRelation
}