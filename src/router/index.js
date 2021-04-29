import store from '@/store'
import { getStorage } from '@/utils'
import Layout from '@/views/layout'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) { return originalPush.call(this, location, onResolve, onReject) }
  return originalPush.call(this, location).catch((err) => err)
}
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'el-icon-menu', affix: true }
      }
    ]
  },
  {
    path: '/frontend',
    component: Layout,
    redirect: '/frontend/pseudocalss',
    meta: { title: '前端', icon: 'el-icon-menu', affix: true },
    children: [
      {
        path: 'pseudocalss',
        component: () => import('@/views/frontend/pseudocalss'),
        name: 'Pseudocalss',
        meta: { title: '伪类选择器' }
      },
      {
        path: 'color',
        component: () => import('@/views/frontend/color'),
        name: 'Color',
        meta: { title: '颜色渐变' }
      },
      {
        path: 'transform',
        component: () => import('@/views/frontend/transform'),
        name: 'Transform',
        meta: { title: '变形' }
      },
      {
        path: 'transition',
        component: () => import('@/views/frontend/transition'),
        name: 'Transition',
        meta: { title: '过渡' }
      },
      {
        path: 'animation',
        component: () => import('@/views/frontend/animation'),
        name: 'Animation',
        meta: { title: '动画' }
      }
    ]
  }
]

const createRouter = () => new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()
const whiteList = ['/login', '/404', '/401']
router.beforeEach(async(to, from, next) => {
  NProgress.start()
  document.title = to.meta.title || '✕ 系统支撑平台'
  const hasToken = getStorage('token')
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (store.getters.menus && store.getters.menus.length > 0) {
        next()
      } else {
        try {
          await store.dispatch('user/getUserInfo')
          const accessRoutes = await store.dispatch('permission/generateRoutes')
          accessRoutes.forEach(route => {
            router.addRoute(route)
          })
          next({ ...to, replace: true })
        } catch (error) {
          console.log(error)
          await store.dispatch('user/resetToken')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
/**
 * logout时重置路由，防止re-login时加入重复的路由
 */
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
