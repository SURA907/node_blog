// 根据文章id获取文章作者
// const get_article_author = require('./../model/db').select.article_author
// let the_args = [39]
// get_article_author(the_args, (err, data)=>{
//     if (err) {
//         console.log(err)
//     } else {
//         console.log(data)
//     }
//     return 0
// })

// 根据文章id删除文章
// const delete_article = require('./../model/db').delete.article
// let the_args = [43]
// delete_article(the_args, (err)=>{
//     if (err) {
//         console.log(err)
//     } else {
//         console.log('success')
//     }
// })

// 根据文章id修改文章标题和内容
// const update_article = require('./../model/db').updata.article
// let the_args = ['hello, world','这是一段测试文本' , 45]
// update_article(the_args, (err)=>{
//     if (err) {
//         console.log(err)
//     } else {
//         console.log('success')
//     }
// })

// 添加用户
// const set_user = require('./../model/db').insert.user
// let the_args = ['sura907','ASdf']
// set_user(the_args, (err)=>{
//     if (err) {
//         console.log(err)
//     } else {
//         console.log('success')
//     }
// })

// 根据用户id删除用户
// const delete_user = require('./../model/db').delete.user
// let the_args = [17]
// delete_user(the_args, (err)=>{
//     if (err) {
//         console.log(err)
//     } else {
//         console.log('success')
//     }
// })

// 根据用户id查询用户信息
// const get_user_by_id = require('./../model/db').select.user_message_by_id
// let the_args = [18]
// get_user_by_id(the_args, (err, data)=>{
//     if (err) {
//         console.log(err)
//     } else {
//         console.log(data)
//     }
// })

// 根据用户id修改用户密码
// const update_user = require('./../model/db').updata.user_message
// let the_args = ['sura907', 18]
// update_user(the_args, (err)=>{
//     if (err) {
//         console.log(err)
//     } else {
//         console.log('success')
//     }
// })