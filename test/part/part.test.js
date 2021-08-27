/**
 * @description part test
 * @author Castle
 */

 const server = require('../server')
 let PART_CODE=''
 function getRandomString(length) {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( var i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
}
 test('new part,应该成功',async()=>{
    PART_CODE=getRandomString(3)
    const description='test' 
    const price=99.99
    const res=await server
    .post('/api/part/create')
    .send({code:PART_CODE,description,price})
    expect(res.body.errno).toBe(0)
    expect(res.body.data.code).toBe(PART_CODE)
    expect(res.body.data.description).toBe(description)
    expect(res.body.data.price).toBe(price)
})

test('update part,应该成功', async () => {
    const res = await server
        .post('/api/part/update')
        .send({code:PART_CODE,description:'test update',price:9.9})
    expect(res.body.errno).toBe(0)
})

test('delete part,应该成功', async () => {
    const res = await server
        .post('/api/part/delete')
        .send({code:PART_CODE})
    expect(res.body.errno).toBe(0)
})

 