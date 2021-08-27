/**
 * @description po service
 * @author Castle
 */

const MODELS=require('../db/model/init-tables')
const { formatPO } = require('./_format')
 
/**
  * create part
  * @param {*} param0 
  * @returns 
  */
async function createPO({refdate,payto,shipto,subtotal,tax,total,po2list}){
    const result=await MODELS.po1_castle.create({
        refdate,payto,shipto,subtotal,tax,total
    })
    const data=result.dataValues
    const idpo1=data.idnumber
    if (po2list != null){
        po2list.map(async po2Item=>await MODELS.po2_castle.create(
            {idpo1,code:po2Item.code,quantity:po2Item.quantity}
        ))
    }
    return data
}
   
/**
  * 
  * @param {*} param0 
  * @param {*} param1 
  * @returns 
  */
async function updatePO({refdate,payto,shipto,subtotal,tax,total,idpo1,po2list}){
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
    const result=await MODELS.po1_castle.update(updateData,{
        where:whereData})

    await MODELS.po2_castle.destroy({
        where:{idpo1}
    })
    if (po2list != null){
        po2list.map(async po2Item=>await MODELS.po2_castle.create(
            {idpo1,code:po2Item.code,quantity:po2Item.quantity}
        ))
    }
    
    return result[0]>0
}
 
/**
  * 
  * @param {*} userName 
  * @returns 
  */
async function deletePO(idpo1){
    await MODELS.po2_castle.destroy({
        where:{idpo1}
    })
    const result=await MODELS.po1_castle.destroy({
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
async function getPO1List({pageIndex=0,pageSize=10}){
    //执行查询
    const result=await MODELS.po1_castle.findAndCountAll({
        attributes:['idnumber','refdate','payto','shipto','subtotal','tax','total'],
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
async function getPO2List({idpo1,pageIndex=0,pageSize=10}){
    //执行查询
    const result=await MODELS.po2_castle.findAndCountAll({
        attributes:['item','quantity'],
        limit:pageSize,
        offset:pageSize * pageIndex,
        order:[
            ['item','asc']
        ],
        include:[{
            model:MODELS.po1_castle,as:'idpo1_po1_castle',
            attributes:['idnumber','payto','shipto']
        }],
        where :{
            idpo1
        }
    })
    //result.count
    //result.rows
    let po2List=result.rows.map(row=>row.dataValues)
    return {
        count:result.count,
        po2List
    }
}
async function getPOInfo(idpo1){
    const result=await MODELS.po1_castle.findOne({
        attributes:['idnumber','refdate','payto','shipto','subtotal','tax','total'],
        include:[{
            model:MODELS.po2_castle,as: 'po2_castles',
            attributes:['item','quantity'],
            include:[{
                model:MODELS.parts_castle,as:'code_parts_castle',
                attributes:['code','description','price']
            }],
        }],
        where:{
            idnumber:idpo1
        }
    })

    if (result==null){
        return result
    }

    return result.dataValues
}
module.exports={
    createPO,
    updatePO,
    deletePO,
    getPO1List,
    getPO2List,
    getPOInfo
}