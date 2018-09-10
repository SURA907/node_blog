const express = require('express')

/**
 * 处理首页请求的路由模块
 */

module.exports = function() {
    const router = express.Router()

    // 获得渲染首页所需的数据
    router.get('/', (req, res, next)=>{
        let get_index_data = require('./../../model/db').select.index_data
        get_index_data((err, data)=>{
            if (err) {
                res.send('the server is error: '+err)
            } else {
                req.article_data = data
                next()
            }
        })
    })

    // 调用模板，渲染首页
    router.get('/', (req, res)=>{
        res.render('./layout/index.ejs',{
            'article_data': req.article_data,
            'user_status': req.session['user_status']
        })
        res.end()
    })

    return router
}