import { createRouter, createWebHistory } from 'vue-router'

// createRouter 创建路由实例，===> new VueRouter()
// 1. history模式: createWebHistory()   http://xxx/user
// 2. hash模式: createWebHashHistory()  http://xxx/#/user

// vite 的配置 import.meta.env.BASE_URL 是路由的基准地址(vite.config.js中的base)，默认是 ’/‘
// https://vitejs.dev/guide/build.html#public-base-path

// 如果将来你部署的域名路径是：http://xxx/my-path/user
// vite.config.ts  添加配置  base: my-path，路由这就会加上 my-path 前缀了

//import LoginPage from '@/views/login/LoginPage.vue'
//懒加载
const LoginPage = () => import('@/views/login/LoginPage.vue')
const LayoutContainer = () => import('@/views/layout/LayoutContainer.vue')
const ArticleChannel = () => import('@/views/artical/ArticleChannel.vue')
const ArticleManage = () => import('@/views/artical/ArticleManage.vue')
const UserAvatar = () => import('@/views/user/UserAvatar.vue')
const UserPassword = () => import('@/views/user/UserPassword.vue')
const UserProfile = () => import('@/views/user/UserProfile.vue')


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/login',
      component:LoginPage,
    },
    {
      path:'/',
      component:LayoutContainer,
      redirect:'/artical/manage',
      children:[
        {
          path:'/artical/manage',
          component:ArticleManage,
        },
        {
          path:'/artical/channel',
          component:ArticleChannel,
        },
        {
          path:'/user/profile',
          component:UserProfile,
        },
        {
          path:'/user/avatar',
          component:UserAvatar,
        },
        {
          path:'/user/password',
          component:UserPassword,
        },
      ]
    }
  ],
})

export default router
