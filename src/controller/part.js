/**
 * @description part controller
 * @author Castle
 */

const {     createPart,
    updatePart,
    deletePart,
    getPartList,
    getPartInfo } = require('../services/part')
const { ErrorModel, SuccessModel } = require('../model/ResModel')
const { PAGE_SIZE} = require('../conf/constant')
const xss=require('xss')
const { createPartFailInfo,
    updatePartFailInfo,
    deletePartFailInfo,
    partNotFoundInfo
} = require('../model/Errorinfo')
  
/**
 * 
 * @param {*} param0 
 * @returns 
 */
async function createPt({code,description,price}) {
    try {
        const parts_castle= await createPart({
            code:xss(code),
            description:xss(description),
            price
        })
        return new SuccessModel(parts_castle)
    }catch(ex){
        console.error(ex.message, ex.stack)
        return new ErrorModel(createPartFailInfo)
    }
}
/**
 * 
 * @param {*} param0 
 * @param {*} code 
 * @returns 
 */
async function updatePt({description,price},code){
    const result=await updatePart({
        description:xss(description)
        ,price}
    ,code)

    if (result){
        return new SuccessModel()
    }
    return new ErrorModel(updatePartFailInfo)
}
/**
 * 
 * @param {*} code 
 * @returns 
 */
async function deletePt(code){
    const result=await deletePart(code)
    if (result){
        return new SuccessModel()
    }

    return new ErrorModel(deletePartFailInfo)
}
/**
 * 
 * @param {*} pageIndex 
 * @returns 
 */
async function getAllPartList(pageIndex = 0) {
    const result = await getPartList(
        {
            pageIndex,
            pageSize: PAGE_SIZE
        }
    )
    const { count, partList } = result
 
    // 返回
    return new SuccessModel({
        isEmpty: partList.length === 0,
        partList,
        pageSize: PAGE_SIZE,
        pageIndex,
        count
    })
}
async function getOnePart(code) {
    const partInfo=await getPartInfo(code)
    if (partInfo){
        return new SuccessModel(partInfo)
    } else {
        return new ErrorModel(partNotFoundInfo)
    }
}
module.exports={
    createPt,
    updatePt,
    deletePt,
    getAllPartList,
    getOnePart
}