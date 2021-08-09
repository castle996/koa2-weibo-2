/**
 * @description utils controller
 * @author Castle
 */

const path=require('path')
const { ErrorModel, SuccessModel } = require('../model/ResModel')
const { uploadFileSizeFailInfo} = require('../model/Errorinfo')
const fse=require('fs-extra')

const DIST_FOLDER_PATH =path.join(__dirname,'..','..','uploadFiles')
const MAX_SIZE=1024*1024*1024

//判断目录是否存在
fse.pathExists(DIST_FOLDER_PATH).then(exist=>{
    if (!exist){
        fse.ensureDir(DIST_FOLDER_PATH)
    }
})

/**
 * 
 * @param {*} param0 
 */
async function saveFile({name,type,size,filePath}){
    if(size>MAX_SIZE){
        await fse.remove(filePath)
        return new ErrorModel(uploadFileSizeFailInfo)
    }

    //移动文件
    const fileName=Date.now() + '.' + name
    const distFilePath=path.join(DIST_FOLDER_PATH,fileName) 
    await fse.move(filePath,distFilePath)

    return new SuccessModel({
        url:'/' + fileName
    })
}

module.exports={
    saveFile
}