import { constantRoutes } from '@/router'
const _import = require('@/utils/_import_' + process.env.NODE_ENV)
/**
 * convert menus to router tree
 * @param menus
 */
export function menus2Routes(menus) {
  const accessedRouters = []
  menus.forEach(menu => {
    const route = { ...menu }
    if (route.component) {
      route.component = _import(route.component)
    }
    if (route.children && route.children.length) {
      route.children = menus2Routes(route.children)
    }
    accessedRouters.push(route)
  })

  return accessedRouters
}

const state = {
  routes: [],
  addRoute: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoute = routes
    state.routes = constantRoutes.concat(routes)
  }
}
const actions = {
  generateRoutes({ commit, dispatch, getters, rootGetters, rootState, state }) {
    return new Promise(resolve => {
      const accessedRoutes = menus2Routes(rootGetters.menus)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
