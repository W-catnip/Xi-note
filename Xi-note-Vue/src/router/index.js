import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),

  },
  {
    path: '/',
    name: 'home',
    // 重定向
    redirect: '/todo',
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: '/todo',
        name: 'Todo',
        component: () => import('../views/Todo.vue'),
      },
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('../views/Dashboard.vue'),
        meta: {
          keepAlive: true,
        }
      },
      {
        path: '/setting',
        name: 'Setting',
        component: () => import('../views/Setting.vue')
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('../views/About.vue')
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由前置守卫拦截
router.beforeEach((to, from, next) => {
  let token = window.localStorage.getItem('token');
  // 如果目标导航需要鉴权，则判断是否有token 没有token则跳转到登录页面
  if (to.path !== '/login') {
    if (token) {
      next()
    } else {
      next({
        path: '/login'
      })
    }
    // 如果导航进入login,判断是否有token 如果有则允许进入
  } else {
    if (token) {
      next({
        path: '/'
      })
    } else {
      next()
    }
  }
})

export default router
