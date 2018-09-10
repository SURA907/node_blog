const express = require('express')

/**
 * 处理 /admin/* 请求的模块
 */

// 根据session判断用户是否登录
//  未登录用户会被重定向至/admin/login
module.exports = function() {
    const router = express.Router()

    router.all('*', (req, res, next)=>{
        if (!req.session['user_status'] && req.url !== '/admin/login') {
            res.redirect('/admin/login')
        } else {
            next()
        }
    })

    return router
}