import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    meta: { title: 'BUD' },
    component: () => import('../views/home/index.vue')
  },
  {
    path: '/about',
    name: 'about',
    meta: { title: 'BUD - 关于我们' },
    component: () => import('../views/about/index.vue')
  },
  {
    path: '/product',
    name: 'product',
    meta: { title: 'BUD - 产品信息' },
    component: () => import('../views/product/index.vue')
  },
  {
    path: '/news',
    name: 'news',
    meta: { title: 'BUD - 新闻动态' },
    component: () => import('../views/news/index.vue')
  },
  {
    path: '/news-details',
    name: 'news-details',
    meta: { title: 'BUD - 新闻动态详情' },
    component: () => import('../views/news-details/index.vue')
  },
  {
    path: '/news-details-preview',
    name: 'news-details-preview',
    meta: { title: 'BUD - 新闻动态详情' },
    component: () => import('../views/news-details-preview/index.vue')
  },
  {
    path: '/join-us',
    name: 'join-us',
    meta: { title: 'BUD - 加入我们' },
    component: () => import('../views/join-us/index.vue')
  }
]

let mode = window.isDebug === 0 ? 'history' : 'hash';

const router = new VueRouter({
  // mode: 'history',
  // mode: 'hash',
  mode: mode,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
})

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  router.app.routerName = to.name
  if (to.meta.title) document.title = to.meta.title;
  next();
})

// Google Analytics
/* router.afterEach((to) => {
  window.gtag('config', 'G-6S4TDXCF5Z', {
    page_title: to.name, //页面标题
    page_path: to.path //页面路径
  });
}) */

export default router