/**
 * 请求的方法
 */

// import axios from 'axios'
import base from './base'
//node>js 
// const qs = require('querystring')
//导入二次封装的axios文件
import axios from '../utils/request'

//axios接口配置基础地址
// axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;
//http://localhost:8989 

const api = {
    /**
     * 登录接口
     */
    getLogin(params) {//params={username:'',password:''}
        return axios.post(base.login, params)
    },
    getParams(){
        return axios.get(base.params)
    }
 
}

export default api
