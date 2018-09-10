const express = require('express')

/**
 * 处理编辑用户的模块
 */

module.exports = function() {
    const router = express.Router()

    // 检测输入的用户id是否有对应的用户信息
    router.get('/admin/admin_user/update_user', (req, res, next)=>{
        let get_user_by_id = require('./../../../model/db').select.user_message_by_id
        let the_arge = [req.query.user_id]
        get_user_by_id(the_arge, (err, data)=>{
            if (err) {
                res.status(500).send('server error')
                res.end()
            // 用户不存在
            } else if (data.length === 0) {
                res.status(400).send('user is not exits')
                res.end()
            } else {
                req.user_message = data[0]
                next()
            }
        })
    })

    // 检测用户是否为管理员
    // 不允许对管理员账户进行修改
    router.get('/admin/admin_user/update_user', (req, res, next)=>{
        if (req.user_message.is_admin === 'NO') {
            next()
        } else {
            res.status(400).send('bad request')
            res.end()
        }
    })

    // 渲染用户信信息修改页面
    router.get('/admin/admin_user/update_user', (req, res)=>{
        res.render('./admin/admin_user/update_user.ejs', {
            'user_message': req.user_message
        })
    })

    // 接受修改后的用户信息
    router.post('/admin/admin_user/update_user', (req, res)=>{
        let encrypt = require('./../../sha256').update
        let the_arge = [encrypt(req.body.password), req.body.user_id]
        let update_user = require('./../../../model/db').updata.user_message
        update_user(the_arge, (err)=>{
            if (err) {
                res.send({
                    'ok': false,
                    'message': err
                })
                res.end()
            } else {
                res.send({
                    'ok': true,
                    'message': 'update complete'
                })
                res.end()
            }
        })
    })

    return router
}