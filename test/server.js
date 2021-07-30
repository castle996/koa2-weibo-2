/**
 * @description jest server
 * @author Castle
 */

const request=require('supertest')
const server=require('../src/app').callback()

module.exports=request(server)
