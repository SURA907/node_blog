const express = require('express')

/**
 * 处理添加用户请求的模块
 */

module.exports = function() {
    const router = express.Router()

    // 渲染添加用户界面
    router.get('/admin/admin_user/add_user', (req, res)=>{
        res.render('./admin/admin_user/add_user.ejs',{})
    })

    // 获取要添加的用户信息
    // 确认用户是否存在
    router.post('/admin/admin_user/add_user', (req, res, next)=>{
        let get_user_message = require('./../../../model/db').select.user_message
        let the_args = [req.body.username]
        get_user_message(the_args, (err, data)=>{
            if (err) {
                res.send({
                    'ok': false,
                    'message': err
                })
                res.end()
            } else if (data.length === 0) {
                next()
            } else {
                res.send({
                    'ok': false,
                    'message': 'username has been used'
                })
            }
        })
    })

    // 确认要注册的用户不存在
    router.post('/admin/admin_user/add_user', (req, res)=>{
        let encrypt = require('./../../sha256').update
        let password = encrypt(req.body.password)
        let set_user = require('./../../../model/db').insert.user
        let the_args = [req.body.username, password]
        set_user(the_args, (err)=>{
            if (err) {
                res.send({
                    'ok': false,
                    'message': err
                })
                res.end()
            } else {
                res.send({
                    'ok': true,
                    'message': 'insert complete'
                })
                res.end()
            }
        })
    })

    return router
}