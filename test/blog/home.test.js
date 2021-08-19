/**
 * @description blog api test
 * @author Castle
 */

 const server=require('../server')
 const {Z_COOKIE}=require('../testUserInfo')
 let BLOG_ID=''
 //new blog
 test('new blog,应该成功',async()=>{
     const content='单元测试内容_' + Date.now()
     const image='/xxx.png'

     const res=await server
     .post('/api/blog/create')
     .send({content,image})
     .set('cookie',Z_COOKIE)
     expect(res.body.errno).toBe(0)
     expect(res.body.data.content).toBe(content)
     expect(res.body.data.image).toBe(image)

     BLOG_ID=res.body.data.id
 })


 test('个人主页，加载第一页数据，应该成功',async()=>{
    const res=await server
    .get(`/api/blog/loadMore/0`)
    .set('cookie',Z_COOKIE)
    expect(res.body.errno).toBe(0)

    const data=res.body.data
    expect(data).toHaveProperty('isEmpty')
    expect(data).toHaveProperty('blogList')
    expect(data).toHaveProperty('pageSize')
    expect(data).toHaveProperty('pageIndex')
    expect(data).toHaveProperty('count')

})