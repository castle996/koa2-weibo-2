/**
 * @description 微博 @ 用户的关系，数据模型
 * @author Castle
 */

const seq = require('../mssql')
const { INTEGER, BOOLEAN } = require('../types')

const AtRelation = seq.define('atRelation', {
    userId: {
        type: INTEGER,
        allowNull: false,
        comment: 'userId'
    },
    blogId: {
        type: INTEGER,
        allowNull: false,
        comment: 'blogId'
    },
    isRead: {
        type: BOOLEAN,
        allowNull: false,
        defaultValue: false, // 默认未读
        comment: 'isRead'
    }
})

module.exports = AtRelation
