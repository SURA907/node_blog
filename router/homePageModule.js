const express = require("express");

/*
* 处理首页请求的路由模块
*  db: 主程序中保持的数据库连接池
* */

module.exports = function (db) {
    var router = express.Router();

    // 从数据库获取文章信息
    router.get('/', (request, response, next)=>{
        db.query('select article_id,article_title,date_format(upload_time,"%Y-%m-%d") date,article_body from article_table', (err, data)=>{
            if (!err) {
                response.article_summary = data;

                //链式操作
                next();
            } else {
                response.status(500).send('server is error').end();
            }
        });
    });

    // 通过数据库获取作者名
    router.get('/', (request, response, next)=>{
        db.query('select user_table.username author from user_table,article_table where user_table.user_id = article_table.author',(err, data)=>{
            if (!err) {
                response.username = data;

                //链式操作
                next();
            } else {
                response.status(500).send('server is error').end();
            }
        })
    });

    router.get('/', (request, response)=>{
        response.render('index.ejs',{
            article_summary:response.article_summary,
            username:response.username
        });
        response.end();
    });

    return router;
};