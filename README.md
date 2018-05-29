# node_blog

一个使用node，基于express框架，使用ejs引擎的小型博客站程序

## 路由列表

https://github.com/SURA907/node_blog/master/router_list.png

## 文件目录

https://github.com/SURA907/node_blog/master/file_tree.png

## 部署运行
 cd 根目录<br>
 npm install        下载依赖<br>
 node server.js     启动服务器<br>

 ### 另可在 http://sura.wang 访问示例

## 注意事项
 在server.js中的mysql配置中，我留下了私人远程数据库的配置
 整个程序可以依托远程服务器运作(远程服务器有200毫秒左右的延迟)
 ### 同时：我也在留下了数据库的备份文件(test.sql)，可使用此文件在本地mysql中还原表结构(进行此操作之后需要相应的修改server.js中的mysql模块配置)
 关于mysql的配置不在此赘述

## 博客站用户
 ### 管理员
 用户名 ：SURA     密码 ：asdf
 ### 普通用户
 用户名 ：ASURA    密码 ：asura<br>
 用户名 ：K907     密码 ：k8806

## 注：请在示例网站中操作时不要删除以上用户，且不要过多的删除文章数据