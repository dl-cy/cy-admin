import { resetRouter } from '@/router'
import { getUserInfo, login, logout } from '@/service'
import { getStorage, removeStorage, setStorage } from '@/utils'
const state = {
  token: getStorage('token'),
  name: '',
  avatar: '',
  introduction: '',
  menus: [],
  functions: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_MENUS: (state, menus) => {
    state.menus = menus
  },
  SET_FUNCTIONS: (state, functions) => {
    state.functions = functions
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setStorage('token', data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getUserInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getUserInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { menus, functions, user } = data

        if (!menus || menus.length <= 0 || !functions || functions.length <= 0) {
          reject('getUserInfo: menus and functions must be a non-null array!')
        }

        commit('SET_MENUS', menus)
        commit('SET_FUNCTIONS', functions)
        commit('SET_NAME', user.name)
        commit('SET_AVATAR', user.avatar)
        commit('SET_INTRODUCTION', user.introduction)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_MENUS', [])
        commit('SET_FUNCTIONS', [])
        removeStorage('token')
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_MENUS', [])
      commit('SET_FUNCTIONS', [])
      removeStorage('token')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
