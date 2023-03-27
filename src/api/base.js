/**
 * 接口路径配置：
 * 一般文件目录：base.js  index.js 
 * 但是gc不一定
 *      config
 *          login  index.js config.js 
 *       index.js 
 *       xxxx.js 
 */

const base ={
    host:'http://localhost:8989',//基础域名
    login:'/api/login', 
    params:'/api/params'

}

export default base;
