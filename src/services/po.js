/**
 * @description po service
 * @author Castle
 */

const {parts_castle,po1_castle,po2_castle}=require('../db/model/init-models')
const { formatPart,formatPO } = require('./_format')
 
/**
  * create part
  * @param {*} param0 
  * @returns 
  */
async function createPO({refdate,payto,shipto,subtotal,tax,total},po2list){
    const result=await po1_castle.create({
        refdate,payto,shipto,subtotal,tax,total
    })
    const data=result.dataValues
    const idpo1=data.idnumber

    await po2_castle.create(po2list.map(po2Item=>{
        idpo1,po2Item.code,po2Item.quantity
    }))
    return data
}
   
/**
  * 
  * @param {*} param0 
  * @param {*} param1 
  * @returns 
  */
async function updatePO({refdate,payto,shipto,subtotal,tax,total},idpo1,po2list){
    const updateData={}
    if (refdate){
        updateData.refdate=refdate
    }
    if (payto){
        updateData.payto=payto
    }
    if (shipto){
        updateData.shipto=shipto
    }
    if (subtotal){
        updateData.subtotal=subtotal
    }
    if (tax){
        updateData.tax=tax
    }
    if (total){
        updateData.total=total
    }
    const whereData={idnumber:idpo1}
    const result=await po1_castle.update(updateData,{
        where:whereData})

    await po2_castle.destroy({
        where:{idpo1}
    })
    await po2_castle.create(po2list.map(po2Item=>{
        idpo1,po2Item.code,po2Item.quantity
    }))
    
    return result[0]>0
}
 
/**
  * 
  * @param {*} userName 
  * @returns 
  */
async function deletePO(idpo1){
    await po2_castle.destroy({
        where:{idpo1}
    })
    const result=await po1_castle.destroy({
        where:{idnumber:idpo1}
    })
    //result 删除的行数
    return result>0
}
 
/**
   * 
   * @param {*} param0 
   * @returns 
   */
async function getPO1List({pageIndex=0,pageSize=2}){
    //执行查询
    const result=await po1_castle.findAndCountAll({
        attributes:['refdate','payto','shipto','subtotal','tax','total'],
        limit:pageSize,
        offset:pageSize * pageIndex,
        order:[
            ['idnumber','desc']
        ]
    })
    //result.count
    //result.rows
    let po1List=result.rows.map(row=>row.dataValues)
    po1List = formatPO(po1List)

    return {
        count:result.count,
        po1List
    }
}
  
/**
   * 
   * @param {*} param0 
   * @returns 
   */
async function getPO2List({idpo1,pageIndex=0,pageSize=2}){
    //执行查询
    const result=await po2_castle.findAndCountAll({
        attributes:['item','quantity'],
        limit:pageSize,
        offset:pageSize * pageIndex,
        order:[
            ['item','asc']
        ],
        include:[{
            model:parts_castle,
            attributes:['code','description','price']
        }],
        where :{
            idpo1
        }
    })
    //result.count
    //result.rows
    let po2List=result.rows.map(row=>row.dataValues)
    po2List = formatPO(po2List)
    po2List=po2List.map(po2Item=>{
        const parts_castle=po2Item.parts_castle.dataValues
        po2Item.parts_castle=formatPart(parts_castle)
        return po2Item
    })
    return {
        count:result.count,
        po2List
    }
}
module.exports={
    createPO,
    updatePO,
    deletePO,
    getPO1List,
    getPO2List
}