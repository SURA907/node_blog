const express = require('express')

/**
 * 处理文章编辑的请求
 */

module.exports = function() {
    const router = express.Router()
    
    // 已经经过鉴权，确认拥有权限的用户
    // 根据文章id获取相应文章数据
    router.get('/admin/admin_article/update_article', (req, res, next)=>{
        let get_article_data = require('./../../../model/db').select.article_data
        let the_args = [req.query.article_id]
        get_article_data(the_args, (err, data)=>{
            if (err) {
                res.status(500).send('server error')
                res.end()
            } else {
                req.article_data = data
                next()
            }
        })
    })
    

    // 渲染文章修改页面
    router.get('/admin/admin_article/update_article', (req, res)=>{
        res.render('./admin/admin_article/update_article.ejs', {
            'user_status': req.session['user_status'],
            'article_data': req.article_data
        })
    })

    // 处理文章修改的数据
    router.post('/admin/admin_article/update_article', (req, res)=>{
        let update_article = require('./../../../model/db').updata.article
        let the_args = [
            req.body.article_title,
            req.body.article_body,
            req.body.article_id
        ]
        update_article(the_args, (err)=>{
            if (err) {
                res.send({
                    'ok': false,
                    'message': 'err'
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