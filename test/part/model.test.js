/**
 * @description part model test
 * @author Castle
 */

 const {MODELS}=require('../../src/db/model/init-tables')

 test('parts_castle 模型的各个属性，符合预期',()=>{
     const parts_castle=MODELS.parts_castle.build({
        code:'888',
        description:'test888',
        price:8.8
     })
 
     expect(parts_castle.code).toBe('888')
     expect(parts_castle.description).toBe('test888')
     expect(parts_castle.price).toBe(8.8)
 })
 