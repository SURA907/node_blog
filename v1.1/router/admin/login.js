const express = require('express')
const sha256 = require('./../sha256')

/**
 * 处理/login请求的路由模块
 */
module.exports = function() {
    const router = express.Router()

    // 渲染登录页面
    router.get('/admin/login', (req, res)=>{
        res.render('./admin/login.ejs', {})
        res.end()
    })

    // 对用户提交的密码进行hash (sha256)
    router.post('/admin/login', (req, res, next)=>{
        req.body.password = sha256.update(req.body.password)
        next()
    })

    // 查询数据库，获取用户信息
    router.post('/admin/login', (req, res, next)=>{
        the_args = [req.body.username]
        let get_user_message = require('./../../model/db').select.user_message
        get_user_message(the_args, (err, data)=>{
            if (err) {
                res.send({'ok': false,'message': 'server error'})
                res.end()
            } else {
                req.user_message = data
                next()
            }
        })
    })

    // 对比用户输入的用户名和密码是否正确
    router.post('/admin/login', (req, res)=>{
        let data = req.user_message
        if (data.length === 0 ) {
            // 用户不存在
            res.send({'ok': false, 'message': 'the user is not exist'})
            res.end()
        } else if (data[0].password === req.body.password){
            // 用户名和密码匹配
            req.session['user_status'] = data[0]
            res.send({'ok': true, 'message': 'success'})
            res.end()
        } else {
            // 用户名和密码不匹配
            res.send({'ok': false, 'message': 'the username and password is not match'})
            res.end()
        }
    })

    return router
}