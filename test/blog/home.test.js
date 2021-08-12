/**
 * @description blog api test
 * @author Castle
 */

 const server=require('../server')
 const {COOKIE}=require('../testUserInfo')
 let BLOG_ID=''
 //new blog
 test('new blog,应该成功',async()=>{
     const content='单元测试内容_' + Date.now()
     const image='/xxx.png'

     const res=await server
     .post('/api/blog/create')
     .send({content,image})
     .set('cookie',COOKIE)
     expect(res.body.errno).toBe(0)
     expect(res.body.data.content).toBe(content)
     expect(res.body.data.image).toBe(image)

     BLOG_ID=res.body.data.id
 })
