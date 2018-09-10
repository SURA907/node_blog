const express = require('express')
const myMarked = require('./../../config').myMarked()

/**
 * 处理文章渲染的模块
 */
module.exports = function(){
    const router = express.Router()

    // 根据get传值（查询字符串）获取文章信息
    router.get('/article', (req, res, next)=>{
        let get_article_data = require('./../../model/db').select.article_data
        let the_args = [req.query.article_id]
        get_article_data(the_args, (err, data)=>{
            if (err) {
                res.send(err).end()
            // 若请求的文章不存在，则将返回404
            } else if (data.length === 0) {
                res.status(404).send('404 no found').end()
            } else {
                req.article_data = data
                next()
            }
        })
    })

    // 根据get传值，获取文章对应的评论信息
    router.get('/article', (req, res, next)=>{
        let get_comment_data = require('./../../model/db').select.comment_data
        let the_args = [req.query.article_id]
        get_comment_data(the_args, (err, data)=>{
            if (err) {
                res.send(err).end()
            } else {
                req.comment_data = data
                next()
            }
        })
    })

    // 将文章解析为markdown格式
    router.get('/article', (req, res, next)=>{
        req.article_data[0].article_body = myMarked(req.article_data[0].article_body)
        next()
    })

    // 渲染文章展示页面
    router.get('/article', (req, res)=>{
        
        res.render('./layout/show_article.ejs', {
            'article_data': req.article_data,
            'user_status': req.session['user_status'],
            'comment_data': req.comment_data
        })
    })

    return router
}