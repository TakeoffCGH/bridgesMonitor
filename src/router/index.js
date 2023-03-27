import Vue from 'vue'
const VueRouter = ()=>import('vue-router')
const Layout = ()=>import('../views/Layout/index.vue')
const Login = ()=>import('../views/Login/Login.vue')
const Line = ()=>import('../views/Line/Line.vue')
const Map2 = ()=>import('../views/Map2/Map2.vue')

Vue.use(VueRouter)

const routes = [
  {
    path:'',
    component:Layout,
    //路由元信息
    meta:{
      isLogin:true
    },
    children:[
      {
        path:'/',
        name:'Map2',
        component:Map2
      },

      {
        path:'/line',
        name:'Line',
        component:Line
      },
      {
        path:'/map2',
        name:'Map2',
        component:Map2
      }
    ]
  },
  {
    path:'/login',
    name:'Login',
    component:Login
  }
]

const router = new VueRouter({
  routes
})



export default router
