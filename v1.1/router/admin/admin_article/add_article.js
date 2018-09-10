const express = require('express')

module.exports = function() {
    const router = express.Router()

    // 渲染添加文章页面
    router.get('/admin/admin_article/add_article', (req, res)=>{
        res.render('./admin/admin_article/add_article.ejs', {
            'user_status': req.session['user_status']
        })
    })

    // 接收文章数据
    router.post('/admin/admin_article/add_article', (req, res)=>{
        let set_article = require('./../../../model/db').insert.article
        let the_args = [
            req.session['user_status'].user_id,
            req.body.article_title,
            req.body.article_body
        ]
        set_article(the_args, (err)=>{
            if (err) {
                res.send({
                    'ok': false,
                    'message': err
                })
                res.end()
            } else {
                res.send({
                    'ok': true,
                    'message': 'upload complete'
                })
            }
        })
        
    })

    return router
}