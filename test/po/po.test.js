/**
 * @description po test
 * @author Castle
 */

 const server = require('../server')
 let PO_ID=''
 test('new po,应该成功',async()=>{
    const refdate='08/26/2021'
    const payto='payto'
    const shipto='shipto'
    const subtotal=100
    const tax=8.25
    const total=108.25
    const po2list=[{code:'123',quantity:5},{code:'456',quantity:6}]
    const res=await server
    .post('/api/po/create')
    .send({refdate,payto,shipto,subtotal,tax,total,po2list} )
    expect(res.body.errno).toBe(0)
    //expect(res.body.data.refdate).toBe(refdate)
    expect(res.body.data.payto).toBe(payto)
    expect(res.body.data.shipto).toBe(shipto)
    expect(res.body.data.subtotal).toBe(subtotal)
    expect(res.body.data.tax).toBe(tax)
    expect(res.body.data.total).toBe(total)

    PO_ID=res.body.data.idnumber
})

test('update po,应该成功', async () => {
    const refdate='08/26/2021'
    const payto='payto_test'
    const shipto='shipto_test'
    const subtotal=100
    const tax=8.25
    const total=108.25
    const po2list=[{code:'123',quantity:7},{code:'456',quantity:8}]
    const res=await server
    .post('/api/po/update')
    .send({refdate,payto,shipto,subtotal,tax,total,po2list,idpo1:PO_ID} )
    expect(res.body.errno).toBe(0)
})

test('delete po,应该成功', async () => {
    const res = await server
        .post('/api/po/delete')
        .send({idpo1:PO_ID})
    expect(res.body.errno).toBe(0)
})

 