const express = require('express')

/**
 * 鉴权，确认用户是否拥有管理员权限
 */

module.exports = function() {
    const router = express.Router()

    // get 鉴权
    router.get('/admin/admin_user/*', (req, res, next)=>{
        if (req.session['user_status'].is_admin === 'YES') {
            next()
        } else {
            res.status(400).send('bad request').end()
        }
    })

    // post 鉴权
    router.post('/admin/admin_user/*', (req, res, next)=>{
        if (req.session['user_status'].is_admin === 'YES') {
            next()
        } else {
            res.send({
                'ok': false,
                'message': 'bad request'
            })
            res.end()
        }
    })

    return router
}