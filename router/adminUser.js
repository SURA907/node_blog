const express = require('express');
const encrypt = require('./sha256.js');

/*
*  用户管理模块
*   db: 保持在主程序中的数据库连接池
* */

module.exports = function (db) {
    var router = express.Router();

    //检查当前用户状态
    router.use((request, response, next)=>{
        db.query('select * from user_table where user_id = '+request.session['user_id'], (err, data)=>{
            if (!err) {
                request.user_status = data;
                next();
            } else {
                response.status(500).send('this server is err\n'+err).end();
            }
        });
    });

    //检索管理员账户
    router.use((request, response, next)=>{
        db.query("select * from user_table where is_admin = 'YES'", (err, data)=>{
            if (!err) {
                request.user_admin = data;
                next();
            } else {
                response.status(500).send('server error\n'+err).end();
            }
        });
    });

    //检索普通账户
    router.use((request, response, next)=>{
        db.query("select * from user_table where is_admin = 'NO'", (err, data)=>{
            if (!err) {
                request.user_ordinary = data;
                next();
            } else {
                response.status(500).send('server error\n'+err).end();
            }
        });
    });

    //处理注册用户的请求
    router.get('/add_user',(request, response)=>{
        if (request.user_status[0].is_admin === 'YES') {
            response.render('2_registered.ejs', {});
        } else {
            response.send('Illegal request').end();
        }
    });

    //链式操作
    //接受用户注册数据
    //检查用户名是否存在
    router.post('/add_user', (request, response, next)=>{
        db.query("select count(*) count from user_table where username = '"+request.body.username+"'", (err, data)=>{
            if (!err) {

                //判断用户名是否已存在
                if (data[0].count === 0) {
                    next();
                } else {
                    response.send({
                        ok:false,
                        massage:'用户名已存在'
                    }).end();
                }

            } else {
                response.status(500).send('server error').end();
            }
        });
    });

    //处理用户注册数据
    router.post('/add_user', (request, response)=>{
        var username = request.body.username;
        var password = encrypt.update(request.body.password);
        db.query("insert into user_table(username,password) values('"+username+"','"+password+"')", (err)=>{
            if (!err) {
                response.send({
                    ok:true,
                    massage:'complete'
                }).end();
            } else {
                console.log(err);
                response.send({
                    ok:false,
                    massage:'server error'
                }).end();
            }
        });
    });

    //链式操作
    //修改密码请求
    //确认当前用户权限
    //准备要修改的用户信息
    router.get('/update_password', (request, response, next)=>{
        //检查当前用户是否是管理员
        if (request.user_status[0].is_admin === 'YES') {
            db.query('select * from user_table where user_id = '+request.query.user_id, (err, data)=>{
                if (!err) {
                    request.user_massage = data;
                    next();
                } else {
                    response.status(500).send('server error').end();
                }
            });
        } else {
            response.status(400).send('非法请求').end();
        }
        // console.log(request.user_status[0].is_admin);
        // response.render('/update_password.ejs', {});
    });

    //展示要修改的用户信息
    router.get('/update_password', (request, response)=>{
        response.render('admin/update_password.ejs', {
            user_massage : request.user_massage
        });
    });

    //处理修改后的用户信息
    router.post('/update_password', (request, response)=>{
        var user_id = request.body.user_id;
        var password = encrypt.update(request.body.password);
        db.query(`update user_table set password = "${password}" where user_id = ${user_id}`, (err)=>{
            if (!err) {
                response.send({
                    ok:true,
                    massage:'complete'
                })
            } else {
                console.log(err);
                response.status(500).send({
                    ok:false,
                    massage:'server error'
                }).end();
            }
        });
    });

    //链式操作
    //处理删除用户的请求
    //检查用户权限
    router.use('/delete_user', (request, response, next)=>{
        if (request.user_status[0].is_admin === 'YES') {
            next();
        } else {
            response.status(400).send('非法请求').end();
        }
    });

    //处理删除用户的请求
    router.use('/delete_user', (request, response)=>{
        var user_id = request.query.user_id;
        db.query(`delete from user_table where user_id = ${user_id}`, (err)=>{
            if (!err) {
                response.redirect('/admin/admin_user');
            } else {
                console.log(err);
                response.status(500).send('server error').end();
            }
        });
    });

    //渲染用户管理界面
    router.use((request, response)=>{
        response.render('admin/admin_user.ejs',{
            user_status : request.user_status,
            user_admin : request.user_admin,
            user_ordinary : request.user_ordinary
        });
    });

    return router;
};