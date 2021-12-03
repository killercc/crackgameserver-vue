import { createRouter, createWebHashHistory } from 'vue-router'
import layout from '../layout/Layout.vue'


const routes = [
  {
    path: '/',
    name: 'layout',
    component: layout
  },{
    path: '/login',
    name: 'Login',
    component: () => import('@/components/Login'),
    meta: {
      title: "登录页面"
    }
  },{
    path: '/iboxlogin',
    name: 'ibox',
    component: () => import('@/components/iBoxLogin')
  },{
    path: '/regist',
    name: 'Regist',
    component: () => import('@/components/Regist'),
    meta: {
      title: "注册页面"
    }
  },
  {
    path: '/gamesearch',
    name: 'GameSearch',
    component: () => import('@/components/GameSearch'),
    meta: {
      title: "搜索"
    }
  },
  {
    path: '/charge',
    name: 'Charge',
    component: () => import('@/components/Charge'),
    meta: {
      title: "卡密生成"
    }
  },
  {
    path: '/history',
    name: 'DownloadHistory',
    component: () => import('@/components/DownloadHistory'),
    meta: {
      title: "历史记录"
    }
  },
  {
    path: '/relax',
    name: 'Relax',
    component: () => import('@/components/Relax'),
    meta: {
      title: "h0ppyT1me"
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,

})
router.beforeEach((to, from, next) => {
  if(to.meta.title){
    document.title = to.meta.title;
  }
  if (to.path === '/login' || to.path === '/regist') {
    next();
  } else {
    let token = localStorage.getItem('auth');
    if (token === null || token === '') {
      next('/login');
    } else {
      if(to.path === '/'){
        next('/gamesearch')
      }
      next();
    }
  }
});

export default router
