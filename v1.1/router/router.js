const express = require('express')

module.exports = function() {
    const router = express.Router()

    // 渲染首页
    router.all('/', require('./origin/index')())

    // 渲染文章展示页面
    router.all('/article', require('./origin/show_article')())

    // 处理评论上传
    router.all('/article/set_comment', require('./origin/set_comment')())

    // 处理 /admin/* 请求, 将未登录用户重定向到登陆页面
    // 此处使用 '/admin/*', 截断所有以 /admin 开头的请求
    router.all('/admin/*', require('./admin/is_login')())

    // 登录页面
    router.all('/admin/login', require('./admin/login')())

    // 处理注销登录请求
    router.all('/admin/logout', require('./admin/logout')())

    // 渲染站点管理首页
    router.all('/admin/admin_home', require('./admin/admin_home')())

    // 处理文章上传请求
    router.all('/admin/admin_article/add_article', require('./admin/admin_article/add_article')())

    // 检验用户是否具有删除和编辑文章的权限
    router.all('/admin/admin_article/*', require('./admin/admin_article/authentication_article')())

    // 处理删除文章的请求
    router.all('/admin/admin_article/delete_article', require('./admin/admin_article/delete_article')())

    // 处理编辑文章的请求
    router.all('/admin/admin_article/update_article', require('./admin/admin_article/update_article')())

    // 检测用户是否拥有管理员权限
    // 仅管理员允许进行用户管理相关操作
    router.all('/admin/admin_user/*', require('./admin/admin_user/authentication_user')())

    // 处理添加用户相关的请求
    router.all('/admin/admin_user/add_user', require('./admin/admin_user/add_user')())

    // 处理删除用户的请求
    router.all('/admin/admin_user/delete_user', require('./admin/admin_user/delete_user')())

    // 处理修改用户密码的请求
    router.all('/admin/admin_user/update_user', require('./admin/admin_user/update_user')())

    return router
}