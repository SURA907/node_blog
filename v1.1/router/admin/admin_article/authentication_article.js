const express = require('express')

module.exports = function() {
    const router = express.Router()

    // 检验用户权限-post(delete-article)
    router.post('/admin/admin_article/*', (req, res, next)=>{
        // 检测用户是否为管理员
        if (req.session['user_status'].is_admin === 'YES') {
            next()
        } else {
            // 获取文章作者信息
            let get_article_author = require('../../../model/db').select.article_author
            let the_args = [req.body.article_id]
            get_article_author(the_args, (err, data)=>{
                if (err) {
                    res.send({
                        'ok': false,
                        'message': err
                    })
                    res.end()
                // 确认当前用户是否为文章作者
                } else if (req.session['user_status'].user_id === data[0].author) {
                    next()
                } else {
                    res.send({
                        'ok': false,
                        'message': 'bad request'
                    })
                    res.end()
                }
            })
        }
    })
    
    // 检查用户权限-get(update-article)
    router.get('/admin/admin_article/*', (req, res, next)=>{
        // 检测用户是否为管理员
        if (req.session['user_status'].is_admin === 'YES') {
            next()
        } else {
            let get_article_author = require('../../../model/db').select.article_author
            let the_args = [req.query.article_id]
            get_article_author(the_args, (err, data)=>{
                if (err) {
                    res.status(500).send('server error')
                    res.end()
                } else if (req.session['user_status'].user_id === data[0].author ) {
                    next()
                } else {
                    res.status(400).send('bad request')
                    res.end()
                }
            })
        }
    })

    return router
}