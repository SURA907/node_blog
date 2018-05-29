const express = require("express");
const sha256 = require("./sha256");
/*
* 处理管理登陆的路由模块
*  db: 主程序中保持的数据库连接池
* */

module.exports = function (db) {
    var router = express.Router();
    
    router.use((request, response, next)=>{
        if (!request.session['user_id'] && request.url!=='/login') {
            response.redirect('/admin/login');
        } else {
            next();
        }
    });

    router.get('/login', (request, response)=>{
        response.render('1_login.ejs',{});
        response.end();
    });

    router.post('/login',(request, response)=>{
        const username = request.body.username;
        const password = sha256.update(request.body.password);
        db.query(`SELECT * FROM user_table WHERE username='${username}'`,(err,data)=>{
            //数据库查询是否出错
            if (!err) {
                if (data.length === 0) { //确认数据库查询结果是否为空
                    response.send({ok:false,massage:'user is not exist'}).end();
                    //确认查询到的密码和用户输入的密码是否一致
                } else if (data[0].password === password) {
                    request.session['user_id'] = data[0].user_id;
                    response.send({ok:true,massage:'success'}).end();

                    //密码不正确
                } else {
                    response.send({ok:false,massage:'username and password do not exits'}).end();
                }
            } else {
                //在查询数据库过程中出错
                response.send({ok:false,massage:'server error'}).end();
            }
        });
    });

    //经过中间件过滤，已经确认登陆的管理员
    //管理首页
    //准备数据
    router.use('/admin_home',(request, response, next)=>{
        db.query('select * from user_table where user_id = '+request.session['user_id'], (err, data)=>{
            if (!err) {
                request.user_status = data;
                next();
            } else {
                response.status(500).send('this server is err\n'+err).end();
            }
        });
    });

    //渲染页面
    router.use('/admin_home',(request, response)=>{
        response.render('admin/admin_homepage.ejs',{
            user_status : request.user_status
        });
    });

    //处理用户退出
    router.use('/logout', (request, response)=>{
         response.clearCookie('own_ses_id');
         response.clearCookie('own_ses_id.sig');
         response.redirect('../');
    });

    //文章管理
    router.use('/admin_article', require('./adminArticle.js') (db));

    //用户管理
    router.use('/admin_user', require('./adminUser.js') (db));

    return router;
};