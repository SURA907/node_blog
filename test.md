## 码云私有云版开发文档

* [部署启动](#部署启动)
* [需要的配置文件](#需要的配置文件)
* [初始化sqlite数据库](#初始化sqlite数据库)
* [启动命令](#启动命令)
* [问题FAQ](#faq)
* [问题FAQ](#FAQ)
* [问题FAQ](#Faq)
#### 部署启动

#### 需要的配置文件

- config/gitee.yml
  注意项目的 key 是 gitee
- config/unicorn.rb
  timeout 建议改为 10 分钟

#### 初始化sqlite数据库
ps:（引导过程需要使用 sqlite 数据库）

 shell
bundle exec rake db:create db:schema:load db:seed_fu DATABASE_URL=sqlite3://localhost/db/production.sqlite3


#### 启动命令

 shell
RAILS_ENV=production bundle exec unicorn -E production -c config/unicorn.rb -D


#### FAQ

* [清除数据库再次进入引导界面进行初始化](#清除数据库再次进入引导界面进行初始化)
* [nokogiri错误](#nokogiri错误)
* [charlock_holmes错误](#charlock_holmes错误)
* [libv8错误](#libv8错误)
* [UTF-8&ASCII-8BIT错误](#UTF-8&ASCII-8BIT错误)
* [activerecord-mysql2-adapter错误](#activerecord-mysql2-adapter错误)
* [therubyracer错误](#therubyracer错误)
* [数据库启动时的错误](#数据库启动时的错误)
* [安装过程中出现了类似于缺少文件](#安装过程中出现了类似于缺少文件)
* [JavaSript错误](#JavaSript错误)
* [初始化数据库问题](#初始化数据库问题)
* [初始化无法跳转问题](#初始化无法跳转问题)
* [修改unicorn的timeout](#修改unicorn的timeout)
* [数据库创建不成功](#数据库创建不成功)
* [前端报错](#前端报错)

##### 清除数据库再次进入引导界面进行初始化
  - 描述：
    清除数据库，如何再次进入引导界面进行初始化
  - 解决方式： 
    执行 Rails.cache.clear，然后删除 config/startup.yml。

##### nokogiri错误
  - 描述：
    出现 Could not find nokogiri-1.8.2 in any of the sources 错误
  - 解决方式：  
   gem install nokogiri -v '1.8.2' -- --use-system-libraries=true --with-xml2-include="$(xcrun --show-sdk-path)"/usr/include/libxml2  
  [参考链接](https://github.com/sparklemotion/nokogiri/issues/1801)

##### charlock_holmes错误
  - 描述：
    安装过程中出现了 charlock_holmes 错误提示
  - 解决方式： 
   

    gem install charlock_holmes -- --with-icu-dir=/usr/local/Cellar/icu4c
    gem install charlock_holmes -- --with-icu-dir=/usr/local/opt/icu4c --with-cxxflags=-std=c++11
    
 
    [参考链接](https://github.com/brianmario/charlock_holmes)

##### libv8错误
  - 描述：
    bundle install 或安装过程中出现 Make sure that gem install libv8 -v '3.16.14.15' succeeds before bundling 有关的错误提示
  - 解决方式：
   

    apt install v8-315
    gem install libv8 -v '3.16.14.15' -- --with-system-v8
    gem install therubyracer -- --with-v8-dir=/usr/local/opt/v8-315
    
##### UTF-8&ASCII-8BIT错误
  - 描述：
    安装过程出现 Encoding::CompatibilityError: incompatible character encoding: UTF-8 and ASCII-8BIT 错误
  - 解决方式：  
    检查安装文件目录是否存在中文，如果是请换成英文路径
  
##### activerecord-mysql2-adapter错误
  - 描述：
    安装过程出现 Please install the mysql2 adapter: gem install activerecord-mysql2-adapter (mysql2 is not part of the bundle. Add it to Gemfile.错误问题
  - 解决方式：   
    - 解决方式1： 把Gemfile中 gem "mysql2", group: :mysql中的， group: :mysql 去掉  
    - 解决方式2： 在 config/application.rb 11行后面加上 Bundler.require(:default, :assets, Rails.env, :mysql)  
  
##### therubyracer错误 
  - 描述：
    bundle install 或安装过程中出现了 therubyracer 有关的错误提示
  - 解决方式：  
    执行 gem install therubyracer -v '0.12.2' -- --with-system-v8 --with-v8-dir=$(brew --prefix v8-315)
    [参考链接](https://stackoverflow.com/questions/23536893/therubyracer-gemextbuilderror-error-failed-to-build-gem-native-extension/36271579#36271579)

GitHub (https://github.com/sparklemotion/nokogiri/issues/1801)
Nokogiri 1.8.4 installation challenges on macOS Mojave · Issue #1801 · sparklemotion/nokogiri
If you're having trouble installing Nokogiri ... Have you tried following [the installation tutorial][tutorial]? yes Wh


#### Faq
