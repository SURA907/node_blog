const express = require('express')
const body_parser = require('body-parser')
const cookie_parser = require('cookie-parser')
const cookie_session = require('cookie-session')
const consolidate = require('consolidate')


//创建server、启动端口监听
const server = express()
server.listen(8080)

//post数据交互中间件
server.use(body_parser.urlencoded({
    extended: false
}))

//cookie中间件，完成签名操作
server.use(cookie_parser('wqehiojfjas'))

//使用数组保存session签名密匙
let arr = []
for(var i = 0; i<3000; i++) {
    arr.push('the_keys-'+Math.random())
}
//session中间件
server.use(cookie_session({
    name: 'own_ses_id',
    keys: arr,
    maxAge: 10*60*1000
}))

//配置模板引擎
server.set('view engine', 'html')
server.set('views', './template')
server.set('html', consolidate.ejs)

//使用路由机制分割请求
server.all('*', require('./router/router')())

//静态资源托管
server.use(express.static('./public'))

//404
server.use((req, res)=>{
    res.status(404).send('404 no found').end()
})