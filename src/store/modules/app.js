import { getStorage, setStorage } from '@/utils'
const state = {
  sidebar: {
    opened: getStorage('sidebarStatus') ? !!+getStorage('sidebarStatus') : true,
    withoutAnimation: false
  },
  loading: false
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      setStorage('sidebarStatus', 1)
    } else {
      setStorage('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    setStorage('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_LOADING(state) {
    state.loading = !state.loading
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleLoading({ commit }) {
    commit('TOGGLE_LOADING')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
