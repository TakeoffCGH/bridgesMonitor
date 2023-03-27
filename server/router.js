const express = require('express')
const router = express.Router()
//导入数据库 sqlFn('sql',[],res=>{})
const sqlFn = require('./mysql')
//图片需要的模块
const multer = require('multer')
const fs = require('fs')
//导入模块 jsonwebtoken   密钥
const jwt = require('jsonwebtoken');
// config.jwtSecert
const config = require('./secert')
//导入mockjs 
const Mock = require('mockjs');
/**
 * 登录 login
 * 接受的字段：username,password
 * 测试：postman  
 */
router.post('/login', (req, res) => {
    let { username, password } = req.body
    //请求数据库
    let sql = "select * from userinfo where username=? and password=?";
    let arr = [username, password]
    sqlFn(sql, arr, result => {
        if (result.length > 0) {
            let token = jwt.sign({
                username: result[0].username,
                id: result[0].id
            }, config.jwtSecert, {
                expiresIn: 20 * 1
            })
            res.send({
                status: 200,
                data: token
            })
        } else {
            res.send({
                status: 404,
                msg: '信息错误'
            })
        }

    })
})

router.get("/params",(req,res) =>{
     const sql = 'select * from params';
     sqlFn(sql,null,(result) => {
         if(result.length > 0){
             res.send({
                 status:200,
                 result
             })
         }else{
             res.send({
                 status:500,
                 msg:'暂无数据'
             })
         }
     })
})

module.exports = router