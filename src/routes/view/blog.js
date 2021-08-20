/**
 * @description 微博 view 路由
 * @author Castle
 */

const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginChecks')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { getSquareBlogList } = require('../../controller/blog-square')
const { isExist } = require('../../controller/user')
const { getFans, getFollowers } = require('../../controller/user-relation')
const { getHomeBlogList } = require('../../controller/blog-home')
const {getAtMeCount,getAtMeBlogList}=require('../../controller/blog-at')
 
// 首页
router.get('/', loginRedirect, async (ctx, next) => {
    const userInfo = ctx.session.userInfo
    const { id: userId } = userInfo

    // 获取第一页数据
    const result = await getHomeBlogList(userId)
    const { isEmpty, blogList, pageSize, pageIndex, count } = result.data

    // 获取粉丝
    const fansResult = await getFans(userId)
    const { count: fansCount, fansList } = fansResult.data

    // 获取关注人列表
    const followersResult = await getFollowers(userId)
    const { count: followersCount, followersList } = followersResult.data

    // 获取 @ 数量
    const atCountResult = await getAtMeCount(userId)
    const { count: atCount } = atCountResult.data

    await ctx.render('index', {
        userData: {
            userInfo,
            fansData: {
                count: fansCount,
                list: fansList
            },
            followersData: {
                count: followersCount,
                list: followersList
            },
            atCount
        },
        blogData: {
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count
        }
    })
})
 
// 个人主页
router.get('/profile/', loginRedirect, async (ctx, next) => {
    const {userName} = ctx.session.userInfo
    ctx.redirect(`/profile/${userName}`)
})

// 个人主页
router.get('/profile/:userName', loginRedirect, async (ctx, next) => {

    const myUserInfo=ctx.session.userInfo
    const myUserName=myUserInfo.userName

    let curUserInfo
    const {userName:curUserName} = ctx.params
    const isMe=myUserName===curUserName
    if (isMe){
        curUserInfo=myUserInfo
    } else {
        const existResult=await isExist(curUserName)
        if (existResult.errno!==0){
            return
        }
        curUserInfo=existResult.data
    }

    const result=await getProfileBlogList(curUserName,0)

    const {isEmpty,blogList,pageSize,pageIndex,count}=result.data

    // 获取粉丝
    const fansResult = await getFans(curUserInfo.id)
    const { count: fansCount, fansList } = fansResult.data


    // 获取关注人列表
    const followersResult = await getFollowers(curUserInfo.id)
    const { count: followersCount, followersList } = followersResult.data

    // 获取 @ 数量
    const atCountResult = await getAtMeCount(curUserInfo.id)
    const { count: atCount } = atCountResult.data
        
    // 我是否关注了此人？
    const amIFollowed = fansList.some(item => {
        return item.userName === myUserName
    })

    await ctx.render('profile', {
        blogData:{
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count
        },
        userData:{
            userInfo: curUserInfo,
            isMe,
            fansData: {
                count: fansCount,
                list: fansList
            },
            followersData: {
                count: followersCount,
                list: followersList
            },
            amIFollowed
            ,
            atCount
        }
    })
})

// 广场
router.get('/square', loginRedirect, async (ctx, next) => {
    // 获取微博数据，第一页
    const result = await getSquareBlogList(0)
    const { isEmpty, blogList, pageSize, pageIndex, count } = result.data || {}

    await ctx.render('square', {
        blogData: {
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count
        }
    })
})

// 
router.get('/at-me', loginRedirect, async (ctx, next) => {
    //获取@数量
    const {id:userId}=ctx.session.userInfo
    // 获取 @ 数量
    const atCountResult = await getAtMeCount(userId)
    const { count: atCount } = atCountResult.data

    // 第一页
    const result = await getAtMeBlogList(userId)
    const { isEmpty, blogList, pageSize, pageIndex, count } = result.data || {}

    await ctx.render('atMe', {
        atCount,
        blogData: {
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count
        }
    })

    //标记为已读
    if (atCount>0){

    }
})

module.exports = router
 