const express = require("express");

/*
* 处理首页请求的路由模块
*  db: 主程序中保持的数据库连接池
* */

module.exports = function (db) {
    var router = express.Router();

    // 从数据库获取文章信息
    router.get('/', (request, response, next)=>{
        db.query('select article_id,article_title,LEFT(article_body,30) article_body,date_format(upload_time,"%Y-%m-%d") date,username author from article_table,user_table where user_table.user_id = article_table.author', (err, data)=>{
            if (!err) {
                request.article_summary = data;
                //链式操作
                next();
            } else {
                response.status(500).send('server is error').end();
            }
        });
    });

    //渲染首页
    router.get('/', (request, response)=>{
        response.render('index.ejs',{
            article_summary:request.article_summary,
        });
        response.end();
    });

    return router;
};