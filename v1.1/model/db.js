const db = require('./../config').database
/**
 * 从数据库中获取相应数据
 */
module.exports = {
    select: {
        // 获取所有文章信息
        index_data: function(callback) {
            let sql = 'SELECT article_id,username author,date_format(upload_time,"%Y-%m-%d %H:%i:%s") upload_time,article_title,LEFT(article_body, 90) article_body FROM article_table,user_table WHERE article_table.author = user_table.user_id ORDER BY upload_time DESC'
            if (typeof callback === 'function') {
                db.query(sql, (err, data)=>{
                    callback(err=err, data=data)
                })
            } else {
                callback(err='the arguments type is not allowed', data=null)
            }
        },
        // 获取传入的用户名对应的用户信息
        user_message: function(the_args, callback) {
            let sql = 'SELECT * FROM user_table WHERE username=?'
            if (typeof the_args === 'object' && typeof callback === 'function') {
                db.query(sql, the_args, (err, data)=>{
                    callback(err=err, data=data)
                })
            } else {
                callback(err='the arguments type is not allowed', data=null)
            }
        },
        user_message_by_id: function(the_args, callback) {
            let sql = 'SELECT * FROM user_table WHERE user_id=?'
            if (typeof the_args === 'object' && typeof callback === 'function') {
                db.query(sql, the_args, (err, data)=>{
                    callback(err=err, data=data)
                })
            } else {
                callback(err='the arguments type is not allowed', data=null)
            }
        },
        // 获取传入的文章id对应的文章数据
        article_data: function(the_args, callback) {
            let sql = 'SELECT article_id,username author,date_format(upload_time,"%Y-%m-%d %H:%i:%s") upload_time,article_title,article_body FROM article_table,user_table WHERE article_table.author = user_table.user_id AND article_table.article_id=?'
            if (typeof the_args === 'object' && typeof callback === 'function') {
                db.query(sql, the_args, (err, data)=>{
                    callback(err=err, data=data)
                })
            } else {
                callback(err='the arguments type is not allowed', data=null)
            }
        },
        // 根据传入的文章id获得文章相应的作者信息
        article_author: function(the_args, callback) {
            let sql = 'SELECT author FROM article_table WHERE article_id=?'
            if (typeof the_args === 'object' && typeof callback === 'function') {
                db.query(sql, the_args, (err, data)=>{
                    callback(err=err, data=data)
                })
            } else {
                callback(err='the arguments type is not allowed', data=null)
            }
        },
        // 获取传入的文章id对应的评论数据
        comment_data: function(the_args, callback) {
            let sql = 'SELECT username,date_format(upload_time,"%Y-%m-%d %H:%i:%s") upload_time,comment_body FROM comment_table,user_table WHERE comment_table.comment_user_id = user_table.user_id AND comment_article_id=? ORDER BY upload_time DESC'
            if (typeof the_args === 'object' && typeof callback === 'function') {
                db.query(sql, the_args, (err, data)=>{
                    callback(err=err, data=data)
                })
            } else {
                callback(err='the arguments type is not allowed', data=null)
            }
        },
        // 获取所有文章数据
        article_data_admin: function(the_args, callback) {
            let sql = 'SELECT article_id,username author,date_format(upload_time,"%Y-%m-%d %H:%i:%s") upload_time,article_title FROM article_table,user_table WHERE article_table.author = user_table.user_id ORDER BY upload_time DESC'
            if (typeof the_args === 'object' && typeof callback === 'function') {
                db.query(sql, the_args, (err, data)=>{
                    callback(err=err, data=data)
                })
            } else {
                callback(err='the arguments type is not allowed', data=null)
            }
        },
        // 获取传入的用户id所属的文章
        article_data_general: function(the_args, callback) {
            let sql = 'SELECT article_id,username author,date_format(upload_time,"%Y-%m-%d %H:%i:%s") upload_time,article_title FROM article_table,user_table WHERE article_table.author = user_table.user_id AND user_table.user_id=? ORDER BY upload_time DESC'
            if (typeof the_args === 'object' && typeof callback === 'function') {
                db.query(sql, the_args, (err, data)=>{
                    callback(err=err, data=data)
                })
            } else {
                callback(err='the arguments type is not allowed', data=null)
            }
        },
        // 获取管理员用户信息
        user_message_admin: function(callback) {
            let sql = 'SELECT user_id,username,is_admin FROM user_table WHERE is_admin="YES"'
            if (typeof callback === 'function') {
                db.query(sql, (err, data)=>{
                    callback(err, data)
                })
            } else {
                callback(err='the arguments type is not allowed', data=null)
            }
        },
        // 获取普通用户信息
        user_message_general: function(callback) {
            let sql = 'SELECT user_id,username,is_admin FROM user_table WHERE is_admin="NO"'
            if (typeof callback === 'function') {
                db.query(sql, (err, data)=>{
                    callback(err, data)
                })
            } else {
                callback(err='the arguments type is not allowed', data=null)
            }
        }
    },
    insert: {
        // 添加评论
        comment: function(the_args, callback) {
            let sql = 'INSERT INTO comment_table VALUES(0, ?, ?, ?, now())'
            if (typeof the_args === 'object' && typeof callback === 'function') {
                db.query(sql, the_args, (err)=>{
                    callback(err=err)
                })
            } else {
                callback(err='the arguments type is not allowed')
            }
        },
        // 添加文章
        article: function(the_args, callback) {
            let sql = 'INSERT INTO article_table VALUES(0, ?, now(), ?, ?)'
            if (typeof the_args === 'object' && typeof callback === 'function') {
                db.query(sql, the_args, (err)=>{
                    callback(err=err)
                })
            } else {
                callback(err='the arguments type is not allowed')
            }
        },
        // 添加用户
        user: function(the_args, callback) {
            let sql = 'INSERT INTO user_table VALUES(0, ?, ?, "NO")'
            if (typeof the_args === 'object' && typeof callback === 'function') {
                db.query(sql, the_args, (err)=>{
                    callback(err=err)
                })
            } else {
                callback(err='the arguments type is not allowed')
            }
        }
    },
    delete: {
        // 根据文章id删除文章
        article: function(the_args, callback) {
            let sql = 'DELETE FROM article_table WHERE article_id=?'
            if (typeof the_args === 'object' && typeof callback === 'function') {
                db.query(sql, the_args, (err)=>{
                    callback(err=err)
                })
            } else {
                callback(err='the arguments type is not allowed')
            }
        },
        // 根据用户id删除相关用户
        user: function(the_args, callback) {
            let sql = 'DELETE FROM user_table WHERE user_id=?'
            if (typeof the_args === 'object' && typeof callback === 'function') {
                db.query(sql, the_args, (err)=>{
                    callback(err=err)
                })
            } else {
                callback(err='the arguments type is not allowed')
            }
        }
    },
    updata: {
        // 根据文章id更新文章数据
        article: function(the_args, callback) {
            let sql = 'UPDATE article_table SET article_title=?,article_body=? WHERE article_id=?'
            if (typeof the_args === 'object' && typeof callback === 'function') {
                db.query(sql, the_args, (err)=>{
                    callback(err=err)
                })
            } else {
                callback(err='the arguments type is not allowed')
            }
        },
        // 根据用户id修改用户密码
        user_message: function(the_args, callback) {
            let sql = 'UPDATE user_table SET password=? WHERE user_id=?'
            if (typeof the_args === 'object' && typeof callback === 'function') {
                db.query(sql, the_args, (err)=>{
                    callback(err=err)
                })
            } else {
                callback(err='the arguments type is not allowed')
            }
        }
    }
}