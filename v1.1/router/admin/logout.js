const express = require('express')

/**
 * 处理/login请求的路由模块
 */
module.exports = function() {
    const router = express.Router()

    router.all('*', (req, res)=>{
        res.clearCookie('own_ses_id')
        res.clearCookie('own_ses_id.sig')
        res.send({
            'ok': true,
            'message': 'complete'
        }).end()
    })

    return router
}