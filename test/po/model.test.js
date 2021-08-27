/**
 * @description po model test
 * @author Castle
 */

 const {MODELS}=require('../../src/db/model/init-tables')

 test('po1_castle 模型的各个属性，符合预期',()=>{
     const po1_castle=MODELS.po1_castle.build({
        idnumber:1,
        refdate:'08/26/2021',
        payto:'payto',
        shipto:'shipto',
        subtotal:100,
        tax:8.25,
        total:108.25
     })
 
     expect(po1_castle.idnumber).toBe(1)
     expect(po1_castle.refdate).toBe('test888')
     expect(po1_castle.payto).toBe('payto')
     expect(po1_castle.shipto).toBe('shipto')
     expect(po1_castle.subtotal).toBe(100)
     expect(po1_castle.tax).toBe(8.25)
     expect(po1_castle.total).toBe(108.25)
 })

 test('po2_castle 模型的各个属性，符合预期',()=>{
    const po2_castle=MODELS.po2_castle.build({
        item:1,
        idpo1:10,
        code:'123',
        qty:1.2
    })

    expect(po2_castle.item).toBe(1)
    expect(po2_castle.idpo1).toBe(10)
    expect(po2_castle.code).toBe('123')
    expect(po2_castle.qty).toBe(1.2)
})
 