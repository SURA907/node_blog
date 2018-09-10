const express = require('express')

/**
 * 处理删除文章请求的路由模块
 */

module.exports = function() {
    const router = express.Router()
    
    // 经过上一层路由过滤，确认过权限的用户
    // 进行文章删除操作
    router.post('/admin/admin_article/delete_article', (req, res)=>{
        let delete_article = require('./../../../model/db').delete.article
        let the_args = [req.body.article_id]
        delete_article(the_args, (err)=>{
            if (err) {
                res.send({
                    'ok': false,
                    'message': err
                })
                res.end()
            } else {
                res.send({
                    'ok': true,
                    'message': 'delete complete'
                })
                res.end()
            }
        })
    })

    return router
}