const express = require('express');

/*
*  文章管理页面
*   db: 保持在主程序中的数据库连接池
* */

module.exports = function (db) {
    var router = express.Router();

    //链式操作
    //获取当前登陆的用户信息
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

    //链式操作
    //获取文章相关信息
    //所有文章信息，供管理员使用
    router.use((request, response, next)=>{
        db.query('select article_id,username author,article_title,date_format(upload_time,"%Y-%m-%d") upload_time from article_table,user_table where article_table.author = user_table.user_id order by upload_time',(err,data)=>{
            if (!err) {
                request.admin_article_massage = data;
                next();
            } else {
                response.state(500).send('this server is err'+err).end();
            }
        });
    });

    //链式操作
    //查询当前用户自己的文章信息
    //供非管理员使用
    router.use((request, response, next)=>{
        var user_id = request.session['user_id'];
        db.query(`select article_id,username author,article_title,date_format(upload_time,"%Y-%m-%d") upload_time from article_table,user_table where article_table.author = user_table.user_id and author = `+user_id+` order by upload_time`, (err, data)=>{
            if (!err) {
                request.article_massage = data;
                next();
            } else {
                console.log(err);
                response.status(500).send('server error').end();
            }
        });
    });

    //接受新添加文章的数据
    router.post('/insert_article',(request, response)=>{
        const author = request.session['user_id'];
        const date = new Date().toLocaleString();
        const article_title = request.body.article_title;
        const article_body = request.body.article_body;
        db.query("insert into article_table(author,upload_time,article_title,article_body) values("+author+",'"+date+"','"+article_title+"','"+article_body+"')", (err)=>{
            if (!err) {
                response.redirect('/admin/admin_article');
                response.end();
            } else {
                response.redirect('/admin/admin_article');
                response.end();
            }
        });
    });

    //对添加文章请求的处理
    router.use('/add_article', (request, response)=>{
        response.render('admin/add_article.ejs',{});
    });

    //链式操作
    //对修改文章请求的处理
    //将要修改的文章信息交给下一级
    router.get('/update_article', (request, response, next)=>{
        db.query('select * from article_table where article_id = '+request.query.article_id, (err, data)=>{
            if (!err) {
                request.upload_massage = data;
                next();
            } else {
                console.log(err);
                response.state(500).send('this server is err'+err).end();
            }
        });
    });

    //链式操作
    //对修改文章请求的处理
    //检查用户权限
    router.get('/update_article', (request, response, next)=>{
        if (request.user_status[0].user_id === request.upload_massage[0].author || request.user_status[0].is_admin === 'YES') {
            next();
        } else {
            response.status(400).send('非法请求').end();
        }
    });

    //展示要修改的文章
    router.get('/update_article', (request, response)=>{
        response.render('admin/update_article.ejs',{
            article_massage:request.upload_massage
        });
    });

    //接收修改后的文章信息
    router.post('/update_article', (request, response)=>{
        db.query("update article_table set article_title = '"+request.body.article_title+"',article_body = '"+request.body.article_body+"' where article_id = "+request.body.article_id+"", (err)=>{
            if (!err) {
                response.redirect('/admin/admin_article');
                response.end();
            } else {
                console.log(err);
                response.redirect('/admin/admin_article');
                response.end();
            }
        });
    });

    //链式操作
    //处理删除用户的请求
    //检查要删除的文章信息
    router.use('/delete_article',(request, response, next)=>{
        db.query('select * from article_table where article_id = '+request.query.article_id, (err, data)=>{
            if (!err) {
                request.article_massage = data;
                next();
            } else {
                response.status(500).send('server error').end();
            }
        });
    });

    //链式操作
    //处理删除文章的请求
    //检查用户权限
    router.use('/delete_article', (request, response, next)=>{
        if (request.user_status[0].user_id === request.article_massage[0].author || request.user_status[0].is_admin === 'YES') {
            next();
        } else {
            response.status(400).send('非法请求').end();
        }
    });

    //处理删除文章的请求
    //执行删除文章的操作
    router.use('/delete_article', (request, response)=>{
        db.query('delete from article_table where article_id = '+request.query.article_id, (err, data)=>{
            if (!err) {
                response.redirect('/admin/admin_article');
                response.end();
            } else {
                response.status(500).send('server error').end();
            }
        });
    });

    //渲染文章页面
    router.use((request, response)=>{
        response.render('admin/admin_article.ejs',{
            admin_article_massage: request.admin_article_massage,
            article_massage : request.article_massage,
            user_status : request.user_status
        })
    });

    return router;
};