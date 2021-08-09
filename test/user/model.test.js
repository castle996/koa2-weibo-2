/**
 * @description user model test
 * @author Castle
 */

const {User}=require('../../src/db/model/index')

test('User 模型的各个属性，符合预期',()=>{
    const user=User.build({
        userName:'zhangsan',
        password:'123',
        nickName:'张三',
        picture:'/xxx.png',
        city:'潍坊'
    })

    expect(user.userName).toBe('zhangsan')
    expect(user.password).toBe('123')
    expect(user.nickName).toBe('张三')
    expect(user.picture).toBe('/xxx.png')
    expect(user.city).toBe('潍坊')
})

// const server=require('./server')

// test('json 接口返回数据格式正确',async()=>{
//     const res=await server.get('/json')
//     expect(res.body).toEqual({
//         title:'koa2 json'
//     })

//     expect(res.body.title).toBe('koa2 json')
// })


// test('json 接口返回数据格式正确',async()=>{
//     const res=await server.post('/login').send({
//         userName:'zhangsan',
//         password:'123'
//     })
// })