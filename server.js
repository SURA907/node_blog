const express = require("express");
const mysql = require("mysql");
const body_parser = require("body-parser");
const cookie_parser = require("cookie-parser");
const cookie_session = require("cookie-session");
const multer = require("multer");
const consolidate = require("consolidate");

// -mysql连接池
const db = mysql.createPool({
    host:'176.122.183.16',
    port:3306,
    user:'test',
    password:'test',
    database:'test'
});

// -创建服务，启动端口监听
const server = express();
server.listen(8080);

// -cookie中间件，完成签名操作
server.use(cookie_parser('dahdosahoidashioasd'));

//声明一个数组，用于放入session签名密钥
let arr = [];
for (let i = 1; i < 5000; i++) {
    arr.push('keys-'+Math.random());
}
// -session中间件
server.use(cookie_session({
    name:'own_ses_id',
    keys:arr,
    //过期时间，不设置的话，cookie会在浏览器关闭后清除
    MaxAge:20 * 60 * 1000
}));

// -post数据交互中间件
server.use(body_parser.urlencoded({
    extended:false          //显式关闭扩展模式以避免警告
}));
// -post文件上传中间件
server.use(multer({dest:'./www/upload'}).any());

// -配置模板引擎  ejs
server.set('view engine', 'html');  //引擎输出类型
server.set('views', './template');  //模板位置
//模板引擎类型_需要使用consolidate做连接
server.set('html', consolidate.ejs);

// -使用路由机制分割处理请求
server.use('/', require('./router/homePageModule.js') (db));
server.use('/article', require('./router/articlePage.js') (db));
server.use('/admin', require('./router/login.js') (db));

// -静态资源托管
server.use(express.static('./www'));