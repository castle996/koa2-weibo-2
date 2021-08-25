/**
 * @description part service
 * @author Castle
 */

const MODELS=require('../db/model/init-tables')
const { formatPart } = require('./_format')

/**
 * create part
 * @param {*} param0 
 * @returns 
 */
async function createPart({code,description,price}){
    console.log(code)
    console.log(description)
    console.log(price)
    const result=await MODELS.parts_castle.create({
        code,
        description,
        price
    })
    return result.dataValues
}
  
/**
 * 
 * @param {*} param0 
 * @param {*} param1 
 * @returns 
 */
async function updatePart({description,price},code){
    const updateData={}
    if (description){
        updateData.description=description
    }
    if (price){
        updateData.price=price
    }

    const whereData={code}

    const result=await MODELS.parts_castle.update(updateData,{
        where:whereData})
    //
    return result[0]>0
}

/**
 * 
 * @param {*} userName 
 * @returns 
 */
async function deletePart(code){
    const result=await MODELS.parts_castle.destroy({
        where:{code}
    })
    //result 删除的行数
    return result>0
}

/**
  * 
  * @param {*} param0 
  * @returns 
  */
async function getPartList({pageIndex=0,pageSize=2}){
    //执行查询
    const result=await MODELS.parts_castle.findAndCountAll({
        attributes:['code','description','price'],
        limit:pageSize,
        offset:pageSize * pageIndex,
        order:[
            ['code','asc']
        ]
    })
    //result.count
    //result.rows
    let partList=result.rows.map(row=>row.dataValues)
    //partList = formatPart(partList)
    
    return {
        count:result.count,
        partList
    }
}
 
module.exports={
    createPart,
    updatePart,
    deletePart,
    getPartList
}