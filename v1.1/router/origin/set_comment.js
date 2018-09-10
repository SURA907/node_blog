const express = require('express')

module.exports = function() {
    const router = express.Router()

    // 确认用户是否登录
    router.post('*', (req, res, next)=>{
        if (req.session['user_status']) {
            next()
        } else {
            res.send({
                'ok': false,
                'message': 'bad request'
            }).end()
        }
    })
    // 获取用户上传内容
    router.post('/article/set_comment', (req, res)=>{
        let the_args = [
            req.session['user_status'].user_id,
            req.body.article_id,
            req.body.comment_data
        ]
        let set_comment = require('./../../model/db').insert.comment
        set_comment(the_args, (err)=>{
            if (err) {
                console.log(err)
                res.send({'ok': false, 'message': err})
                res.end()
            } else {
                res.send({'ok': true, 'message': 'complete'})
                res.end()
            }
        })
    })

    return router
}