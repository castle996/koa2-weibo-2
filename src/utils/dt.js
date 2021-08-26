/**
 * @description format date
 * @author Castle
 */
const {format}=require('date-fns')

/**
 * 格式化时间
 * @param {*} str 
 * @returns 
 */
function timeFormat(str){
    return format(new Date(str),'MM/dd/YYY')
    // return format(new Date(str),'MM.dd HH:mm')
}

module.exports={
    timeFormat
}