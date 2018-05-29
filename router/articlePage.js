const express = require("express");

/*
* 处理文章请求的路由模块
*  db: 主程序中保持的数据库连接池
* */

module.exports = function (db) {
    var router = express.Router();

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

    //获取文章作者
    //渲染文章页面
    router.use((request,response)=>{
        request.article.article_body = request.article.article_body.replace(/^/gm,'<p>').replace(/$/gm,'</p>');
        response.render('show_article.ejs',{
            article:request.article,
            author:request.author
        });
        response.end();
    });

    return router;
};