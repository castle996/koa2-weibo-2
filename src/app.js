const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const path=require('path')

const errorViewRouter=require('./routes/view/error')
const userViewRouter = require('./routes/view/user')
const userApiRouter = require('./routes/api/user')
const utilsApiRouter = require('./routes/api/utils')

const blogHomeRouter = require('./routes/api/blog-home')
const profileAPIRouter = require('./routes/api/blog-profile')
const blogViewRouter = require('./routes/view/blog')

const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const koaStatic = require('koa-static')

const { REDIS_CONF } = require('./conf/db')
const {isProd}=require('./utils/env')
const { SESSION_SECRET_KEY } = require('./conf/secretKeys')
// error handler
let onerrorConf={}
if (isProd) {
    onerrorConf={
        redict:'/error'
    }
}
onerror(app,onerrorConf)

// middlewares
app.use(bodyparser({
    enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(koaStatic(__dirname + '/public'))
app.use(koaStatic(path.join(__dirname, '..', 'uploadFiles')))

app.use(views(__dirname + '/views', {
    extension: 'ejs'
}))

app.keys=[SESSION_SECRET_KEY]
app.use(session({
    key:'weibo.sid',//cookie name 默认值 'koa.sid'
    prefix:'weibo:sess:',//reids key 的前缀，默认值 'koa:sess:'
    cookie:{
        path:'/',
        httpOnly:true,
        maxAge:24 * 60 * 60 * 1000 //ms
    },
    store: redisStore({
        all:`${REDIS_CONF.host}:${REDIS_CONF.port}`
    })
}))

// logger
// app.use(async (ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

// routes

app.use(userViewRouter.routes(), userViewRouter.allowedMethods())
app.use(blogViewRouter.routes(), blogViewRouter.allowedMethods())
app.use(blogHomeRouter.routes(), blogHomeRouter.allowedMethods())
app.use(profileAPIRouter.routes(), profileAPIRouter.allowedMethods())
app.use(userApiRouter.routes(), userApiRouter.allowedMethods())
app.use(utilsApiRouter.routes(), utilsApiRouter.allowedMethods())
//404路由在下面
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
})

module.exports = app
