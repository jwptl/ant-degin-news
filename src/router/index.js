import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/layout.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('../views/home/index.vue'),
        meta: {
          keepAlive: true //需要被缓存的组件
        }
      },
      {
        path: 'addNews',
        name: 'addNews',
        component: () => import('../views/home/addNews.vue')
      },
      {
        path: 'actcleList',
        name: 'actcleList',
        component: () => import('../views/actcle/index.vue')
      },
      {
        path: 'releaseList',
        name: 'releaseList',
        component: () => import('../views/actcle/release.vue')
      },
      {
        path: 'userList',
        name: 'userList',
        component: () => import('../views/userList/index.vue')
      },
      {
        path: 'userPower',
        name: 'userPower',
        component: () => import('../views/userList/userpower.vue')
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/pageUser/login.vue'),
  },
  {
    path: '/sign',
    name: 'sign',
    component: () => import('../views/pageUser/sign.vue'),
  },
  {
    path: '/forget',
    name: 'forget',
    component: () => import('../views/pageUser/forget.vue'),
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('../views/pages/newHome/index'),
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import('../views/pages/detail/index'),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


let whiteList = ['/index','/detail','/login']
router.beforeEach((to, from, next) => {
  let isLogin = window.localStorage.getItem('token');
  if (isLogin) {
    if (to.path === '/login') {
      next('/')
      return
    } else {
      next()
    }
    next()
  } else {
    //如果用户token不存在则跳转到login页面
    if (whiteList.indexOf(to.path) != -1) {
      next()
      return
    } else {
      next('/login')
    }
  }
})
export default router
