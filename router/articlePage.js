const express = require("express");

/*
* 处理文章请求的路由模块
*  db: 主程序中保持的数据库连接池
* */

module.exports = function (db) {
    var router = express.Router();

    //链式操作
    //处理上传评论的请求
    //检查用户合法性
    router.post('/add_comment',(request, response, next)=>{
        if (request.body.user_id === request.session['user_id']+'') {
            next();
        } else {
            response.send({
                ok:false,
                message:'非法请求'
            }).end();
        }
    });

    //经过中间件过滤
    //处理合法的评论提交请求
    router.post('/add_comment', (request, response)=>{
        db.query("insert into comment_table(comment_user_id,comment_article_id,comment_body,upload_time) values("+request.body.user_id+","+request.body.article_id+",'"+request.body.comment_body+"',now())", (err)=>{
            if (!err) {
                response.send({
                    ok:true,
                    message:'success'
                }).end();
            } else {
                response.send({
                    ok:false,
                    message:err
                }).end();
            }
        });
    });

    //链式操作处理超链接
    //得到文章主体
    router.use((request, response, next)=>{
        db.query('select article_id,article_title,date_format(upload_time,"%Y-%m-%d") date,article_body from article_table where article_id='+request.query.id, (err, data)=>{
            if (!err) {
                request.article = data[0];
                next();
            } else {
                response.status(500).send('server is error').end();
            }
        });
    });

    //链式操作
    //获取文章作者信息
    router.use((request, response, next)=>{
        db.query('select username from user_table where user_id=(select author from article_table where article_id='+request.query.id+')', (err, data)=>{
            if (!err) {
                request.author = data[0];
                next();
            } else {
                response.status(500).send('server is error').end();
            }
        });
    });

    //链式操作
    //获取登陆用户的信息
    router.use((request, response, next)=>{
        //确认用户是否登陆
        if (!request.session['user_id']) {
            request.user_id = null;
            next();
        } else {
            db.query(`select * from user_table where user_id = ${request.session['user_id']}`, (err, data)=>{
                if (!err) {
                    request.user_massage = data;
                    next();
                } else {
                    response.status(500).send('server error').end();
                }
            });
        }
    });

    //链式操作
    //获取文章对应的评论信息
    router.use((request, respone, next)=>{
        db.query(`select user_table.username,comment_table.comment_body,date_format(comment_table.upload_time,"%Y-%m-%d %T") comment_upload_time from comment_table,user_table where comment_table.comment_article_id = ${request.query.id} and comment_table.comment_user_id = user_table.user_id order by comment_upload_time`, (err, data)=>{
            if (!err) {
                request.comment_message = data;
                next();
            } else {
                respone.status(500).send('server error').end();
            }
        });
    });

    //渲染文章页面
    router.use((request, response)=>{
        //使用正则表达式
        //给文章的每一个段落添加p标签
        request.article.article_body = request.article.article_body.replace(/^/gm,'<p>').replace(/$/gm,'</p>');
        response.render('show_article.ejs', {
            article:request.article,
            author:request.author,
            user_massage:request.user_massage,
            comment_message:request.comment_message
        });
        response.end();
    });

    return router;
};