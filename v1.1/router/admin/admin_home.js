const express = require('express')

module.exports = function() {
    const router = express.Router()

    // 根据当前用户是否为管理员，并获取文章信息
    //   管理员： 所有文章
    //   非管理员： 仅当前用户文章信息
    router.get('/admin/admin_home', (req, res, next)=>{
        let get_article_data = null
        let the_args = []
        if (req.session['user_status'].is_admin === 'YES') {
            get_article_data = require('./../../model/db').select.article_data_admin
        } else if (req.session['user_status'].is_admin === 'NO') {
            get_article_data = require('./../../model/db').select.article_data_general
            the_args = [req.session['user_status'].user_id]
        } else {
            res.send('bad request').end()
        }
        if (get_article_data !== null) {
            get_article_data(the_args, (err, data)=>{
                if (err) {
                    res.send('server error').end()
                } else {
                    req.article_data = data
                    next()
                }
            })
        } else {
            res.send('bad request').end()
        }
    })

    // 检测当前用户是否为管理员，并获取管理员用户信息
    //  管理员：所有用户信息
    //  普通用户：不允许查看用户信息
    router.get('/admin/admin_home', (req, res, next)=>{
        if (req.session['user_status'].is_admin === 'YES') {
            const get_user_message_admin = require('./../../model/db').select.user_message_admin
            get_user_message_admin((err, data)=>{
                if (err) {
                    res.send('server error').end()
                } else {
                    req.user_message_admin = data
                    next()
                }
            })
        } else if (req.session['user_status'].is_admin === 'NO') {
            req.user_message_admin = null
            next()
        } else {
            res.send('bad request').end()
        }
    })

    // 检查当前用户是否为管理员，并获取普通用户信息
    router.get('/admin/admin_home', (req, res, next)=>{
        if (req.session['user_status'].is_admin === 'YES') {
            const get_user_message_general = require('./../../model/db').select.user_message_general
            get_user_message_general((err, data)=>{
                if (err) {
                    res.send('server error').end()
                } else {
                    req.user_message_general = data
                    next()
                }
            })
        } else if (req.session['user_status'].is_admin === 'NO') {
            req.user_message_general = null
            next()
        } else {
            res.send('bad request').end()
        }
    })

    // 渲染页面
    router.get('/admin/admin_home', (req, res)=>{
        res.render('./admin/admin_home.ejs', {
            'user_status': req.session['user_status'],
            'article_data': req.article_data,
            'user_message_admin': req.user_message_admin,
            'user_message_general': req.user_message_general
        })
    })

    return router
}