//搭建express服务
const express = require('express')
const app = express()
//post 请求表单数据
app.use(express.urlencoded({ extended: true }))
//资源共享
const cors = require('cors')
app.use(cors())
app.all('/api',(request,response)=>{
    //设置允许跨域
    response.setHeader('Access-Control-Allow-Origin','*');
    //设置可自定义头信息
    response.setHeader('Access-Control-Allow-Headers','*');
    //设置请求方法可任意get、post等方法
    response.setHeader('Access-Control-Allow-Method','*');

    response.send('hello CORS');
})

//路由
const router = require('./router')

app.use('/api',router)


app.listen(8989,()=>{
    console.log(8989);
})
