/**
 * @description po controller
 * @author Castle
 */

const {   createPO,
    updatePO,
    deletePO,
    getPO1List,
    getPO2List,
    getPOInfo
} = require('../services/po')
const { ErrorModel, SuccessModel } = require('../model/ResModel')
const { PAGE_SIZE} = require('../conf/constant')
const xss=require('xss')
const { createPOFailInfo,
    updatePOFailInfo,
    deletePOFailInfo,
    poNotFoundInfo
} = require('../model/Errorinfo')
  
/**
 * 
 * @param {*} param0 
 * @param {*} po2list 
 * @returns 
 */
async function createPOr({refdate,payto,shipto,subtotal,tax,total,po2list}) {
    try {
        const po1_castle= await createPO({
            refdate,
            payto:xss(payto),
            shipto:xss(shipto),
            subtotal,
            tax,
            total,
            po2list
        })
        return new SuccessModel(po1_castle)
    }catch(ex){
        console.error(ex.message, ex.stack)
        return new ErrorModel(createPOFailInfo)
    }
}
/**
 * 
 * @param {*} param0 
 * @param {*} idpo1 
 * @param {*} po2list 
 * @returns 
 */
async function updatePOr({refdate,payto,shipto,subtotal,tax,total,idpo1,po2list}){
    const result=await updatePO({
        refdate,
        payto:xss(payto),
        shipto:xss(shipto),
        subtotal,
        tax,
        total,
        idpo1,
        po2list
    })

    if (result){
        return new SuccessModel()
    }
    return new ErrorModel(updatePOFailInfo)
}
/**
 * 
 * @param {*} code 
 * @returns 
 */
async function deletePOr(idpo1){
    const result=await deletePO(idpo1)
    if (result){
        return new SuccessModel()
    }

    return new ErrorModel(deletePOFailInfo)
}
/**
 * 
 * @param {*} pageIndex 
 * @returns 
 */
async function getAllPO1List(pageIndex = 0) {
    const result = await getPO1List(
        {
            pageIndex,
            pageSize: PAGE_SIZE
        }
    )
    const { count, po1List } = result
 
    // 返回
    return new SuccessModel({
        isEmpty: po1List.length === 0,
        po1List,
        pageSize: PAGE_SIZE,
        pageIndex,
        count
    })
}

async function getAllPO2List(idpo1,pageIndex = 0) {
    const result = await getPO2List(
        {
            idpo1,
            pageIndex,
            pageSize: PAGE_SIZE
        }
    )
    const { count, po2List } = result
 
    // 返回
    return new SuccessModel({
        isEmpty: po2List.length === 0,
        po2List,
        pageSize: PAGE_SIZE,
        pageIndex,
        count
    })
}
async function getOnePO(idpo1) {
    const poInfo=await getPOInfo(idpo1)
    if (poInfo){
        return new SuccessModel(poInfo)
    } else {
        return new ErrorModel(poNotFoundInfo)
    }
}
module.exports={
    createPOr,
    updatePOr,
    deletePOr,
    getAllPO1List,
    getAllPO2List,
    getOnePO
}