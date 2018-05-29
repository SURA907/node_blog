const crypto = require("crypto");

/*
* 处理数据加密的路由模块
*  str: 需要加密的字符串
* */

module.exports = {
    update:(str)=>{
        const obj = crypto.createHash('sha256');

        //加盐 -> 切勿修改和删除！！！
        const suffix = '!!@@@asjdjopajdjiojwidojan你ads_ada_sdsa_ijg_hihj9_ijd好de_dsa--asd@@@!!!';

        obj.update(str+suffix);

        return obj.digest('hex');
    }
};