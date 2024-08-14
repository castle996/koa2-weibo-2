/**
 * @description 数据格式化
 * @author Castle
 */

const {DEFAULT_PICTURE,REG_FOR_AT_WHO}=require('../conf/constant')
const { timeFormat } = require('../utils/dt')
/**
 * 用户默认头像
 * @param {Object} obj 
 * @returns 
 */
function _formatUserPicture(obj){
    if(obj.picture==null){
        obj.picture=DEFAULT_PICTURE
    }
    return obj
}

/**
 * 格式化时间
 * @param {Object} obj 
 * @returns 
 */
function _formatDBTime(obj){
    obj.refdate= timeFormat(obj.refdate)
    // obj.createdAtFormat= timeFormat(obj.createdAt)
    // obj.updatedAtFormat= timeFormat(obj.updatedAt)
    return obj
}

/**
 * 格式化微博内容
 * @param {Object} obj 微博数据对象
 */
function _formatContent(obj) {
    obj.contentFormat = obj.content

    obj.contentFormat = obj.contentFormat.replace(
        REG_FOR_AT_WHO,
        (matchStr, nickName, userName) => {
            return `<a href="/profile/${userName}">@${nickName}</a>`
        }
    )

    return obj
}

/**
 * 格式化用户信息
 * @param {Array|Object} list 
 */
function formatUser(list){
    if (list==null){
        return list
    }

    if (list instanceof Array){
        return list.map(_formatUserPicture)
    }

    return _formatUserPicture(list)
}

/**
 * 格式化Blog信息
 * @param {Array|Object} list 
 */
function formatBlog(list){
    if (list==null){
        return list
    }

    if (list instanceof Array){
        return list.map(_formatDBTime).map(_formatContent)
    }

    let result=list
    result=_formatDBTime(result)
    result=_formatContent(result)
    return result
}

/**
 * 
 * @param {*} list 
 * @returns 
 */
function formatPart(list){
    if (list==null){
        return list
    }

    if (list instanceof Array){
        return list.map(_formatDBTime)
    }

    let result=list
    result=_formatDBTime(result)
    return result
}

/**
 * 
 * @param {*} list 
 * @returns 
 */
function formatPO(list){
    if (list==null){
        return list
    }

    if (list instanceof Array){
        return list.map(_formatDBTime)
    }

    let result=list
    result=_formatDBTime(result)
    return result
}

module.exports={
    formatUser,
    formatBlog,
    formatPart,
    formatPO
}