- # node_blog
 > 一个使用node，选用express mysql ejs的简易博客站点程序
---
## 0. 概述
 > 几个月时间，SURA深刻认识到自己当前所学的不足</br>
 > 由于自己年轻不懂事，之前的版本存在许多早期设计上的缺陷，故弃用（弃用项目文件放入v1.0）
---
## 1. 新版本的主要变化
 > (1)、重新设计了前端界面，SURA希望借此获得更良好的交互体验</br>
 > (2)、对路由模块进行了进一步抽象，尽可能规范api的使用</br>
 > (3)、对数据库交互部分与主程序进行了一定程度的分离，同时将数据库配置部分从主程序抽离出来</br>
 > (4)、对权限检验部分就行了一定程度的封装，提高泛用性</br>
 > (5)、添加markdown解析支持，告别纯文本输入</br>
 > (6)、由于远程数据库位置经常变更，故不再提供私人远程数据库连接</br>
 > (7)、readme中的markdown写的更象样了(*^_^*)
---
## 2. 目录结构
 > ![image](https://github.com/SURA907/node_blog/raw/master/readme_img/v1.1/file_list.png)
---
## 3. 路由列表
 > ![image](https://github.com/SURA907/node_blog/raw/master/readme_img/v1.1/route_list.png)
---
## 4. 访问demo
 > SURA将简易博客站点部署在http://sura.wang</br>
 > 部署时间（更新：2018-09-11）</br>
 > 由于这是SURA的个人服务器，不保证长期部署此项目
 > ##### - 测试用账号
 >> 序号 | 账号    |密码     |管理员
 >> :--: | :-----: | :-----: | :----:
 >> 1    | SURA    | asdf    | 是
 >> 2    | ASURA   | asura   | 否
 >> 3    | SURA907 | sura907 | 否
 > ##### 请勿在demo站点删除以上账号
---
## 5. 部署运行
 > (1)、将仓库下载或克隆到本地</br>
 > (2)、使用v1.1/sura.sql还原mysql表结构</br>
 > (3)、修改v1.1/config.js中的数据库配置</br>
 > (4)、切换到根目录：cd v1.1/</br>
 > (5)、下载依赖：npm install</br>
 > (6)、运行程序：node server.js</br>
 > (7)、打开浏览器，输入http://localhost:8080 查看运行结果</br>
 > (8)、端口监听可在server.js中修改
---
## 6. PS
 > 关于mysql的安装和配置不过多赘述</br>
 > 完工，合掌
---