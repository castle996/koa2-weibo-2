/**
 * @description part 数据格式校验
 * @author Castle
 */

const validate = require('./_validate')

// 校验规则
const SCHEMA = {
    type: 'object',
    properties: {
        code: {
            type: 'string',
            minLength: 3,
            maxLength: 3
        },
        description: {
            type: 'string',
            maxLength: 50
        }
    }
}
 
/**
  * 校验微博数据格式
  * @param {Object} data 微博数据
  */
function partValidate(data = {}) {
    return validate(SCHEMA, data)
}
 
module.exports = partValidate
 