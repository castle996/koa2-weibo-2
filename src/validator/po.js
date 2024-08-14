/**
 * @description po 数据格式校验
 * @author Castle
 */

const validate = require('./_validate')

// 校验规则
const SCHEMA = {
    type: 'object',
    properties: {
        payto: {
            type: 'string',
            maxLength: 255
        },
        shipto: {
            type: 'string',
            maxLength: 255
        },
        subtotal: {
            type: 'number',
            minimum: 0
        },
        tax: {
            type: 'number',
            minimum: 0
        },
        total: {
            type: 'number',
            minimum: 0
        }
    }
}
  
/**
   * 校验微博数据格式
   * @param {Object} data 微博数据
   */
function poValidate(data = {}) {
    return validate(SCHEMA, data)
}
  
module.exports = poValidate
  