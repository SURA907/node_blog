const express = require('express')

/**
 * 处理删除用户的请求
 */

module.exports = function() {
    const router = express.Router()

    // 根据传入的 用户id 删除用户
    router.post('/admin/admin_user/delete_user', (req, res)=>{
        let delete_user = require('./../../../model/db').delete.user
        let the_args = [req.body.user_id]
        delete_user(the_args, (err)=>{
            if (err) {
                res.send({
                    'ok': false,
                    'message': err
                })
                res.end()
            } else {
                res.send({
                    'ok': true,
                    'mseeage': 'delete complete'
                })
            }
        })
    })

    return router
}